"use client"
import { Products2 } from "../details/details"
import ProductCard from "./product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { useEffect } from "react"

export default function ProductsComponent({ productos }: { productos: Products2[] }) {
    const groupedCards = []
    // Cambiar de 6 a 4 tarjetas por grupo
    for (let i = 0; i < productos.length; i += 4) {
        groupedCards.push(productos.slice(i, i + 4))
    }
    useEffect(() => {
        // Bloquear scroll al cargar la página
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            // Restaurar scroll al salir de la página
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, []);

    return (
        <Carousel
            opts={{
                align: "start",
                slidesToScroll: 1
            }}
            orientation="vertical"
            className="w-full h-[1000px]" // Reducir altura para 4 tarjetas
        >
            <CarouselContent className="-mt-4 h-[1400px]">
                {groupedCards.map((group, groupIndex) => (
                    <CarouselItem key={groupIndex} className="pt-1">
                        <div className="p-1">
                            <div className="grid grid-cols-2 gap-6 p-6">
                                {group.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}