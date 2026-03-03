"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, Menu, X, Smartphone, Laptop, Headphones } from "lucide-react";
import { useCart } from "../cart/CartProvider";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const { cartItems, toggleCart } = useCart();
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Phones", href: "/category/phones", icon: Smartphone },
        { name: "Laptops", href: "/category/laptops", icon: Laptop },
        { name: "Audio", href: "/category/audio", icon: Headphones },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" }
    ];

    return (
        <header className="sticky top-0 z-30 w-full border-b border-border-subtle bg-base/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden p-2 text-secondary hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {!isHome ? (
                        <Link href="/" className="flex items-center gap-2 text-secondary hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                            <span className="hidden sm:inline">Back</span>
                        </Link>
                    ) : (
                        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                            TechHub NG
                        </Link>
                    )}
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            className="text-sm font-medium text-secondary hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-secondary hover:text-white transition-colors"
                        aria-label="Open cart"
                    >
                        <ShoppingBag size={24} />
                        {cartItems.length > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold flex items-center justify-center bg-primary text-base rounded-full border-2 border-base">
                                {cartItems.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed left-0 top-0 bottom-0 w-3/4 max-w-sm bg-base border-r border-border-subtle z-50 p-6 flex flex-col md:hidden"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                                    TechHub NG
                                </Link>
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-secondary hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <nav className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.name} 
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-secondary hover:text-white transition-colors flex items-center gap-3"
                                    >
                                        {link.icon && <link.icon size={20} className="text-primary" />}
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                            
                            <div className="mt-auto pt-6 border-t border-border-subtle">
                                <Link 
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full bg-white/5 text-center text-white py-3 rounded-standard font-medium hover:bg-white/10 transition-colors"
                                >
                                    Support Center
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
