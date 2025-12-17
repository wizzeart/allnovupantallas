'use client'

import { Minus, Plus, Trash2, CreditCard, Shield, Truck, Loader2, ArrowUpRightIcon, X } from "lucide-react"
import { useMemo, useState } from "react"
import { useCart } from "./cart-provider"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button"
import { ShopForm } from "./shopForm"
import Link from "next/link";
import Image from "next/image";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { Municipio } from "@/lib/actions/products";

// Interface local para asegurar tipos
export interface CartItemDisplay {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

export default function CartComponent({ municipios }: { municipios: Municipio[] | [] }) {
    const { items, updateQuantity, removeItem, clearCart } = useCart()
    const [open, setOpen] = useState(false)
    const [isLoading2, setLoading] = useState(true)
    const backendUrl = "https://allnovu.com"

    // Validar y transformar items para evitar errores
    const displayItems: CartItemDisplay[] = useMemo(() => {
        return items
            .filter(item => item && typeof item === 'object')
            .map(item => ({
                id: item.id || 'unknown',
                name: item.name || 'Producto sin nombre',
                price: typeof item.price === 'number' ? item.price : 0,
                quantity: typeof item.quantity === 'number' ? item.quantity : 1,
                image: item.image || ''
            }))
    }, [items])


    // Calcular subtotal (sin envío)
    const subtotal = displayItems.reduce((sum, item) => {
        const itemPrice = typeof item.price === 'number' ? item.price : 0
        const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1
        return sum + (itemPrice * itemQuantity)
    }, 0)

    const shipping = displayItems.length > 0 ? 6 : 0 // Envío fijo de $6
    const finalTotal = subtotal + shipping

    // Calcular cantidad total de productos
    const totalItems = displayItems.reduce((sum, item) => {
        return sum + (typeof item.quantity === 'number' ? item.quantity : 1)
    }, 0)

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeItem(id)
        } else {
            updateQuantity(id, newQuantity)
        }
    }

    // Función segura para formatear precios
    const formatPrice = (price: number): string => {
        if (typeof price !== 'number' || isNaN(price)) {
            return '$0.00'
        }
        return `$${price.toFixed(2)}`
    }

    if (displayItems.length === 0) {
        return (
            <div className="flex flex-col w-full h-screen">
                <Empty className="items-center justify-center -mt-40">
                    < EmptyHeader >
                        <EmptyMedia className="size-30" variant="default">
                            <CreditCard className="size-40 text-black" />
                        </EmptyMedia>
                        <EmptyTitle className="text-5xl text-black">No hay productos en tu carrito</EmptyTitle>
                        <EmptyDescription className="text-black text-2xl">
                            Necesita agregar productos para poder realizar una compra.
                        </EmptyDescription>
                    </EmptyHeader >
                    <EmptyContent>
                        <div className="flex gap-2">
                            <Link href={'/'}>
                                <Button size={"lg"} className="bg-amber-500 text-xl w-[200px] h-20 hover:bg-amber-500/90 text-white font-bold flex items-center justify-center gap-2" >
                                    Volver a comprar
                                </Button>
                            </Link>
                        </div>
                    </EmptyContent>
                </Empty >

            </div >
        )
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row min-h-screen">
                <main className="flex-1 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-5">
                    {/* Header con gradiente */}
                    <div
                        className="rounded-2xl p-6 mb-6"
                    >
                        <div className="flex justify-between items-center">
                            <div>

                                <p className="text-black text-4xl font-black leading-tight tracking-tighter">
                                    Tu Carrito de Compras
                                </p>
                                <p className="text-black/90 mt-2">
                                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito
                                </p>
                                {finalTotal < 40 && (
                                    <div className="rounded-2xl border p-6 mt-10 border-red-600">
                                        <div className="flex flex-row gap-4">
                                            <X className="h-9 w-9 size-20" />
                                            <h3 className="text-2xl text-red-600">
                                                No puede finalizar la compra porque el importe total debe ser mayor a 40 $
                                            </h3>
                                        </div>

                                    </div>
                                )}
                            </div>
                            <button
                                onClick={clearCart}
                                className="px-4 w-[200px] py-2 bg-amber-600 hover:bg-amber-600/80 text-white font-medium flex items-center gap-2 rounded-lg backdrop-blur-sm transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Vaciar carrito
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 py-4">
                        {displayItems.map((item) => {
                            const itemPrice = typeof item.price === 'number' ? item.price : 0
                            const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1
                            const itemSubtotal = itemPrice * itemQuantity

                            return (
                                <div
                                    key={item.id}
                                    className="flex gap-4 bg-white dark:bg-gray-900 px-6 py-4 justify-between items-center rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow"
                                >
                                    <div className="flex items-center gap-6 flex-1">
                                        <Image src={item.image} height={200} width={300} className="bg-center bg-no-repeat bg-cover rounded-lg h-[120px] w-[180px] shrink-0 shadow-md" alt={item.name} />

                                        <div className="flex flex-1 flex-col justify-center gap-2">
                                            <p className="text-gray-900 dark:text-gray-100 text-xl font-semibold leading-normal">
                                                {item.name}
                                            </p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                                                {formatPrice(itemPrice)} c/u
                                            </p>
                                            <p className="text-blue-600 dark:text-blue-400 text-base font-medium leading-normal">
                                                Subtotal: {formatPrice(itemSubtotal)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, itemQuantity - 1)}
                                                className="text-xl font-medium flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                disabled={itemQuantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <input
                                                className="text-lg font-medium w-12 p-0 text-center bg-transparent focus:outline-none focus:ring-0 border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-gray-900 dark:text-gray-100"
                                                type="number"
                                                value={itemQuantity}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value)
                                                    if (!isNaN(value)) {
                                                        handleQuantityChange(item.id, value)
                                                    }
                                                }}
                                                min="1"
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(item.id, itemQuantity + 1)}
                                                className="text-xl font-medium flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </main>


                <aside
                    className="w-full lg:w-96 lg:max-w-sm p-6 flex flex-col gap-6 rounded-2xl mx-4 lg:mx-0 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] max-h-[80vh] lg:max-h-none lg:mr-4 overflow-y-auto"

                >
                    <div>
                        <h3 className="text-2xl font-bold text-black mb-4">Resumen del Pedido</h3>
                        <div className="flex flex-col gap-3 text-lg bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                            <div className="flex justify-between">
                                <span className="text-black/90">Productos ({totalItems})</span>
                                <span className="text-black font-medium">
                                    {formatPrice(subtotal)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black/90">Envío</span>
                                <span className="text-black font-medium">
                                    {shipping > 0 ? formatPrice(shipping) : 'Gratis'}
                                </span>
                            </div>

                            <hr className="my-2 border-white/30" />
                            <div className="flex justify-between">
                                <span className="text-black text-xl font-bold">Total</span>
                                <span className="text-amber-300 text-xl font-bold">
                                    {formatPrice(finalTotal)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button
                            className="w-full flex items-center justify-center rounded-xl h-14 px-6 bg-amber-600 hover:bg-amber-700 text-white text-xl font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-300/50 transition-all duration-300"
                            disabled={finalTotal < 40}
                            onClick={() => {
                                setLoading(false);
                                setOpen(true);
                            }}
                        >
                            Finalizar Compra
                        </Button>
                        <Link href={'/'}>
                            <Button
                                variant="outline"
                                className="w-full hover:text-white flex items-center justify-center rounded-xl h-14 px-6 bg-amber-600 hover:bg-amber-700 text-white text-xl font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-300/50 transition-all duration-300"

                            >
                                Continuar Comprando
                            </Button>
                        </Link>
                    </div>

                    {/* Garantías */}
                    <div className="mt-4 pt-4 border-t border-white/30">
                        <div className="flex items-center gap-2 text-sm text-black/90">
                            <Shield className="w-4 h-4" />
                            <span>Compra 100% segura - Protegida por encriptación SSL</span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Sección de beneficios con gradiente */}
            <div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-6 mx-4 rounded-2xl shadow-lg"

            >
                <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                    <div className="w-12 h-12 bg-white/20 rounded-full border-amber-600 flex items-center justify-center">
                        <Truck className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-black">Envío Seguro</h4>
                        <p className="text-sm text-black/90">Envíos hasta la puerta de tu casa</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                    <div className="w-12 h-12 bg-white/20 border-green-500 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-black">Compra Segura</h4>
                        <p className="text-sm text-black/90">Protegido con encriptación SSL</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-black">Devoluciones</h4>
                        <p className="text-sm text-black/90">30 días para cambiar de opinión</p>
                    </div>
                </div>
            </div>


            {/* Diálogos */}
            {!isLoading2 ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTitle></DialogTitle>
                    <DialogContent className="sm:max-w-[920px] h-[1200px] -mt-30 border-0 shadow-2xl">
                        <div
                            className="rounded-lg overflow-hidden h-full"
                        >
                            <div className="p-1">
                                <DialogHeader className="pb-4">
                                    {/* <Image width={10} height={40} src="./logo/marca-03.png" alt="fotoLogo" /> */}
                                    <h2>
                                        Finalizar Compra
                                    </h2>

                                </DialogHeader>
                                <ShopForm setOpen={setOpen} municipios={municipios} subtotal={subtotal} shippingCost={shipping} total={finalTotal} />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog >
            ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent
                        className="sm:max-w-[920px] h-[700px] -mt-20 border-0 shadow-2xl"
                    >
                        <div className="flex flex-col justify-center items-center h-full">
                            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                                <Loader2 className='text-4xl animate-spin text-black' />
                            </div>
                            <h1 className="text-xl text-black font-semibold">
                                Cargando los datos, espere por favor 😊
                            </h1>
                            <p className="text-black/80 mt-2">
                                Preparando tu experiencia de compra...
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            )
            }
        </>
    )
}