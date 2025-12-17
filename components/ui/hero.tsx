"use client"

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./carousel";

const heroImages = [
    './Banner1.webp',
    './Banner2.webp',
];
export function Hero() {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
    return (
        <section
            className="flex items-center justify-center"
        >
            <div className="relative w-full md:w-[98%] h-auto overflow-hidden  dark:bg-slate-800 rounded-2xl">
                <Carousel
                    plugins={[plugin.current]}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    className="w-full"
                >
                    <CarouselContent>
                        {heroImages.map((image, index) => (
                            <CarouselItem key={index} className="flex items-center justify-center">
                                <div className="flex items-center justify-center ">
                                    <Image
                                        src={image}
                                        alt={`Banner${index}`}
                                        width={1600}
                                        height={450}
                                        className="object-cover max-h-[300px] md:max-h-[450px] rounded-2xl transition-all duration-500 ease-in-out w-full"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}