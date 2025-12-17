'use client'

import { useState, useEffect, useRef } from 'react';

// Definir interfaces TypeScript
interface CarouselImage {
    id: number;
    url: string;
    alt?: string;
}

export default function IdlePromotionCarousel() {
    // Estados del componente
    const [isCarouselActive, setIsCarouselActive] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [images, setImages] = useState<CarouselImage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [timeLeft, setTimeLeft] = useState<number>(15);

    // Referencias para los timers
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
    const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Referencia para montaje y última actividad
    const mountedRef = useRef(true);
    const lastActivityRef = useRef<number>(new Date().getTime());

    // Configuración de tiempos
    const INACTIVITY_TIMEOUT = 30000;
    const CAROUSEL_INTERVAL = 6000;
    const COUNTDOWN_INTERVAL = 3000;
    const INITIAL_TIME_LEFT = 30;

    // Cargar imágenes estáticas
    const loadStaticImages = (): CarouselImage[] => {
        return [
            {
                id: 1,
                url: './Banner1.webp',
                alt: '¡Oferta Especial! 20% de descuento',
            },
            {
                id: 2,
                url: './Banner2.webp',
                alt: 'Envío Gratis en compras mayores a $50',
            },
            {
                id: 3,
                url: './Banner1.webp',
                alt: 'Nuevos Productos - Descubre nuestra colección',
            },
        ];
    };

    /**
     * Función para iniciar el carrusel
     */
    const startCarousel = () => {
        if (!mountedRef.current || images.length === 0) return;

        setIsCarouselActive(true);
        setCurrentImageIndex(0);

        // Limpiar intervalo anterior
        if (carouselIntervalRef.current) {
            clearInterval(carouselIntervalRef.current);
        }

        // Configurar nuevo intervalo
        carouselIntervalRef.current = setInterval(() => {
            if (!mountedRef.current) return;

            setCurrentImageIndex(prev => (prev + 1) % images.length);
        }, CAROUSEL_INTERVAL);

        // Detener countdown
        if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            countdownTimerRef.current = null;
        }

        console.log('✅ Carrusel iniciado');
    };

    /**
     * Función para detener el carrusel
     */
    const stopCarousel = () => {
        console.log('⏹️ DETENIENDO CARRUSEL');

        if (!mountedRef.current) return;

        setIsCarouselActive(false);

        // Limpiar intervalo del carrusel
        if (carouselIntervalRef.current) {
            clearInterval(carouselIntervalRef.current);
            carouselIntervalRef.current = null;
        }

        // Reiniciar contador
        setTimeLeft(INITIAL_TIME_LEFT);

        // Limpiar timer de inactividad anterior
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }

        // Configurar nuevo timer
        inactivityTimerRef.current = setTimeout(() => {
            if (mountedRef.current) {
                startCarousel();
            }
        }, INACTIVITY_TIMEOUT);
    };

    /**
     * Función para resetear el timer
     */
    const resetInactivityTimer = () => {
        if (!mountedRef.current) return;

        console.log(`🔄 Reseteando timer. Tiempo: ${timeLeft}s`);

        // Limpiar timers existentes
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

        // Reiniciar contador
        setTimeLeft(INITIAL_TIME_LEFT);

        // Configurar countdown
        countdownTimerRef.current = setInterval(() => {
            if (!mountedRef.current) return;

            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Limpiar cuando llegue a 0
                    if (countdownTimerRef.current) {
                        clearInterval(countdownTimerRef.current);
                        countdownTimerRef.current = null;
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, COUNTDOWN_INTERVAL);

        // Configurar timer de inactividad
        inactivityTimerRef.current = setTimeout(() => {
            console.log('⏰ TIMEOUT - Inactividad detectada');
            if (mountedRef.current && images.length > 0) {
                startCarousel();
            }
        }, INACTIVITY_TIMEOUT);
    };

    /**
     * Función para manejar actividad del usuario
     */
    const handleUserActivity = () => {
        if (!mountedRef.current) return;

        // Actualizar timestamp
        lastActivityRef.current = Date.now();

        // Si el carrusel está activo, detenerlo
        if (isCarouselActive) {
            stopCarousel();
        } else {
            // Solo resetear el timer
            resetInactivityTimer();
        }
    };

    /**
     * Inicializar aplicación - useEffect principal
     */
    useEffect(() => {
        mountedRef.current = true;

        console.log('🚀 Inicializando aplicación...');

        // Cargar imágenes
        const handleImages = () => {
            const loadedImages = loadStaticImages();
            setImages(loadedImages);
            setIsLoading(false);
            console.log(`📸 ${loadedImages.length} imágenes cargadas`);
        }
        handleImages()

        // Configurar event listeners con throttle
        const events = [
            'mousedown', 'mousemove', 'keydown', 'keypress',
            'scroll', 'touchstart', 'click', 'wheel'
        ];

        let activityTimeout: NodeJS.Timeout | null = null;

        const throttledActivity = () => {
            // Throttle: máximo una llamada cada 500ms
            if (activityTimeout) return;

            activityTimeout = setTimeout(() => {
                const now = Date.now();
                if (now - lastActivityRef.current > 500) {
                    handleUserActivity();
                }
                activityTimeout = null;
            }, 500);
        };

        events.forEach(event => {
            document.addEventListener(event, throttledActivity, { passive: true });
        });

        // Iniciar timer inicial después de un breve delay
        const initTimer = setTimeout(() => {
            if (mountedRef.current) {
                resetInactivityTimer();
            }
        }, 1000);

        return () => {
            mountedRef.current = false;
            clearTimeout(initTimer);

            // Limpiar todos los timers
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
            if (activityTimeout) clearTimeout(activityTimeout);

            // Remover event listeners
            events.forEach(event => {
                document.removeEventListener(event, throttledActivity);
            });
        };
    }, []); // Empty dependencies - solo se ejecuta al montar

    /**
     * Efecto para manejar cuando el tiempo llega a 0
     */
    useEffect(() => {
        if (timeLeft === 0 && !isCarouselActive && images.length > 0) {
            const handleTime = () => {
                startCarousel();
            }
            handleTime()
        }
    }, [timeLeft, isCarouselActive, images.length]);

    /**
     * Efecto para manejar cambios en images.length
     */
    useEffect(() => {
        if (timeLeft === 0 && !isCarouselActive && images.length > 0) {
            const handleTime = () => {
                startCarousel();
            }
            handleTime()
        }
    }, [images.length, timeLeft, isCarouselActive]);

    // Mostrar loading
    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="text-white text-xl">Cargando promociones...</div>
            </div>
        );
    }

    // Si no hay imágenes
    if (images.length === 0 && !isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="text-white text-xl">No hay promociones disponibles</div>
            </div>
        );
    }

    return (
        <div>
            {/* Carrusel de inactividad - AHORA CON ALTURA COMPLETA */}
            {isCarouselActive && images.length > 0 && (
                <div
                    className="fixed inset-0 z-50 bg-black"
                    onClick={handleUserActivity}
                >
                    {/* Contenedor principal - OCUPANDO TODA LA ALTURA */}
                    <div className="relative w-full h-full flex flex-col">
                        {/* Botón para cerrar */}
                        <button
                            onClick={handleUserActivity}
                            className="absolute top-4 right-4 z-50 p-3 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 md:top-6 md:right-6 md:p-4"
                            aria-label="Cerrar carrusel"
                        >
                            <svg
                                className="w-6 h-6 md:w-8 md:h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Contenedor de imagen - ALTURA COMPLETA */}
                        <div className="flex-1 flex items-center justify-center p-0">
                            {/* Imagen - ALTURA COMPLETA CON OBJECT-CONTAIN */}
                            <img
                                src={images[currentImageIndex]?.url}
                                alt={images[currentImageIndex]?.alt || 'Promoción Especial'}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = './placeholder.jpg';
                                }}
                            />

                            {/* Overlay sutil para texto */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                        </div>

                        {/* Contenido de texto - EN LA PARTE INFERIOR */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                            <div className="text-white text-center">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 px-4">
                                    {images[currentImageIndex]?.alt || 'Promoción Especial'}
                                </h2>

                                {/* Botón y controles */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                                    <button
                                        onClick={handleUserActivity}
                                        className="px-8 py-3 md:px-10 md:py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-lg md:text-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto"
                                    >
                                        Ver Promoción
                                    </button>

                                    {/* Indicadores */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex gap-2">
                                            {images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex(index);
                                                    }}
                                                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${index === currentImageIndex
                                                        ? 'bg-white'
                                                        : 'bg-white/50 hover:bg-white/70'}`}
                                                    aria-label={`Ir a imagen ${index + 1}`}
                                                />
                                            ))}
                                        </div>

                                        {/* Contador */}
                                        <div className="text-sm md:text-base opacity-75 min-w-[60px]">
                                            <span>{currentImageIndex + 1} / {images.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}