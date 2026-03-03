"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, Menu, X, Smartphone, Laptop, Headphones, Search, Info, Mail } from "lucide-react";
import { useCart } from "../cart/CartProvider";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchOverlay } from "./SearchOverlay";

export function Navbar() {
    const { cartItems, toggleCart } = useCart();
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const navLinks = [
        { name: "Phones", href: "/category/phones", icon: Smartphone },
        { name: "Laptops", href: "/category/laptops", icon: Laptop },
        { name: "Audio", href: "/category/audio", icon: Headphones },
        { name: "Accessories", href: "/category/accessories", icon: Smartphone }, // Reuse icon for now
        { name: "About", href: "/about", icon: Info },
        { name: "Contact", href: "/contact", icon: Mail }
    ];

    return (
        <header 
            className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
                scrolled 
                ? "bg-base/90 border-border-subtle backdrop-blur-xl py-0" 
                : "bg-base/40 border-transparent backdrop-blur-md py-2"
            }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="lg:hidden p-2 -ml-2 text-secondary hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {!isHome ? (
                        <Link href="/" className="flex items-center gap-2 text-secondary hover:text-white transition-colors group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden xs:inline font-medium">Back</span>
                        </Link>
                    ) : (
                        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600 tracking-tight">
                            TechHub NG
                        </Link>
                    )}
                </div>

                {/* Desktop Navigation - Hidden on mobile/tablet */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${
                                pathname === link.href ? "text-primary" : "text-secondary hover:text-white"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-1 sm:gap-4 flex-1 justify-end max-w-sm lg:max-w-md">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex-1 hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-border-subtle text-secondary hover:text-white hover:bg-white/10 transition-all text-sm group"
                        aria-label="Open search"
                    >
                        <Search size={18} className="group-hover:text-primary transition-colors" />
                        <span>Search gadgets...</span>
                        <kbd className="ml-auto hidden xl:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button>

                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="lg:hidden p-2 text-secondary hover:text-white transition-colors"
                        aria-label="Open search"
                    >
                        <Search size={22} />
                    </button>

                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-secondary hover:text-white transition-colors"
                        aria-label="Open cart"
                    >
                        <ShoppingBag size={24} />
                        {cartItems.length > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-primary text-base rounded-full border-2 border-base animate-in zoom-in duration-300">
                                {cartItems.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-base/80 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed left-0 top-0 bottom-0 w-[280px] bg-base border-r border-border-subtle z-[60] p-6 flex flex-col lg:hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                                    TechHub NG
                                </Link>
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 -mr-2 text-secondary hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            
                            <p className="text-[10px] font-bold text-secondary/50 uppercase tracking-[0.2em] mb-4">Navigation</p>
                            <nav className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.name} 
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-lg font-medium p-3 rounded-xl transition-all flex items-center gap-4 ${
                                            pathname === link.href 
                                            ? "bg-primary/10 text-primary border border-primary/20" 
                                            : "text-secondary hover:text-white hover:bg-white/5 border border-transparent"
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg ${pathname === link.href ? "bg-primary/20" : "bg-white/5"}`}>
                                            {link.icon && <link.icon size={20} />}
                                        </div>
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                            
                            <div className="mt-auto pt-8 border-t border-border-subtle">
                                <p className="text-secondary text-sm mb-4">Official Platform for Apple & Samsung Gadgets in Nigeria.</p>
                                <Link 
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full bg-primary text-center text-base py-4 rounded-xl font-bold hover:bg-emerald-400 transition-colors shadow-glow"
                                >
                                    WhatsApp Support
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
