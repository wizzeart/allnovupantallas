"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "../cart/cart-provider";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState, useEffect, useRef } from "react";

export function FloatingButtons() {
    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    // Estado para la posición - ESQUINA SUPERIOR DERECHA
    const [position, setPosition] = useState({ x: -20, y: 20 }); // y: 20px desde arriba
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLDivElement>(null);

    // Cargar posición guardada al inicio
    useEffect(() => {
        const savedPosition = localStorage.getItem('floating-button-position');
        if (savedPosition) {
            try {
                requestAnimationFrame(() => setPosition(JSON.parse(savedPosition)));
            } catch (error) {
                console.error('Error loading button position:', error);
            }
        } else {
            // POSICIÓN POR DEFECTO: ESQUINA SUPERIOR DERECHA
            setTimeout(() => {
                if (buttonRef.current) {
                    setPosition({
                        x: window.innerWidth - (buttonRef.current.offsetWidth + 20), // 20px del borde derecho
                        y: 20 // 20px desde arriba
                    });
                }
            }, 100);
        }
    }, []);

    // Guardar posición cuando cambia
    useEffect(() => {
        localStorage.setItem('floating-button-position', JSON.stringify(position));
    }, [position]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target instanceof HTMLElement && e.target.closest('a')) {
            return;
        }

        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        e.preventDefault();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);

        if (target instanceof HTMLElement && target.closest('a')) {
            return;
        }

        setIsDragging(true);
        dragStartPos.current = {
            x: touch.clientX - position.x,
            y: touch.clientY - position.y
        };
        e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;

        const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 60);
        const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 60);

        setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        });
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        const newX = touch.clientX - dragStartPos.current.x;
        const newY = touch.clientY - dragStartPos.current.y;

        const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 60);
        const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 60);

        setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        });
        e.preventDefault();
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isDragging]);


    const handleDoubleClick = () => {
        if (buttonRef.current) {
            setPosition({
                x: window.innerWidth - (buttonRef.current.offsetWidth + 20),
                y: 20
            });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (!localStorage.getItem('floating-button-position')) {
                setTimeout(() => {
                    if (buttonRef.current) {
                        setPosition({
                            x: window.innerWidth - (buttonRef.current.offsetWidth + 20),
                            y: 20
                        });
                    }
                }, 100);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            ref={buttonRef}
            className={`fixed z-50 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                touchAction: 'none'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onDoubleClick={handleDoubleClick}
        >
            <div className="relative group">
                <Button
                    className={`
                        flex items-center justify-center w-18 h-18 rounded-full 
                       bg-white
                       hover:bg-white/90
                        transition-all duration-300
                        shadow-lg hover:shadow-xl hover:scale-105
                        ${isDragging ? 'opacity-80 scale-95' : ''}
                    `}
                >
                    <Link href={'/cart'} className="flex items-center justify-center w-full h-full">
                        <ShoppingCart className="h-6 w-6 text-black size-30" />
                        {itemCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center">
                                {itemCount}
                            </Badge>
                        )}
                    </Link>
                </Button>

                {/* Indicador de arrastre */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-amber-600 opacity-70"></div>


            </div>
        </div>
    )
}