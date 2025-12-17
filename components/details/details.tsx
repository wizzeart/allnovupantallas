'use client'
import { ProductGallery } from "./productGallery";
import { ProductInfo } from "./productInfo";
import { Button } from "../ui/button";
import Link from "next/link";
import { RelatedProducts } from "./relatedProducts";
import { ArrowLeft } from "lucide-react";
import { useCart } from "../cart/cart-provider";

export interface Products {
    id: number,
    nombre: string,
    precio: number,
    categoria: string,
    galleryImageUrls: string[],
    caracteristicas: string,
    description: string,
}
export interface Products2 {
    id: number,
    nombre: string,
    precio: number,
    imagenUrl: string
    categoria?: string,
    relatedProducts: Products2[],
    galleryImageUrls: string[],
    descripcionCorta?: string,
    descripcion?: string,
}

export default function DetailsComponent({ product }: { product: Products2 }) {
    const backendUrl = 'https://allnovu.com';
    const { addItem } = useCart()

    const handleGoBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Si no hay historial, redirigir a la tienda
            window.location.href = 'https://allnovu.com/tienda';
        }
    };
    const getSafeImageUrl = (imageUrl: string | undefined | null): string => {
        // Si no hay URL, retornar placeholder
        if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined') {
            return ""
        }

        // Si la URL ya es completa (comienza con http:// o https://), retornarla
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl
        }

        // Si la URL comienza con /, concatenar con backendUrl
        if (imageUrl.startsWith('/')) {
            return backendUrl + imageUrl
        }

        // Para otros casos, agregar / antes de concatenar
        return backendUrl + '/' + imageUrl
    }
    const handleAddToCart = () => {
        addItem({
            id: product.id.toString(),
            name: product.nombre,
            price: product.precio,
            image: getSafeImageUrl(product.imagenUrl) // Usar función segura aquí también
        })
    }
    return (
        <div
            className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-white"
        >

            <div className="sticky top-4 left-4 z-40 p-4">
                <Button
                    variant="ghost"
                    size="sm"
                    className="bg-amber-600 backdrop-blur-sm hover:bg-amber-600/90 text-white hover:text-white border border-white/30 rounded-full p-3 shadow-lg transition-all duration-300"
                >
                    <Link href="/" className="flex items-center" >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="ml-2 hidden sm:inline">Volver</span>

                    </Link>
                </Button>
            </div>

            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-40 py-4 sm:py-5 md:py-6">
                    <div className="layout-content-container flex flex-col w-full max-w-[1400px] flex-1">
                        {/* Galería de Imágenes */}
                        <ProductGallery product={product} backendUrl={backendUrl} />

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-3 sm:p-4 md:p-5 lg:p-6 mt-4">
                            <div className="flex-1">
                                <h1 className="text-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-[-0.033em] drop-shadow-sm">
                                    {product.nombre}
                                </h1>
                                {product.categoria && (
                                    <p className="text-black/90 text-sm sm:text-base mt-2 font-medium">
                                        Categoría: <span className="text-amber-300">{product.categoria}</span>
                                    </p>
                                )}
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                variant="default"
                                size="lg"
                                className="bg-amber-600 hover:bg-amber-700 text-white drop-shadow-lg text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                                asChild
                            >
                                <Link href={'/cart'}>
                                    Comprar producto
                                </Link>
                            </Button>
                        </div>

                        {/* Información del Producto */}
                        <ProductInfo product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}