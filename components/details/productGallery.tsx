'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Products2 } from './details';
import Image from 'next/image'; // Add this import

export function ProductGallery({ product, backendUrl }: { product: Products2, backendUrl: string }) {
    const [mainImage, setMainImage] = useState(() => {
        if (product?.imagenUrl) {
            return backendUrl + product.imagenUrl
        }
        return ''
    })

    const [isLoading, setIsLoading] = useState(true)

    // Solo usar useEffect para actualizaciones cuando product cambia
    useEffect(() => {
        if (product?.imagenUrl) {
            const newImageUrl = backendUrl + product.imagenUrl

            // Solo actualizar si la URL cambió realmente
            if (mainImage !== newImageUrl) {
                // Usar setTimeout para evitar actualización síncrona
                const timer = setTimeout(() => {
                    setMainImage(newImageUrl)
                }, 0)

                return () => clearTimeout(timer)
            }
        }
    }, [product, backendUrl, mainImage])

    if (!product) {
        return null;
    }

    const allImages = [
        ...(product.imagenUrl ? [product.imagenUrl] : []),
        ...(product.galleryImageUrls || [])
    ];

    return (
        <div className="relative w-full max-w-2xl mx-auto ">
            {/* Main Image Display */}
            <div className="aspect-square w-full overflow-hidden rounded-lg mb-4 border">
                {mainImage && (
                    <img
                        alt={product.nombre}
                        className="h-full w-full object-contain bg-white"
                        src={mainImage}
                        width={800}
                        height={800}
                        loading="lazy"
                    />
                )}
            </div>

            {/* Thumbnail Carousel */}
            {allImages.length > 1 && (
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    className="thumbnail-swiper"
                >
                    {allImages.map((imageUrl, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`aspect-square w-full overflow-hidden rounded-md cursor-pointer border-2 ${mainImage === backendUrl + imageUrl ? 'border-blue-400' : 'border-transparent'}`}
                                onClick={() => setMainImage(backendUrl + imageUrl)}
                            >
                                <img
                                    src={backendUrl + imageUrl}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="h-full w-full object-cover"
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}