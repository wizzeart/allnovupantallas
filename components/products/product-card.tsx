'use client'
import { Products2 } from "@/components/details/details"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "../cart/cart-provider"
import { ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Products2
}

export default function ProductCard({ product }: ProductCardProps) {
  const backendUrl = "https://allnovu.com"
  const { addItem } = useCart()

  // Función para obtener la URL segura de la imagen
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
      image: getSafeImageUrl(product.imagenUrl)
    })
  }

  const safeImageUrl = getSafeImageUrl(product.imagenUrl)

  return (
    <Card className="h-[calc(100vh/3-2rem)] w-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      {/* Contenedor principal VERTICAL */}
      <div className="flex flex-col w-full h-full">
        {/* Sección de imagen - OCUPA TODO EL ANCHO */}
        <div className="w-full h-[70%] relative overflow-hidden">
          <Image
            src={safeImageUrl || '/logo/marca-03.avif'}
            alt={product.nombre}
            fill
            className="object-cover scale-110 hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 1200px) 100vw, 1200px"
            onError={(e) => {
              e.currentTarget.src = ""
            }}
            priority={false}
          />
        </div>

        {/* Sección de contenido DEBAJO DE LA IMAGEN */}
        <div className="w-full h-[30%] flex flex-col p-3">
          {/* Nombre del producto */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 leading-tight">
            {product.nombre}
          </h3>

          {/* Precio */}
          <div className="mb-3">
            <span className="text-xl font-bold text-gray-900">
              ${product.precio?.toFixed(2) || "0.00"}
            </span>
          </div>

          {/* Botones - AHORA DEBAJO DEL TÍTULO Y PRECIO */}
          <div className="flex flex-row gap-2 mt-auto w-full items-center justify-center">
            {/* Botón de detalles */}
            <Link href={`/productos/${product.id}/details`}>
              <Button
                variant="outline"
                className="w-[200px] h-10 bg-blue-600 hover:bg-blue-600/70 text-white rounded-md"
                title="Ver detalles"
              >
                <Eye className="h-5 w-5 mr-2" />
                Ver detalles
              </Button>
            </Link>

            {/* Botón de añadir al carrito */}
            <Button
              onClick={handleAddToCart}
              className="w-[200px] h-10 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Añadir
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}