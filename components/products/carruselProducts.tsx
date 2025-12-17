"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Products2 } from "../details/details"
import ProductCard from "./product-card"

export default function VerticalCarousel({ productos }: { productos: Products2[] }) {
    const [startIndex, setStartIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const cardsPerView = 4
    const scrollAmount = 4

    const visibleCards = productos.slice(startIndex, startIndex + cardsPerView)
    const canScrollDown = startIndex + scrollAmount < productos.length
    const canScrollUp = startIndex > 0

    const handleScrollUp = () => {
        if (canScrollUp) {
            setStartIndex(Math.max(0, startIndex - scrollAmount))
        }
    }

    const handleScrollDown = () => {
        if (canScrollDown) {
            setStartIndex(Math.min(productos.length - cardsPerView, startIndex + scrollAmount))
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setDragStart(e.clientY)

        // Agregar event listeners para mouse move y mouse up
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return

        const diff = e.clientY - dragStart
        const threshold = 50

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                handleScrollUp()
            } else {
                handleScrollDown()
            }
            setDragStart(e.clientY)
            setIsDragging(false)

            // Remover event listeners
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }

    const handleMouseUp = (e: MouseEvent) => {
        setIsDragging(false)

        // Remover event listeners
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        setDragStart(e.touches[0].clientY)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return

        const diff = e.touches[0].clientY - dragStart
        const threshold = 50

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                handleScrollUp()
            } else {
                handleScrollDown()
            }
            setDragStart(e.touches[0].clientY)
            setIsDragging(false)
        }
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    // Remover event listeners cuando el componente se desmonte
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center p-4 md:p-8">
            <div
                ref={carouselRef}
                className="w-full h-full max-w-4xl overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="grid grid-cols-2 gap-4 w-full h-full px-4">
                    {visibleCards.map((card) => (
                        <div key={card.id} className="h-full min-h-0">
                            <div className="h-full">
                                <ProductCard product={card} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-slate-400 text-sm mt-4">
                {startIndex + 1}-{Math.min(startIndex + cardsPerView, productos.length)} de {productos.length}
            </div>
        </div>
    )
}