'use client'

import { AirVent, ShoppingCart } from "lucide-react";
import { Category } from "../Footer/footer";
import { useCart } from "../cart/cart-provider";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";
import Image from "next/image";

export function FloatingNabvar({ categorias }: { categorias: Category[] }) {
    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Obtener la categoría actual de los search params (si existe)
    const currentCategoryId = searchParams.get('categoria');

    // Función para manejar el clic en una categoría - usa useCallback para memoizar
    const handleCategoryClick = (categoriaId: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (params.get('categoria') === categoriaId) {
            // Si ya está seleccionada, la eliminamos
            params.delete('categoria');
            router.push(createUrl('/', params))
        } else {
            // Si no, la establecemos
            params.set('categoria', categoriaId);
        }

        // Usar replace en lugar de push para evitar nuevo entry en el historial
        router.push(createUrl('/', params))
    };
    const getImageFileName = (nombreCategoria: string) => {
        // Si la categoría es "TV/Audio", usar "TVAudio.png"
        if (nombreCategoria === "TV/Audio" || nombreCategoria === "TV/Audio") {
            return "TVAudio.png";
        }
        // Para otras categorías, usar el nombre normal
        return `${nombreCategoria}.png`;
    };
    return (
        <>
            <nav className={`w-[980px] items-start scroll-none overflow-hidden justify-start mx-auto top-[84px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg mt-4 rounded-xl transition-all duration-300 h-16'`}>
                <div className="px-6 h-full"> {/* Reducido de px-8 a px-6 */}
                    <div className="flex items-start justify-between h-full">

                        {/* Iconos de categorías */}
                        <div className="flex-1 flex items-start overflow-hidden justify-start gap-3 lg:gap-5 px-1"> {/* gap reducido de 3/4 a 1/2 */}
                            {categorias.map((categoria) => (
                                <div key={categoria.id} className="h-full">
                                    <button
                                        onClick={() => handleCategoryClick(categoria.id.toString())}
                                        className={`flex flex-col items-center h-full p-1.5 rounded-lg hover:bg-slate-100 transition-colors group min-w-[55px] ${currentCategoryId === categoria.id.toString() // Reducido de min-w-[60px]
                                            ? 'bg-primary/10 border border-primary/20'
                                            : ''
                                            }`}
                                    >
                                        {/* Icono siempre en la misma posición */}
                                        <div className="flex items-center justify-center h-12 w-full mb-2 mt-3">
                                            <Image width={100} height={300} src={`./ico_cate/${getImageFileName(categoria.Nombre)}`} alt="logo" className="h-22 w-22 object-contain" />
                                        </div>
                                        {/* Texto puede ocupar 2 líneas sin afectar otros elementos */}
                                        <div className="flex items-start justify-center min-h-[20px] w-full">
                                            <span className={`text-[10px] font-medium ${currentCategoryId === categoria.id.toString()
                                                ? 'text-primary font-bold'
                                                : 'text-slate-600'
                                                } transition-all duration-300 opacity-100 text-center line-clamp-2 leading-tight'`}>
                                                {categoria.Nombre}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            ))}

                            <div >
                                <Button
                                    variant={'ghost'}
                                    className={`flex items-center justify-center h-12 w-full mb-2 mt-3 px-1`} /* Reducido padding y min-width */
                                >
                                    <Link href={'/cart'} className="flex flex-col items-center w-full h-full">
                                        {/* Icono siempre en la misma posición */}
                                        <div className="flex items-center justify-center h-12 w-full mb-1.5 relative">
                                            <ShoppingCart className="h-16 w-16 text-[#2e3192] size-20" />
                                            {itemCount > 0 && (
                                                <Badge className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold min-w-5 h-5 flex items-center justify-center">
                                                    {itemCount}
                                                </Badge>
                                            )}
                                        </div>
                                        {/* Texto siempre de una línea */}
                                        <div className="flex items-start justify-center min-h-[20px] w-full">
                                            <span className={`text-[10px] font-medium text-slate-600 transition-all duration-300 opacity-100 text-center'`}>
                                                Carrito
                                            </span>
                                        </div>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}