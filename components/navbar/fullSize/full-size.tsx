'use client'

import { useEffect, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function FullScreenApp() {
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Verificar si estamos en pantalla completa
    const checkFullScreen = () => {
        setIsFullScreen(
            document.fullscreenElement !== null
        );
    };

    // Activar pantalla completa
    const enterFullScreen = () => {
        const element = document.documentElement;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        };
    }
    // Listener para cambios en pantalla completa
    useEffect(() => {
        const events = [
            'fullscreenchange',
            'webkitfullscreenchange',
            'mozfullscreenchange',
            'MSFullscreenChange'
        ];

        events.forEach(event => {
            document.addEventListener(event, checkFullScreen);
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, checkFullScreen);
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-white text-white">
            {/* Botón de pantalla completa */}
            {!isFullScreen && (
                <button
                    onClick={isFullScreen ? () => document.exitFullscreen?.() : enterFullScreen}
                    className="fixed top-4 right-4 z-50 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg"
                >
                    {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                </button>
            )}

        </div>
    );
}