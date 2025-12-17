"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface GoogleKeyboardProps {
    onKeyClick?: (key: string) => void
    onClose?: () => void
    onTabPress?: () => void
}

const KEYBOARD_LAYOUT = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
]

const SPECIAL_CHARS = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+",
    "[", "]", "{", "}", "|", ";", ":", "'", '"', "<", ">", ",", ".", "?", "/", "\\", "`", "~",
]

const DEFAULT_SIZE = { width: 340, height: 260 }
const DEFAULT_POSITION = { x: 50, y: 150 }
const STORAGE_KEY = "painted-keyboard-settings"

export default function PaintedKeyboard({ onKeyClick, onClose, onTabPress }: GoogleKeyboardProps) {
    const [position, setPosition] = useState(DEFAULT_POSITION)
    const [size, setSize] = useState(DEFAULT_SIZE)
    const [dragging, setDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const [resizing, setResizing] = useState(false)
    const [resizeOffset, setResizeOffset] = useState({ x: 0, y: 0 })
    const [pressedKey, setPressedKey] = useState<string | null>(null)
    const [showSpecialChars, setShowSpecialChars] = useState(false)
    const [capsLock, setCapsLock] = useState(false)
    const keyboardRef = useRef<HTMLDivElement>(null)

    // Cargar configuración guardada
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                const { savedPosition, savedSize } = JSON.parse(saved)

                if (savedPosition) {
                    const screenWidth = window.innerWidth
                    const screenHeight = window.innerHeight
                    const validX = Math.min(Math.max(savedPosition.x, 0), screenWidth - (savedSize?.width || DEFAULT_SIZE.width))
                    const validY = Math.min(Math.max(savedPosition.y, 0), screenHeight - (savedSize?.height || DEFAULT_SIZE.height))
                    setPosition({ x: validX, y: validY })
                }

                if (savedSize) {
                    const validWidth = Math.min(Math.max(savedSize.width, 300), 650)
                    const validHeight = Math.min(Math.max(savedSize.height, 220), 450)
                    setSize({ width: validWidth, height: validHeight })
                }
            }
        } catch (error) {
            console.error("Error al cargar configuración del teclado:", error)
            setPosition(DEFAULT_POSITION)
            setSize(DEFAULT_SIZE)
        }
    }, [])

    // Guardar configuración
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                const settings = {
                    savedPosition: position,
                    savedSize: size,
                    lastUpdated: new Date().toISOString()
                }
                localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
            } catch (error) {
                console.error("Error al guardar configuración del teclado:", error)
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [position, size])

    const scale = size.width / 340
    const fontSize = 14 * scale
    const keyHeight = 32 * scale
    const headerFontSize = 12 * scale
    const keyPadding = 8 * scale
    const keyMinWidth = 28 * scale

    // Cerrar al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (keyboardRef.current && !keyboardRef.current.contains(e.target as Node)) {
                const target = e.target as HTMLElement
                if (!target.closest("textarea") && !target.closest("input")) {
                    onClose?.()
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [onClose])

    // Manejar movimiento
    useEffect(() => {
        const handleMove = (clientX: number, clientY: number) => {
            if (dragging) {
                const screenWidth = window.innerWidth
                const screenHeight = window.innerHeight
                const newX = Math.min(Math.max(clientX - dragOffset.x, 0), screenWidth - size.width)
                const newY = Math.min(Math.max(clientY - dragOffset.y, 0), screenHeight - size.height)
                setPosition({ x: newX, y: newY })
            }
            if (resizing) {
                const newWidth = Math.min(Math.max(300, clientX - position.x - resizeOffset.x), 650)
                const newHeight = Math.min(Math.max(220, clientY - position.y - resizeOffset.y), 450)
                setSize({ width: newWidth, height: newHeight })
            }
        }

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                e.preventDefault()
                handleMove(e.touches[0].clientX, e.touches[0].clientY)
            }
        }

        const handleMouseUp = () => {
            setDragging(false)
            setResizing(false)
        }

        const handleTouchEnd = () => {
            setDragging(false)
            setResizing(false)
        }

        if (dragging || resizing) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("touchmove", handleTouchMove, { passive: false })
            document.addEventListener("mouseup", handleMouseUp)
            document.addEventListener("touchend", handleTouchEnd)
            return () => {
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("touchmove", handleTouchMove)
                document.removeEventListener("mouseup", handleMouseUp)
                document.removeEventListener("touchend", handleTouchEnd)
            }
        }
    }, [dragging, resizing, dragOffset, position, size, resizeOffset])

    // Iniciar arrastre
    const handleDragStart = (clientX: number, clientY: number) => {
        setDragging(true)
        setDragOffset({ x: clientX - position.x, y: clientY - position.y })
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("[data-resize]")) return
        handleDragStart(e.clientX, e.clientY)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return
        const target = e.target as HTMLElement
        if (target.closest("button") || target.closest("[data-resize]")) return
        e.preventDefault()
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
    }

    // Iniciar redimensionamiento
    const handleResizeStart = (clientX: number, clientY: number) => {
        setResizing(true)
        setResizeOffset({ x: clientX - position.x - size.width, y: clientY - position.y - size.height })
    }

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation()
        handleResizeStart(e.clientX, e.clientY)
    }

    const handleResizeTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length !== 1) return
        e.stopPropagation()
        e.preventDefault()
        handleResizeStart(e.touches[0].clientX, e.touches[0].clientY)
    }

    // USAR useRef PARA PREVENIR DOBLE CLICK
    const lastKeyPressTime = useRef<number>(0)
    const isProcessing = useRef<boolean>(false)

    const handleKeyClick = (key: string) => {
        // Prevenir doble click rápido
        const now = Date.now()
        if (now - lastKeyPressTime.current < 100 || isProcessing.current) return

        lastKeyPressTime.current = now
        isProcessing.current = true
        setPressedKey(key)

        try {
            if (key.toLowerCase() === "enter") {
                onKeyClick?.("enter")
            } else if (key.toLowerCase() === "backspace") {
                onKeyClick?.("backspace")
            } else if (key.toLowerCase() === "shift") {
                setCapsLock(!capsLock)
            } else if (key.toLowerCase() === "tab") {
                onTabPress?.()
            } else {
                const finalKey = capsLock ? key.toUpperCase() : key.toLowerCase()
                onKeyClick?.(finalKey)
            }
        } finally {
            setTimeout(() => {
                setPressedKey(null)
                isProcessing.current = false
            }, 100)
        }
    }

    const getKeyDisplay = (key: string) => {
        if (key.toLowerCase() === key.toUpperCase()) return key
        return capsLock ? key.toUpperCase() : key.toLowerCase()
    }

    return (
        <div
            ref={keyboardRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
                position: "fixed",
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                cursor: dragging ? "grabbing" : "grab",
                touchAction: "none",
            }}
            className="z-50 select-none"
        >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 h-full flex flex-col overflow-hidden">
                <div
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    className="cursor-move bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-2 flex justify-between items-center border-b border-gray-200 hover:bg-gray-200 transition-colors active:bg-gray-300"
                >
                    <div className="flex gap-1">
                        <button
                            onClick={() => setShowSpecialChars(!showSpecialChars)}
                            style={{ fontSize: `${headerFontSize}px` }}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 active:bg-blue-300 transition-colors font-medium"
                        >
                            {showSpecialChars ? "ABC" : "!@#"}
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-2">
                    {!showSpecialChars ? (
                        <div className="space-y-1">
                            {/* Fila de números - SOLO onClick */}
                            <div className="flex justify-between gap-1">
                                {KEYBOARD_LAYOUT[0].map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => handleKeyClick(key)}
                                        style={{
                                            height: `${keyHeight}px`,
                                            fontSize: `${fontSize}px`,
                                            minWidth: `${keyMinWidth}px`,
                                        }}
                                        className={`flex-1 rounded-lg font-semibold transition-all duration-75 border border-gray-300 ${pressedKey === key
                                            ? "bg-blue-500 text-white shadow-md scale-95"
                                            : "bg-white text-gray-800 shadow-sm hover:bg-gray-50 active:bg-blue-100"
                                            }`}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>

                            {/* Fila 2: QWERTY... - SOLO onClick */}
                            <div className="flex justify-center gap-1">
                                {KEYBOARD_LAYOUT[1].map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => handleKeyClick(key)}
                                        style={{
                                            height: `${keyHeight}px`,
                                            fontSize: `${fontSize}px`,
                                            paddingLeft: `${keyPadding}px`,
                                            paddingRight: `${keyPadding}px`,
                                            minWidth: `${keyMinWidth}px`,
                                        }}
                                        className={`rounded-lg font-semibold transition-all duration-75 border border-gray-300 ${pressedKey === key
                                            ? "bg-blue-500 text-white shadow-md scale-95"
                                            : "bg-white text-gray-800 shadow-sm hover:bg-gray-50 active:bg-blue-100"
                                            }`}
                                    >
                                        {getKeyDisplay(key)}
                                    </button>
                                ))}
                            </div>

                            {/* Fila 3: ASDF... - SOLO onClick */}
                            <div className="flex gap-1">
                                {/* Tecla Shift/Mayúsculas */}
                                <button
                                    onClick={() => handleKeyClick("shift")}
                                    style={{
                                        height: `${keyHeight}px`,
                                        fontSize: `${fontSize * 0.8}px`,
                                        paddingLeft: `${keyPadding}px`,
                                        paddingRight: `${keyPadding}px`,
                                        minWidth: `${keyMinWidth * 1.2}px`,
                                    }}
                                    className={`rounded-lg font-semibold transition-all duration-75 border ${capsLock
                                        ? "border-yellow-400 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 active:bg-yellow-300"
                                        : "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300"
                                        }`}
                                >
                                    {capsLock ? "⇪ MAY" : "⇧ MAY"}
                                </button>

                                {KEYBOARD_LAYOUT[2].map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => handleKeyClick(key)}
                                        style={{
                                            height: `${keyHeight}px`,
                                            fontSize: `${fontSize}px`,
                                            paddingLeft: `${keyPadding}px`,
                                            paddingRight: `${keyPadding}px`,
                                            minWidth: `${keyMinWidth}px`,
                                        }}
                                        className={`rounded-lg font-semibold transition-all duration-75 border border-gray-300 ${pressedKey === key
                                            ? "bg-blue-500 text-white shadow-md scale-95"
                                            : "bg-white text-gray-800 shadow-sm hover:bg-gray-50 active:bg-blue-100"
                                            }`}
                                    >
                                        {getKeyDisplay(key)}
                                    </button>
                                ))}
                            </div>

                            {/* Fila 4: ZXCV... - SOLO onClick */}
                            <div className="flex gap-1">
                                <button
                                    onClick={() => handleKeyClick("tab")}
                                    style={{
                                        height: `${keyHeight}px`,
                                        fontSize: `${fontSize * 0.8}px`,
                                        paddingLeft: `${keyPadding}px`,
                                        paddingRight: `${keyPadding}px`,
                                        minWidth: `${keyMinWidth * 1.3}px`,
                                    }}
                                    className={`rounded-lg font-semibold transition-all duration-75 border border-purple-300 ${pressedKey === "tab"
                                        ? "bg-purple-500 text-white shadow-md scale-95"
                                        : "bg-purple-50 text-purple-700 shadow-sm hover:bg-purple-100 active:bg-purple-200"
                                        }`}
                                >
                                    Tab ↹
                                </button>

                                {KEYBOARD_LAYOUT[3].map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => handleKeyClick(key)}
                                        style={{
                                            height: `${keyHeight}px`,
                                            fontSize: `${fontSize}px`,
                                            paddingLeft: `${keyPadding}px`,
                                            paddingRight: `${keyPadding}px`,
                                            minWidth: `${keyMinWidth}px`,
                                        }}
                                        className={`rounded-lg font-semibold transition-all duration-75 border border-gray-300 ${pressedKey === key
                                            ? "bg-blue-500 text-white shadow-md scale-95"
                                            : "bg-white text-gray-800 shadow-sm hover:bg-gray-50 active:bg-blue-100"
                                            }`}
                                    >
                                        {getKeyDisplay(key)}
                                    </button>
                                ))}
                            </div>

                            {/* Fila de controles - SOLO onClick */}
                            <div className="flex gap-1 pt-1 border-t border-gray-200">
                                <button
                                    onClick={() => handleKeyClick("Backspace")}
                                    style={{
                                        height: `${keyHeight}px`,
                                        fontSize: `${fontSize * 0.8}px`,
                                        paddingLeft: `${keyPadding}px`,
                                        paddingRight: `${keyPadding}px`,
                                        minWidth: `${keyMinWidth * 1.5}px`,
                                    }}
                                    className={`font-semibold rounded-lg transition-all duration-75 border border-red-300 ${pressedKey === "Backspace"
                                        ? "bg-red-500 text-white shadow-md scale-95"
                                        : "bg-red-50 text-red-700 shadow-sm hover:bg-red-100 active:bg-red-200"
                                        }`}
                                >
                                    ← Atrás
                                </button>
                                <button
                                    onClick={() => handleKeyClick(" ")}
                                    style={{
                                        height: `${keyHeight}px`,
                                        fontSize: `${fontSize * 0.8}px`,
                                    }}
                                    className={`flex-1 font-semibold rounded-lg transition-all duration-75 border border-gray-300 ${pressedKey === " "
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "bg-white text-gray-800 shadow-sm hover:bg-gray-50 active:bg-blue-100"
                                        }`}
                                >
                                    Espacio
                                </button>
                                <button
                                    onClick={() => handleKeyClick("Enter")}
                                    style={{
                                        height: `${keyHeight}px`,
                                        fontSize: `${fontSize * 0.8}px`,
                                        paddingLeft: `${keyPadding}px`,
                                        paddingRight: `${keyPadding}px`,
                                        minWidth: `${keyMinWidth * 1.5}px`,
                                    }}
                                    className={`font-semibold rounded-lg transition-all duration-75 border border-green-300 ${pressedKey === "Enter"
                                        ? "bg-green-500 text-white shadow-md scale-95"
                                        : "bg-green-50 text-green-700 shadow-sm hover:bg-green-100 active:bg-green-200"
                                        }`}
                                >
                                    Enter
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-5 gap-1">
                            {SPECIAL_CHARS.map((char) => (
                                <button
                                    key={char}
                                    onClick={() => handleKeyClick(char)}
                                    style={{
                                        height: `${keyHeight}px`,
                                        fontSize: `${fontSize}px`,
                                        minWidth: `${keyMinWidth}px`,
                                    }}
                                    className={`rounded-lg font-semibold transition-all duration-75 border border-gray-300 ${pressedKey === char
                                        ? "bg-blue-500 text-white shadow-md scale-95"
                                        : "bg-white text-gray-800 shadow-sm hover:bg-gray-50 active:bg-blue-100"
                                        }`}
                                >
                                    {char}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    data-resize
                    onMouseDown={handleResizeMouseDown}
                    onTouchStart={handleResizeTouchStart}
                    style={{ cursor: "nwse-resize" }}
                    className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-blue-400 to-transparent rounded-tl-lg hover:from-blue-500 active:from-blue-600 transition-colors touch-none"
                />
            </div>
        </div>
    )
}