'use client'

import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Products2 } from "./details"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

export function RelatedProducts({ relatedProducts, backendUrl }: { relatedProducts: Products2[], backendUrl: string }) {
    const plugin = useRef(
        Autoplay({ delay: 2000 })
    )
    return (
        <div className="w-full gap-4 mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            <div className="text-left mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2 sm:mb-3">
                    Productos relacionados
                </h2>
            </div>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="gap-2 sm:gap-3 md:gap-4 flex flex-row -ml-2 sm:-ml-3 md:-ml-4">
                    {relatedProducts.map((appliance, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-2 sm:pl-3 md:pl-4 basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/4 lg:basis-1/4 xl:basis-1/4 min-w-[160px] xs:min-w-[180px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px]"
                        >
                            <div className="w-full">
                                <Card className="h-full">
                                    <CardContent className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 hover:shadow-lg sm:hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
                                        {/* Contenedor de imagen con tamaño fijo */}
                                        <div className="bg-gray-200 rounded-md sm:rounded-lg h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 mb-3 sm:mb-4 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={backendUrl + appliance.imagenUrl}
                                                alt={appliance.nombre}
                                                className="w-full h-full object-cover rounded-md sm:rounded-lg"
                                            />
                                        </div>

                                        {/* Contenedor de texto */}
                                        <div className="grow min-h-[50px] xs:min-h-[55px] sm:min-h-[60px] mb-3 sm:mb-4">
                                            <h3 className="font-semibold text-gray-900 text-xs xs:text-sm sm:text-base text-balance line-clamp-2 leading-tight">
                                                {appliance.nombre}
                                            </h3>
                                        </div>

                                        {/* Botón */}
                                        <div className="mt-auto">
                                            <Link href={`/productos/${appliance.id}/details`} className="block w-full">
                                                <Button
                                                    style={{ backgroundColor: "#0088cc" }}
                                                    className="w-full text-white py-2 xs:py-2.5 sm:py-3 rounded-md sm:rounded-lg text-xs xs:text-sm sm:text-base font-semibold hover:opacity-90 transition-colors min-h-[36px] xs:min-h-[40px] sm:min-h-[44px]"
                                                >
                                                    Detalles
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden xs:flex h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 -left-1 xs:-left-2 sm:-left-4" />
                <CarouselNext className="hidden xs:flex h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 -right-1 xs:-right-2 sm:-right-4" />
            </Carousel>
        </div>
    )
}