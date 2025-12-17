import { HeartIcon, RocketIcon } from "lucide-react"

export function EquipoComponent() {
    return (
        <div className="min-h-screen w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black dark:text-text-primary-dark mb-10">
                        Quiénes somos
                    </h1>
                    <div className="space-y-6 text-lg text-black dark:text-text-secondary-dark mb-16">
                        <p className="text-xl">All Novu es una marca líder en Latinoamérica, especializada en la comercialización de electrodomésticos, soluciones energéticas solares y equipos de purificación de agua. Nuestra presencia se extiende a través de una sólida red de distribuidores oficiales en varios países de la región.</p>
                        <p className="text-xl">Para adquirir nuestros productos, los clientes deben contactar a nuestros distribuidores oficiales, quienes garantizan el mejor precio del mercado. Además, ofrecemos un servicio técnico especializado y la disponibilidad de piezas originales para asegurar el óptimo funcionamiento y la durabilidad de cada equipo.</p>
                        <p className="text-xl">allnovu.com es nuestra plataforma de comercialización online, diseñada para brindar una experiencia de compra segura y eficiente. A través de nuestro sitio web, garantizamos todas las etapas del comercio electrónico, desde la selección del producto hasta la entrega final, asegurando la satisfacción de nuestros clientes en cada paso del proceso.</p>
                        <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-8">
                            ¡Bienvenido a la familia All Novu, donde la innovación y la calidad se encuentran para mejorar tu vida!
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="flex flex-col transition-all hover:bg-slate-100 duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer gap-6 rounded-2xl border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-background-dark p-10 text-center items-center h-full">
                        <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 text-primary mb-5">
                            <RocketIcon className="size-16" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Misión</h2>
                        <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                            Ofrecer electrodomésticos innovadores y de alta calidad que mejoren la vida de nuestros clientes, brindando soluciones energéticas sostenibles y productos de purificación de agua que transformen los hogares latinoamericanos.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 rounded-2xl transition-all hover:bg-slate-100 duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-blue-600 dark:border-gray-700 bg-white dark:bg-background-dark p-10 text-center items-center h-full">
                        <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 text-primary mb-5">
                            <HeartIcon className="size-16" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Valores</h2>
                        <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                            Calidad, innovación, sostenibilidad y compromiso con el cliente son nuestros pilares fundamentales. Nos guiamos por la integridad, la excelencia en el servicio y la responsabilidad social para construir relaciones duraderas con nuestra comunidad.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}