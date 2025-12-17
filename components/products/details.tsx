
export function ProductsDetails() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center py-5 sm:px-4 md:px-8 lg:px-16 xl:px-40">
                    <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
                        <div className="flex flex-col gap-4 p-4">
                            <div id="carousel-main"
                                className="relative w-full aspect-square @[480px]:aspect-video overflow-hidden rounded-xl">
                                <div id="main-image" className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrCoMQhWUFBMhkkiYqjfirLIRveuhGFwfGgWk5biiFtRjODDx1dp4rFgcGTO_N2JjYyzHNqW4tFBQVCoc6CniBRFgyVp0cfIYWChl5CXWpRn6bJbunhRpeaOFEeHHnLXbi6AlKHqJwEWPwSta-axU0B861iNI9Yp9S5OF5wcxKdE3rrU3cgvYknRSLTtMcAP4TIMfmLKETrppVBO0fxx8mqVhx-GiUBohQ7qnCt3CVeOAz6_p-ExlXDKX0uaX3o3SFitLRPTkuRM0")' }}>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-between p-4">
                                    <button id="prev-btn"
                                        className="bg-black/30 text-white rounded-full p-2 backdrop-blur-sm hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white">
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>
                                    <button id="next-btn"
                                        className="bg-black/30 text-white rounded-full p-2 backdrop-blur-sm hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white">
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                                    <div id="indicator-0" className="size-2 rounded-full bg-white"></div>
                                    <div id="indicator-1" className="size-2 rounded-full bg-white/50"></div>
                                    <div id="indicator-2" className="size-2 rounded-full bg-white/50"></div>
                                    <div id="indicator-3" className="size-2 rounded-full bg-white/50"></div>
                                    <div id="indicator-4" className="size-2 rounded-full bg-white/50"></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <button id="thumb-prev"
                                    className="text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">arrow_back_ios</span>
                                </button>
                                <div className="grid grid-cols-5 gap-2.5 flex-1">
                                    <div id="thumb-0"
                                        className="aspect-square w-full overflow-hidden rounded-lg ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark">
                                        <img alt="Thumbnail 1" className="h-full w-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrCoMQhWUFBMhkkiYqjfirLIRveuhGFwfGgWk5biiFtRjODDx1dp4rFgcGTO_N2JjYyzHNqW4tFBQVCoc6CniBRFgyVp0cfIYWChl5CXWpRn6bJbunhRpeaOFEeHHnLXbi6AlKHqJwEWPwSta-axU0B861iNI9Yp9S5OF5wcxKdE3rrU3cgvYknRSLTtMcAP4TIMfmLKETrppVBO0fxx8mqVhx-GiUBohQ7qnCt3CVeOAz6_p-ExlXDKX0uaX3o3SFitLRPTkuRM0" />
                                    </div>
                                    <div id="thumb-1"
                                        className="aspect-square w-full overflow-hidden rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                                        <img alt="Thumbnail 2" className="h-full w-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcESM6rA99-45uO9oXlGhNM0-1nXgw3eoEKV2PhR1R4DmfEQlN7sCbtun3cRIw6Vj3y4loJ4CHNMzOQ9ZrOcpWChr8bPLVmKkfUdzhHqsu-68DRKwGc9g1Ctr5D9xnu0MuG09tmuRWGbw94jxE43uXEOGOxmAeiR4wWVAqvqjh2JKLS_CiIHC_sElrJ4Fe38_xmCOjWqtVWzIQGZ0UelTndprzL-sMheEkN-xJB4YT3tUiDZz-k7hsK9xrvXDs7b1HAjlQztzF89c" />
                                    </div>
                                    <div id="thumb-2"
                                        className="aspect-square w-full overflow-hidden rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                                        <img alt="Thumbnail 3" className="h-full w-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqdm1Mq_hxzEzxdE25qonbldXD0JC7IZfyjacAmsNOoLMh6JhmBJh2CsRHubIHCuAh7oKnMVP-c1a4kM-5ZvTSGiIcGPiXsG8jlPVytxA9w61vujh4Tz4cuCvaRj8ojdTfBRYVDtxAaqLLD3q0_94qfJFpDwcPjanXL471lJovexZ08mHW2t3uAfE_xJFG-F8xglVQe1tGuUzNHmR2zatQ55HmBv-XnuhBd2XXDMQEwZjJnCC0EWHIA16V90oZbQysDtSodmt2NCg" />
                                    </div>
                                    <div id="thumb-3"
                                        className="aspect-square w-full overflow-hidden rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                                        <img alt="Thumbnail 4" className="h-full w-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFGVTBd8c7pdXLtGgRjf75_DYuwm7EtnIA_4HxQExLdyXFVnEI-MSSyeI2t7faS89KEzsO6CQCOrJusURQpXm6-BbwWoN3mEITm78ZyvD2wPY-i4RDt8T2-HUE065_AjFUL80R2YVbYPKIvf3ywrJn7ArmXKfm8ywi10_tkv4QCrXOFzr-IW_yhOU_RbvkdVugWQ6KfFpPJxFEdEkOEUmM3UW0IbPpLrPAMkvp16zQ2Zp1RBnS7HgwM-8dw3W4pCB8NzFlxscjFtY" />
                                    </div>
                                    <div id="thumb-4"
                                        className="aspect-square w-full overflow-hidden rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                                        <img alt="Thumbnail 5" className="h-full w-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOgkYizutSjrjWBraE5e-EzCwnIy8jrqIohVAkphX4AXsm-wZRrpfbzqtYNvIIvnf4HEpqQSTPlTq6Op0D0CnFllxcfUJfQ4br2_ouryv4Ar_Mtizb3Jh_w7BxxducG8NMiGJ7x6XIQgwtkCOGS8L2_PsXXj7bPxDVPOVJM4Y6x4A4zlh9jYWDzgl9KbbrCxAFyb8hUWUWdFPY3SIioBzSfLTx8HZHve92Il5h56knUc84-2E0lG3OJGpHSn_9m1tBAOntEfXFFE8" />
                                    </div>
                                </div>
                                <button id="thumb-next"
                                    className="text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <div className="flex min-w-72 flex-col gap-3">
                                <p
                                    className="text-zinc-800 dark:text-white text-4xl font-normal leading-tight tracking-[-0.033em]">
                                    Refrigerador Inteligente con Puerta Francesa</p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">por
                                    NovaHome Appliances</p>
                            </div>
                        </div>

                        <div className="px-4 py-6">
                            <div className="border-b border-zinc-200 dark:border-zinc-700">
                                <nav aria-label="Tabs" className="flex -mb-px">
                                    <button id="tab-desc"
                                        className="w-1/2 py-4 px-1 text-center border-b-2 font-semibold text-lg text-primary border-primary">Descripción</button>
                                    <button id="tab-specs"
                                        className="w-1/2 py-4 px-1 text-center border-b-2 font-medium text-lg text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600">Especificaciones
                                        Técnicas</button>
                                </nav>
                            </div>
                            <div id="content-desc" className="pt-6">
                                <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed">Experimenta el futuro de
                                    la conservación de alimentos con nuestro Refrigerador Inteligente. Con una pantalla
                                    táctil integrada, conectividad Wi-Fi y cámaras internas, puedes gestionar tus compras,
                                    ver recetas y controlar la temperatura desde tu smartphone. Su espacioso interior y el
                                    sistema de enfriamiento dual mantienen tus alimentos frescos por más tiempo, mientras
                                    que su acabado en acero inoxidable añade un toque de elegancia a tu cocina.</p>
                            </div>
                            <div id="content-specs" className="hidden pt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-lg">
                                    <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 py-2">
                                        <span className="font-semibold text-zinc-800 dark:text-white">Capacidad</span>
                                        <span className="text-zinc-600 dark:text-zinc-300">650 Litros</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 py-2">
                                        <span className="font-semibold text-zinc-800 dark:text-white">Eficiencia
                                            Energética</span>
                                        <span className="text-zinc-600 dark:text-zinc-300">A++</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 py-2">
                                        <span className="font-semibold text-zinc-800 dark:text-white">Dimensiones (Al x An x
                                            Pr)</span>
                                        <span className="text-zinc-600 dark:text-zinc-300">178 x 91 x 72 cm</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 py-2">
                                        <span className="font-semibold text-zinc-800 dark:text-white">Nivel de Ruido</span>
                                        <span className="text-zinc-600 dark:text-zinc-300">39 dB</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 py-2">
                                        <span className="font-semibold text-zinc-800 dark:text-white">Conectividad</span>
                                        <span className="text-zinc-600 dark:text-zinc-300">Wi-Fi, Bluetooth</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 py-2">
                                        <span className="font-semibold text-zinc-800 dark:text-white">Color</span>
                                        <span className="text-zinc-600 dark:text-zinc-300">Acero Inoxidable</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 py-8">
                            <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-6">Productos Relacionados</h2>
                            <div className="relative">
                                <div className="flex gap-4 overflow-x-auto pb-4 -mb-4">
                                    <div
                                        className="flex flex-col w-64 flex-shrink-0 bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
                                        <div className="aspect-square w-full bg-zinc-100 dark:bg-zinc-700">
                                            <img alt="Producto Relacionado 1" className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBCmIdNA3vxF4t1rGEbNMozurt9uD880bWGfKfiTZf06YLprRgE7FPJYzu6TDWCGlXll6gRyLStDlUPXOBzmP0VUFErJq-AmldGSvXU-hn_IMzy5xUAYSGlNPPf04Oy1p0JVMt-pxMyQIl7pvQO3edN2y5vtAj1cTiude0OQdk3tq7FNE9y_K0o6IAUR5KDO1__2NMWB9QUBq5ZId90bk1fJVKbgiHjvCMeJ3rhIcgLVTHaPOWWw-vzjNL1b6pZnNH61mdxG9yabs" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="font-bold text-lg text-zinc-800 dark:text-white flex-grow">Horno
                                                Eléctrico Convección</h3>
                                            <p className="text-xl font-bold text-primary mt-2">599,99 €</p>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col w-64 flex-shrink-0 bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
                                        <div className="aspect-square w-full bg-zinc-100 dark:bg-zinc-700">
                                            <img alt="Producto Relacionado 2" className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByDlfmfFHbszKHxgRHENSr7NkmY-UL9NB3k5yMhrrGr0BI2K9br0iovm5rI9yyPABd-RmJOplSHakSA4o57N8pDrkxba2fmI9Y_jgm4Lo8tW_aZU4qm0QGiKVVnhLMupMy8czX11kuxvlorxj5VLxddEhd1E330dJt_4mYQz1oCYPU4FBnrB1LRH3f1ohqBIEKxI6-V_N6Ia5P8fBdFLf_ss_Fela-g40nFtZOfuIkjprvq1SFUjfbsCBqd3vKiy9KILBN9iePhHI" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="font-bold text-lg text-zinc-800 dark:text-white flex-grow">Microondas
                                                Integrable de Acero</h3>
                                            <p className="text-xl font-bold text-primary mt-2">249,99 €</p>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col w-64 flex-shrink-0 bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
                                        <div className="aspect-square w-full bg-zinc-100 dark:bg-zinc-700">
                                            <img alt="Producto Relacionado 3" className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuHwP2Q-0-9f5rEW1PC7yROwWb5Ca16AgJyFOJhT5bsWEROSBop0G7tn9RRe0MTBCVI7hGbyxjFtyylLvUQQ-z-LiAi8TzlZZKKjpi8_UnQbP2NyasvVRwUQkj_ZLosR71v-Qg7c16LEyXi40azAXQh_yAObmOf5D5f22KIp51eEr8xrlYNxtohXIne556KlnIih-yHRaNqWYRKspgQAnRAZepP6L-Rn3sHk4Tf0KW5YX1f5L0wcKLLqgzq_wW1vbVF7r8s6amVg0" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="font-bold text-lg text-zinc-800 dark:text-white flex-grow">
                                                Lavavajillas Silencioso Pro</h3>
                                            <p className="text-xl font-bold text-primary mt-2">799,99 €</p>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col w-64 flex-shrink-0 bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden">
                                        <div className="aspect-square w-full bg-zinc-100 dark:bg-zinc-700">
                                            <img alt="Producto Relacionado 4" className="w-full h-full object-cover"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj_UDCFxPS-awEdvqDRD_oWRX7VbZ3UA47Ql5nOgBKk1ibRHHp4QnwabztD-vmpuFN1bUIu67W4lOskd7NlZn1ahd1TxOE3FDvtbdnQ-Jr1xcEC4XKtazU4l065tM2JG2OKlttnYLWcLyxkFMNLVHJn4FKPzD1Nnx9oU1U5zu6JjBGLYQmlJToCeFonj_z0fwz93wBRyPQ9PkGDbxWyXR02FJOYaqEPcGoarA9yZHEJdFiOoYvuxVMOjVaXQ2GKiQRINKDhsMdin8" />
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="font-bold text-lg text-zinc-800 dark:text-white flex-grow">Cafetera
                                                Superautomática</h3>
                                            <p className="text-xl font-bold text-primary mt-2">499,99 €</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <a className="absolute top-5 left-5 z-10 flex items-center justify-center size-16 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full text-primary hover:bg-white dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                href="#">
                <span className="material-symbols-outlined text-4xl">arrow_back</span>
            </a>

        </div>
    );
}   