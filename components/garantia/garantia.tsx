import { AlertTriangle, CheckCircle, Clock, Mail, Phone, Shield } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export function GarantíaComponent() {
    const whatsappNumber = "50996853"
    const whatsappMessage = "Hola,tengo un problema con mi electrodoméstico"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    return (
        <div className="w-full mx-auto text-left bg-white text-black">
            <div className="layout-container flex h-full grow flex-col">
                <main className="flex flex-1 justify-center py-10 sm:py-16 md:py-20">
                    <div className="flex max-w-full flex-1 flex-col gap-10 px-6 sm:gap-16">
                        {/* Encabezado */}
                        <section className="flex flex-col items-center justify-center gap-6 text-center">
                            <div className="relative">
                                <Shield className="size-24 text-gray-800 animate-pulse" />
                                <CheckCircle className="absolute -bottom-2 -right-2 size-10 text-green-500" />
                            </div>
                            <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight sm:text-6xl md:text-7xl">
                                Política Integral de Garantía y Protección al Cliente
                            </h1>
                            <p className="max-w-3xl text-lg font-normal leading-relaxed text-gray-700">
                                En All Novu, nos comprometemos con la excelencia y la satisfacción total de nuestros clientes.
                                Esta política detalla minuciosamente los términos, condiciones, derechos y responsabilidades
                                que rigen nuestra garantía, diseñada para ofrecerte seguridad y confianza en cada compra.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">100% Protección</span>
                                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">Soporte Prioritario</span>
                                <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm">Transparencia Total</span>
                            </div>
                        </section>

                        {/* Tarjetas de Resumen */}
                        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col gap-6 p-8 bg-gray-50 rounded-2xl border border-green-200 hover:border-green-400 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <CheckCircle className="size-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Cobertura Completa</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Esta garantía cubre exclusivamente los defectos de fabricación y/o fallas en el funcionamiento normal del producto.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 p-8 bg-gray-50 rounded-2xl border border-red-200 hover:border-red-400 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-red-100 rounded-lg">
                                        <AlertTriangle className="size-8 text-red-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Exclusiones Claras</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Situaciones específicas no cubiertas para mantener transparencia y evitar malentendidos.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 p-8 bg-gray-50 rounded-2xl border border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-yellow-100 rounded-lg">
                                        <Clock className="size-8 text-yellow-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Procedimientos Definidos</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Proceso detallado para reclamaciones con plazos y pasos específicos para tu tranquilidad.
                                </p>
                            </div>
                        </section>

                        {/* Términos de Garantía */}
                        <section className="flex flex-col gap-6 text-gray-800">
                            <ol className="list-decimal list-outside space-y-8 text-lg ml-6">
                                <li>
                                    <div className="font-bold text-gray-900 text-xl mb-2">Cobertura de la garantía All Novu:</div>
                                    <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Esta garantía cubre exclusivamente los defectos de fabricación y/o fallas en el funcionamiento normal del producto, siempre que haya sido utilizado bajo condiciones de uso doméstico y conforme a las instrucciones del fabricante.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <div className="font-bold text-gray-900 text-xl mb-2"> Incluye:</div>
                                    <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Mano de obra y repuestos necesarios para la reparación.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Servicio técnico en los centros autorizados de la marca.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Sustitución de piezas defectuosas o reparaciones sin costo adicional con piezas originales de la marca.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Cambio por un equipo nuevo. (Para esta opción se deben haber agotado previamente las posibilidades de reparación o sustitución de piezas o haber recibido el equipo en menos de 48 horas).
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            La opción escogida siempre tendrá que ser factible y no resultar económicamente desproporcionada según criterio de la empresa, debiendo respetar el orden expresado en los puntos anteriores.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="font-bold text-gray-900 text-xl mb-2">Tenga en cuenta que:</p>
                                    <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Está estipulado que una vez que el cliente realice la compra de un equipo, revise y acepte la entrega, no se admite la devolución de este.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            El tiempo de la garantía es el determinado en cada equipo en específico y será válido desde el momento de la compra del producto.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="font-bold text-gray-900 text-xl mb-2">La garantía pierde su validez en los siguientes casos:</p>
                                    <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Vencimiento de tiempo de garantía.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            No presentación de una factura o ticket válido al momento de la reclamación.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Productos adquiridos a través de distribuidores NO autorizados de la marca.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Clientes que compren productos al por mayor.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            No haber sido instalado tal y como dice su manual de instalación.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="font-bold text-gray-900 text-xl mb-2">La Garantía no cubre:</p>
                                    <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Daños ocasionados por golpes, arañazos, caídas, humedad, líquidos, corrosión, insectos o cualquier agente externo, transportación indebida.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Fallas derivadas de instalaciones eléctricas inadecuadas, variaciones de voltaje o sobrecargas.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Descargas eléctricas.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Uso indebido, negligencia, manipulación incorrecta o reparación por personal no autorizado.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Desgaste normal de piezas consumibles (ej. baterías, focos, fusibles, accesorios).
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Cuando se abra, se modifiquen o adapten alguna de sus partes por personal no autorizado.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Costos de transporte, traslado o envío del producto al centro de servicio cuando no esté cubierto por la garantía.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Visitas técnicas por problemas ajenos al producto (cortes de energía, malas conexiones, problemas de red o accesorios externos).
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="font-bold text-gray-900 text-xl mb-2">Cláusula sobre visitas técnicas a domicilio con depósito de garantía:</p>
                                    <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Equipos pequeños y que no estén instalados el cliente lo puede llevar directamente al taller para su revisión. Para equipos grandes y equipos instalados tiene que acudir el técnico al domicilio.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Para programar una visita técnica a domicilio, el cliente deberá realizar antes un depósito de garantía por el monto de 10.000 CUP.
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Caso 1. Si el diagnóstico confirma que la falla corresponde a un defecto de fabricación o funcionamiento del equipo cubierto por la garantía:
                                            <ul className="list-decimal px-4 list-inside mt-2 ml-4 space-y-1">
                                                <li className="text-base font-normal leading-relaxed text-gray-600">
                                                    La reparación y/o sustitución se realizará sin costo para el cliente.
                                                </li>
                                                <li className="text-base font-normal leading-relaxed text-gray-600">
                                                    El depósito será reembolsado íntegramente en un plazo máximo de 4 días.
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Caso 2. Si el diagnóstico determina que la falla no corresponde a un defecto cubierto por la garantía (ejemplo: mal uso, daños accidentales, instalación incorrecta, problemas eléctricos externos u otros no atribuibles al equipo):
                                            <ul className="list-decimal px-4 list-inside mt-2 ml-4 space-y-1">
                                                <li className="text-base font-normal leading-relaxed text-gray-600">
                                                    El depósito se aplicará como pago parcial o total de los costos de la visita técnica y/o reparación.
                                                </li>
                                                <li className="text-base font-normal leading-relaxed text-gray-600">
                                                    En caso de que el costo sea mayor al depósito, el cliente abonará la diferencia.
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="text-base font-normal leading-relaxed text-gray-700">
                                            Caso 3. Si durante la visita no se detecta ninguna falla en el equipo y funciona correctamente, el depósito se aplicará como pago por la visita técnica realizada.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </section>

                        {/* Sección de Contacto */}
                        <section className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:p-10 text-left w-full border border-gray-300">
                            <div className="flex flex-col items-center gap-4 text-gray-900">
                                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Una vez leída nuestra Política de Garantía y estar de acuerdo con la misma:</h2>
                                <p className="max-w-xl text-base text-gray-700">Nuestro equipo de soporte estará listo para ayudarle. Contáctenos para recibir asistencia inmediata y resolver cualquier inconveniente con su producto.</p>
                                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Contactos:</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                                    <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                                        <Mail className="size-10 mx-auto mb-4 text-blue-600" />
                                        <h4 className="font-bold text-gray-900 mb-2">Correo Electrónico</h4>
                                        <div className="mt-2 max-w-fit justify-start">
                                            <Button
                                                asChild
                                                className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 
                                                        text-sm sm:text-base lg:text-lg 
                                                        bg-orange-500 hover:bg-orange-600 text-white font-bold 
                                                        rounded-lg md:rounded-xl 
                                                        shadow hover:shadow-lg 
                                                        transition-all duration-300 
                                                        flex items-center justify-center 
                                                        w-full sm:w-auto min-h-11 sm:min-h-[52px]"
                                            >
                                                <Link href="mailto:soportetecnico@allnovu.com">
                                                    <Mail className="mr-2 size-5" />
                                                    Contactar Soporte Técnico
                                                </Link>
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            (Tenga en cuenta que el correo de respuesta podría ser redirigido a su carpeta de spam o correos no deseado. Le recomendamos verificar dichas carpetas en caso de no recibirlo en su bandeja de entrada).
                                        </p>
                                    </div>

                                    <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                                        <Phone className="size-10 mx-auto mb-4 text-green-600" />
                                        <h4 className="font-bold text-gray-900 mb-2">WhatsApp</h4>
                                        <div className="mt-2 max-w-fit justify-start">
                                            <Button
                                                asChild
                                                className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 
                                                        text-sm sm:text-base lg:text-lg 
                                                        bg-orange-500 hover:bg-orange-600 text-white font-bold 
                                                        rounded-lg md:rounded-xl 
                                                        shadow hover:shadow-lg 
                                                        transition-all duration-300 
                                                        flex items-center justify-center 
                                                        w-full sm:w-auto min-h-11 sm:min-h-[52px]"
                                            >
                                                <Link href={whatsappUrl} className="flex items-center justify-center gap-2">
                                                    <svg
                                                        className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 0.72 0.72"
                                                        fill="currentColor"
                                                    >
                                                        <path clipRule="evenodd"
                                                            d="M0.615 0.105C0.547 0.037 0.456 0 0.36 0 0.162 0 0 0.162 0 0.36c0 0.063 0.019 0.123 0.051 0.178L0 0.72l0.19 -0.046C0.242 0.702 0.3 0.72 0.36 0.72c0.198 0 0.36 -0.162 0.36 -0.36 0 -0.096 -0.037 -0.187 -0.105 -0.255M0.36 0.66c-0.053 0 -0.104 -0.018 -0.15 -0.045l-0.011 -0.007 -0.113 0.03 0.03 -0.11 -0.007 -0.011C0.079 0.469 0.06 0.416 0.06 0.36 0.06 0.196 0.196 0.06 0.36 0.06c0.08 0 0.156 0.032 0.212 0.088S0.66 0.28 0.66 0.36c0 0.164 -0.136 0.3 -0.3 0.3m0.165 -0.226c-0.009 -0.004 -0.053 -0.026 -0.061 -0.029s-0.014 -0.004 -0.02 0.004 -0.023 0.029 -0.028 0.035c-0.005 0.006 -0.01 0.007 -0.019 0.002s-0.038 -0.014 -0.072 -0.044c-0.027 -0.024 -0.045 -0.053 -0.05 -0.062s-0.001 -0.014 0.004 -0.018c0.004 -0.004 0.009 -0.01 0.013 -0.016s0.006 -0.009 0.009 -0.015 0.002 -0.011 -0.001 -0.016c-0.002 -0.004 -0.02 -0.049 -0.028 -0.067 -0.007 -0.017 -0.015 -0.015 -0.02 -0.015 -0.005 0 -0.011 0 -0.017 0s-0.016 0.002 -0.024 0.011c-0.008 0.009 -0.031 0.031 -0.031 0.075s0.032 0.087 0.037 0.093 0.063 0.097 0.153 0.135c0.021 0.009 0.038 0.015 0.051 0.019 0.022 0.007 0.041 0.006 0.056 0.004 0.017 -0.003 0.053 -0.022 0.061 -0.043s0.007 -0.039 0.005 -0.043c-0.002 -0.004 -0.008 -0.006 -0.017 -0.011"
                                                        />
                                                    </svg>
                                                    <span className="whitespace-nowrap">Contactar Soporte Técnico</span>
                                                </Link>
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Solo mensajes - (Tenga en cuenta que solo será atendido vía mensaje por Whatsapp respetando los horarios de atención al cliente y los plazos de respuesta).
                                        </p>
                                    </div>
                                </div>
                                <p className="max-w-xl text-base text-gray-700">Plazo de respuesta: 24 a 48 horas hábiles.</p>
                                <p className="max-w-xl text-base text-gray-700">Horario de atención al cliente: De lunes a viernes → 8:00 AM – 5:00 PM.</p>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}