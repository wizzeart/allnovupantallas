import { HomeIcon, Package2Icon, ShoppingCartIcon, TruckIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"

export function DomicilioComponent() {
    return (
        <div className="flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col items-center w-full">
                <div className="layout-content-container flex flex-col w-full flex-1 px-4 sm:px-6 lg:px-8">
                    <main className="max-w-6xl mx-auto text-left">
                        <div className="@container w-full max-w-7xl">
                            <div className="px-4 sm:px-6 md:px-8">
                                <div className="w-full mx-auto">
                                    <div className="@container">
                                        <div className="@[480px]:p-4">
                                            <div className="relative flex min-h-[600px] flex-col gap-6 @[480px]:gap-8 @[480px]:rounded-xl overflow-hidden">
                                                <Image
                                                    alt="imagen del auto"
                                                    src="/camion.png"
                                                    width={1600}
                                                    height={1000}
                                                    className="absolute inset-0 w-full h-full object-cover bg-center bg-no-repeat z-0 dark:opacity-60 opacity-65"
                                                />

                                                <div className="absolute inset-0 bg-transparent z-10 " />

                                                {/* Contenido superpuesto */}
                                                <div className="relative z-20 flex flex-1 flex-col justify-center items-center text-center p-8 gap-6">
                                                    <div className="flex flex-col gap-4 max-w-3xl mt-17">
                                                        <p className="text-black text-4xl sm:text-5xl font-bold leading-tight max-w-4xl">Llevamos la comodidad a tu hogar</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-xl sm:text-2xl font-normal leading-normal text-black dark:text-slate-300 max-w-6xl mx-auto px-4">
                            Descubre cómo nuestro servicio de entrega rápido y seguro lleva tus electrodomésticos favoritos directamente a tu puerta. Nos encargamos de todo para que tú solo te preocupes por disfrutar.
                        </p>
                        <div className="w-full max-w-7xl mx-auto">
                            <h2 className="text-black dark:text-black text-4xl sm:text-5xl font-bold leading-tight tracking-[-0.015em] text-center mb-12">Nuestro Proceso de Entrega</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 px-4">
                                <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-background-dark p-8 text-center items-center hover:shadow-lg transition-shadow duration-300">
                                    <ShoppingCartIcon className="size-15" />
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-[#0D2C54] dark:text-black text-2xl font-bold leading-tight">1. Realiza tu Pedido</h3>
                                        <p className="text-[#4A4A4A] dark:text-gray-300 text-lg font-normal leading-normal">Elige tus productos en nuestra tienda online y completa tu compra en pocos clics.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-background-dark p-8 text-center items-center hover:shadow-lg transition-shadow duration-300">
                                    <Package2Icon className="size-15" />
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-[#0D2C54] dark:text-black text-2xl font-bold leading-tight">2. Preparamos tu Envío</h3>
                                        <p className="text-[#4A4A4A] dark:text-gray-300 text-lg font-normal leading-normal">Nuestro equipo de almacén procesa y empaqueta tu pedido con el máximo cuidado.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-background-dark p-8 text-center items-center hover:shadow-lg transition-shadow duration-300">
                                    <TruckIcon className="size-15" />
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-[#0D2C54] dark:text-black text-2xl font-bold leading-tight">3. Notificación y Seguimiento</h3>
                                        <p className="text-[#4A4A4A] dark:text-gray-300 text-lg font-normal leading-normal">Te enviaremos una notificación a tu correo electrónico notificandote del estado de tu pedido</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-background-dark p-8 text-center items-center hover:shadow-lg transition-shadow duration-300">
                                    <HomeIcon className="size-15" />
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-[#0D2C54] dark:text-black text-2xl font-bold leading-tight">4. Recíbelo en Casa</h3>
                                        <p className="text-[#4A4A4A] dark:text-gray-300 text-lg font-normal leading-normal">Tu nuevo electrodoméstico llegará a tu domicilio listo para que lo disfrutes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-7xl mx-auto px-4">
                            <h2 className="text-black dark:text-black text-4xl sm:text-5xl font-bold leading-tight tracking-[-0.015em] text-center mb-12">Zonas sin Cobertura</h2>
                            <div className="w-full flex flex-col lg:flex-row gap-8 items-center bg-white dark:bg-background-dark border border-slate-200 dark:border-gray-700 rounded-2xl p-8 sm:p-12">
                                <div className="w-full lg:w-1/2 h-full">
                                    <Image width={300} height={300} className="rounded-xl w-full h-full object-cover" alt="Mapa de cobertura" src="/mapa.png" />
                                </div>
                                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                                    <h3 className="text-2xl font-bold text-[#0D2C54] dark:text-black">Actualmente no llegamos a estas zonas</h3>
                                    <p className="text-[#4A4A4A] dark:text-gray-300 text-lg">Lamentablemente, nuestro servicio a domicilio solo esta disponible para la provincia de <strong>La Habana</strong> con algunas limitaciones. Estamos trabajando para expandir nuestra cobertura y llegar a más lugares pronto.</p>
                                    <h3 className="text-2xl font-bold text-[#0D2C54] dark:text-black">Límites establecidos por municipio para las entregas:</h3>
                                    <ul className="px-8">
                                        <li className="text-[#4A4A4A] dark:text-gray-300 text-lg">
                                            - Arroyo Naranjo: Las Guásimas(No Managua, El Volcán).
                                        </li>
                                        <li className="text-[#4A4A4A] dark:text-gray-300 text-lg">
                                            - Boyero: El Rincón(No Bejucal).
                                        </li>
                                        <li className="text-[#4A4A4A] dark:text-gray-300 text-lg">
                                            - Cotorro: Alberro(Cuatro Caminos para clientes puntuales y por muy buenas compras).
                                        </li>
                                        <li className="text-[#4A4A4A] dark:text-gray-300 text-lg">
                                            - Guanabacoa: Pueblo Santa Fe (Peñalver y Las Minas para clientes puntuales y por muy buenas compras).
                                        </li>
                                        <li className="text-[#4A4A4A] dark:text-gray-300 text-lg">
                                            - Habana del Este: Micro X Alamar (No Santa María del Mar, Guanabo).
                                        </li>
                                        <li className="text-[#4A4A4A] dark:text-gray-300 text-lg">
                                            - Lisa: Punta Brava (Valle Grande y la UCI para clientes puntuales y por muy buenas compras, No Guatao).
                                        </li>
                                        <li className="text-[#4A4A4A] dark:text-gray-300 text-lg">
                                            - Playa: Santa Fe (No Baracoa).
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className="w-full max-w-7xl mx-auto px-4">
                            <h2 className="text-black dark:text-black text-4xl sm:text-5xl font-bold leading-tight tracking-[-0.015em] text-center mb-12">Tiempos y Tarifas</h2>
                            <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
                                <div className="flex flex-col gap-4 p-8 rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-2xl font-bold text-primary text-center">Horarios disponibles para entrega:</h3>
                                    <p className="text-xl font-semibold text-[#0D2C54] dark:text-black text-center">Lunes a viernes → 8:00 AM – 7:00 PM</p>
                                    <p className="text-xl font-semibold text-[#0D2C54] dark:text-black text-center">Sábados → 8:00 AM – 2:00 PM</p>
                                    <p className="text-center">Si el cliente solicita una hora determinada, siempre trataremos de complacerlo sin afectar nuestros itinerarios de entrega.</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-6xl mx-auto px-4">
                            <div className="flex flex-col items-center gap-6 text-center  dark:bg-gray-800 p-12 sm:p-16 rounded-2xl">
                                <h2 className="text-black text-4xl sm:text-5xl font-bold leading-tight">¿Listo para renovar tu hogar?</h2>
                                <p className="text-xl text-black max-w-2xl">Explora nuestro catálogo y encuentra los mejores electrodomésticos con la entrega más confiable.</p>
                                <Button className="bg-black hover:bg-black/80 min-w-[200px] h-14 px-10 mt-6 text-xl" size={"lg"}>
                                    <Link href={"/"}>
                                        Ver productos
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}