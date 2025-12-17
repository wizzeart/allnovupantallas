'use client'

import { Menu, Shield, ShoppingCart, Truck, Users, X, Home, Search, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useCart } from "../cart/cart-provider";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { Products2 } from "../details/details";
import { searchProducts } from "@/lib/actions/products";
import PaintedKeyboard from "../keyboard/keyboardComponent";

export function MainNavbar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const backendUrl = 'https://allnovu.com';

    const handleKeyClick = (key: string) => {
        if (key === "backspace") {
            setSearchQuery(prev => prev.slice(0, -1));
        } else if (key === "enter") {
            setSearchQuery(prev => prev + "\n");
        } else if (key === "space") {
            setSearchQuery(prev => prev + " ");
        } else {
            setSearchQuery(prev => prev + key);
        }

        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded) {
            setSearchQuery('');
            setSearchResults([]);
            setShowKeyboard(false);
        }
    };

    const toggleKeyboard = () => {
        setShowKeyboard(!showKeyboard);
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    useEffect(() => {
        const performSearch = async () => {
            if (!debouncedSearchQuery || debouncedSearchQuery.length < 3) {
                setSearchResults([]);
                return;
            }

            setIsSearching(true);
            try {
                const data = await searchProducts(debouncedSearchQuery);
                setSearchResults(data);
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        };

        performSearch();
    }, [debouncedSearchQuery]);

    const menuItems = [
        { icon: <Home className="h-5 w-5" />, label: "Inicio", href: "/" },
        { icon: <Users className="h-5 w-5" />, label: "Quiénes Somos", href: "/equipo" },
        { icon: <Shield className="h-5 w-5" />, label: "Garantía", href: "/garantia" },
        { icon: <Truck className="h-5 w-5" />, label: "Servicio a Domicilio", href: "/domicilio" },
    ];

    const handleProductClick = () => {
        setIsExpanded(false);
        setSearchQuery('');
        setSearchResults([]);
        setShowKeyboard(false);
    };

    // Cerrar con Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isExpanded) {
                if (showKeyboard) {
                    setShowKeyboard(false);
                } else {
                    toggleExpand();
                }
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isExpanded, showKeyboard]);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-40 ">
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={toggleExpand}
                            className="bg-transparent hover:bg-transparent text-black rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
                        >
                            {isExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>

                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="allNovuLogo"
                                className="size-10 w-15"
                            />
                        </Link>
                    </div>
                </div>

                <div className={`
                    absolute top-full left-0 z-50
                    bg-white
                    shadow-xl border-r border-white/20 border-t 
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isExpanded
                        ? 'max-h-[80vh] w-80 sm:w-96 opacity-100'
                        : 'max-h-0 w-80 sm:w-96 opacity-0 pointer-events-none'
                    }
                `}>
                    <div className="p-4 h-full overflow-y-auto">
                        <div className="mb-6">
                            <div className="relative">
                                <div className="relative mb-2">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        readOnly
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setShowKeyboard(true)}
                                        placeholder="Buscar productos..."
                                        className="w-full pl-10 pr-16 py-3 bg-black/10 border border-black/30 rounded-lg text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-transparent transition-all"
                                        autoFocus={isExpanded}
                                    />



                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/70 hover:text-black transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>

                                {isSearching && searchQuery.length >= 3 && (
                                    <div className="flex items-center justify-center gap-2 py-3 animate-pulse">
                                        <Loader2 className="h-5 w-5 animate-spin text-black" />
                                        <p className="text-black/80 text-sm">Buscando productos...</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {showKeyboard && (
                            <div className="mb-6">
                                <PaintedKeyboard
                                    onKeyClick={handleKeyClick}
                                    onClose={() => setShowKeyboard(false)}
                                />
                            </div>
                        )}

                        <div>
                            {searchQuery.length >= 3 ? (
                                <>
                                    <h3 className="text-black font-semibold mb-3 text-lg flex items-center gap-2">
                                        <Search className="h-5 w-5" />
                                        Resultados de búsqueda
                                        <span className="text-black/60 text-sm font-normal">
                                            ({searchResults.length})
                                        </span>
                                    </h3>

                                    {searchResults.length > 0 ? (
                                        <div className="space-y-2">
                                            {searchResults.map((product: Products2) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/productos/${product.id}/details`}
                                                    onClick={handleProductClick}
                                                    className="flex items-center gap-3 p-3 bg-black/10 hover:bg-black/20 rounded-lg transition-all duration-200 group"
                                                >
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={
                                                                product.imagenUrl?.startsWith('/')
                                                                    ? `${backendUrl}${product.imagenUrl}`
                                                                    : product.imagenUrl || ''
                                                            }
                                                            alt={product.nombre}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-black truncate text-sm">{product.nombre}</h4>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : !isSearching ? (
                                        <div className="text-center py-6 bg-black/5 rounded-lg">
                                            <Search className="h-12 w-12 text-black/30 mx-auto mb-3" />
                                            <p className="text-black/80">No se encontraron productos</p>
                                            <p className="text-black/60 text-sm mt-1">Intenta con otras palabras clave</p>
                                        </div>
                                    ) : null}
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        {menuItems.map((item, index) => (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                onClick={toggleExpand}
                                                className="block"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start text-black hover:text-black hover:bg-black/20 h-12 rounded-lg transition-all duration-200 group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="transition-transform group-hover:scale-110">
                                                            {item.icon}
                                                        </div>
                                                        <span className="font-medium">{item.label}</span>
                                                    </div>
                                                </Button>
                                            </Link>
                                        ))}

                                        <Link href="/cart" onClick={toggleExpand} className="block">
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-black hover:text-black hover:bg-black/20 h-12 rounded-lg transition-all duration-200 relative group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                                                    <span className="font-medium">Carrito</span>
                                                    {itemCount > 0 && (
                                                        <Badge className="ml-auto bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            {itemCount}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-16"></div>
        </>
    )
}