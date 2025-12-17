'use client';

import { Phone, Mail } from "lucide-react";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { getCategory } from "@/lib/actions/products";

export interface Category {
    id: number;
    Nombre: string;
    imagenUrl: string | null
}


export default function Footer() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fullyear = new Date().getFullYear();

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await getCategory();

                if (!data) {
                    throw new Error('No hay Categorías.');
                }
                console.log('Categorías obtenidas:', data);
                setCategories(data);
            } catch (error) {
                throw new Error(`Error al obtener los datos: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    return (
        <>

            <footer className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-10 px-4 sm:px-6 md:px-8 mt-10">

                <div className="container justify-between mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="text-center md:text-left">
                            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                                <img src="./marca-03.avif" alt="allnovulogo" className="size-30" />
                            </div>
                            <h5 className="font-semibold mb-4 font-sans">Síguenos</h5>
                            <div className="flex gap-4 justify-center md:justify-start">
                                <a className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-primary transition-colors"
                                    href="https://www.facebook.com/share/17Z2AD1m6n/">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z">
                                        </path>
                                    </svg>
                                </a>
                                <a className="text-slate-500 dark:text-slate-400 hover:text-blue-500  dark:hover:text-primary transition-colors"
                                    href="https://www.instagram.com/allnovu_oficial?igsh=MWtuMjdid2pzaDBjdw==">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z">
                                        </path>
                                    </svg>
                                </a>
                                <a className="text-slate-500 dark:text-slate-400 hover:text-blue-500  dark:hover:text-primary transition-colors"
                                    href="https://wa.me/17865699162">
                                    <svg height="24" fill="currentColor" width="24" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 0.72 0.72" >
                                        <path clipRule="evenodd"
                                            d="M0.615 0.105C0.547 0.037 0.456 0 0.36 0 0.162 0 0 0.162 0 0.36c0 0.063 0.019 0.123 0.051 0.178L0 0.72l0.19 -0.046C0.242 0.702 0.3 0.72 0.36 0.72c0.198 0 0.36 -0.162 0.36 -0.36 0 -0.096 -0.037 -0.187 -0.105 -0.255M0.36 0.66c-0.053 0 -0.104 -0.018 -0.15 -0.045l-0.011 -0.007 -0.113 0.03 0.03 -0.11 -0.007 -0.011C0.079 0.469 0.06 0.416 0.06 0.36 0.06 0.196 0.196 0.06 0.36 0.06c0.08 0 0.156 0.032 0.212 0.088S0.66 0.28 0.66 0.36c0 0.164 -0.136 0.3 -0.3 0.3m0.165 -0.226c-0.009 -0.004 -0.053 -0.026 -0.061 -0.029s-0.014 -0.004 -0.02 0.004 -0.023 0.029 -0.028 0.035c-0.005 0.006 -0.01 0.007 -0.019 0.002s-0.038 -0.014 -0.072 -0.044c-0.027 -0.024 -0.045 -0.053 -0.05 -0.062s-0.001 -0.014 0.004 -0.018c0.004 -0.004 0.009 -0.01 0.013 -0.016s0.006 -0.009 0.009 -0.015 0.002 -0.011 -0.001 -0.016c-0.002 -0.004 -0.02 -0.049 -0.028 -0.067 -0.007 -0.017 -0.015 -0.015 -0.02 -0.015 -0.005 0 -0.011 0 -0.017 0s-0.016 0.002 -0.024 0.011c-0.008 0.009 -0.031 0.031 -0.031 0.075s0.032 0.087 0.037 0.093 0.063 0.097 0.153 0.135c0.021 0.009 0.038 0.015 0.051 0.019 0.022 0.007 0.041 0.006 0.056 0.004 0.017 -0.003 0.053 -0.022 0.061 -0.043s0.007 -0.039 0.005 -0.043c-0.002 -0.004 -0.008 -0.006 -0.017 -0.011" />
                                    </svg>
                                </a>
                            </div>

                        </div>
                        <div className="text-center md:text-left">
                            <h5 className="font-semibold mb-4 font-sans">Categorías</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                                {loading ? (
                                    <li>Cargando...</li>
                                ) : (
                                    categories.map(category => (
                                        <li key={category.id}>
                                            <Link href={`/web/categorias/${category.id}`} className="hover:text-blue-500 dark:hover:text-primary transition-colors">
                                                {category.Nombre}
                                            </Link>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                        <div className="text-center md:text-left">
                            <h5 className="font-semibold mb-4 font-sans">Servicios</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                                <li><Link href="https://allnovu.com/tienda" className="hover:text-blue-500 dark:hover:text-primary transition-colors">Tienda</Link></li>
                                <li><Link href="/web/equipo" className="hover:text-blue-500 dark:hover:text-primary transition-colors">Quiénes Somos</Link></li>
                                <li><Link href="/web/garantia" className="hover:text-blue-500 dark:hover:text-primary transition-colors">Garantía</Link></li>
                                <li><Link href="/web/domicilio" className="hover:text-blue-500 dark:hover:text-primary transition-colors">Servicio a Domicilio</Link></li>
                            </ul>
                        </div>
                        <div className="text-center md:text-left">
                            <h5 className="font-semibold mb-4 font-sans">Contactos</h5>
                            <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                                <li>
                                    <a href="tel:+17865699162" className="flex items-center gap-2 justify-center md:justify-start hover:text-blue-500 dark:hover:text-primary transition-colors">
                                        <Phone className="h-4 w-4" />+1 786 569 9162
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:info@allnovu.com" className="flex items-center gap-2 justify-center md:justify-start hover:text-blue-500 dark:hover:text-primary transition-colors">
                                        <Mail className="h-4 w-4" />info@allnovu.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-muted-foreground/60 font-sans text-sm">
                        <p>&copy; {fullyear} All Novu. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer >
        </>
    );
}
