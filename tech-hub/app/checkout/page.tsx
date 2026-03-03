"use client";

import { useCart } from "@/components/cart/CartProvider";
import { CreditCard, Phone, User, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
    const { cartItems } = useCart();
    const [step, setStep] = useState(1);
    
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
                <p className="text-secondary mb-8">Add some gadgets to your stash before checking out.</p>
                <Link href="/" className="bg-primary text-base px-8 py-3 rounded-standard font-bold hover:bg-emerald-400 transition-colors">
                    Back to Store
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 flex-1">
            <Link href="/" className="flex items-center gap-2 text-secondary hover:text-white mb-8 transition-colors">
                <ArrowLeft size={20} />
                <span>Back to Store</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Checkout Form */}
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-base' : 'bg-white/10 text-secondary'}`}>1</div>
                        <div className="h-px bg-white/10 flex-1"></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-base' : 'bg-white/10 text-secondary'}`}>2</div>
                        <div className="h-px bg-white/10 flex-1"></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 3 ? 'bg-primary text-base' : 'bg-white/10 text-secondary'}`}>3</div>
                    </div>

                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <User className="text-primary" /> Delivery Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary">Full Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-border-subtle rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary">Phone Number</label>
                                    <input type="tel" className="w-full bg-white/5 border border-border-subtle rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="+234 800 000 0000" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-secondary">Shipping Address</label>
                                <textarea className="w-full bg-white/5 border border-border-subtle rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" rows={3} placeholder="Street address, Apartment, Estate, etc."></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary">City (NG)</label>
                                    <input type="text" className="w-full bg-white/5 border border-border-subtle rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Asaba" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary">State</label>
                                    <select className="w-full bg-white/5 border border-border-subtle rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                                        <option className="bg-base">Delta</option>
                                        <option className="bg-base">Lagos</option>
                                        <option className="bg-base">Abuja</option>
                                        <option className="bg-base">Anambra</option>
                                    </select>
                                </div>
                            </div>
                            <button 
                                onClick={() => setStep(2)}
                                className="w-full bg-primary text-base py-4 rounded-standard font-bold hover:bg-emerald-400 transition-colors shadow-glow mt-8"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <CreditCard className="text-primary" /> Payment Method
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 rounded-standard border border-primary bg-primary/10 flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-primary">
                                            <ShieldCheck />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">Paystack Secure</p>
                                            <p className="text-xs text-secondary">Cards, Bank Transfer, USSD</p>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-standard border border-border-subtle bg-white/5 flex items-center justify-between opacity-50 cursor-not-allowed">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-secondary">
                                            <Phone />
                                        </div>
                                        <div>
                                            <p className="text-white font-bold">Pay on Delivery</p>
                                            <p className="text-xs text-secondary">Not available for gadgets over ₦100k</p>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border-2 border-border-subtle"></div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button 
                                    onClick={() => setStep(1)}
                                    className="flex-1 border border-border-subtle text-white py-4 rounded-standard font-bold hover:bg-white/5 transition-colors"
                                >
                                    Go Back
                                </button>
                                <button 
                                    onClick={() => setStep(3)}
                                    className="flex-[2] bg-primary text-base py-4 rounded-standard font-bold hover:bg-emerald-400 transition-colors shadow-glow"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center py-12 animate-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <ShieldCheck size={48} />
                            </div>
                            <h2 className="text-3xl font-extrabold text-white mb-4">Order Confirmed!</h2>
                            <p className="text-secondary max-w-md mx-auto mb-8">
                                Thank you for your purchase. We&apos;ve sent a confirmation email to you. Our dispatch team will contact you shortly for delivery.
                            </p>
                            <Link href="/" className="inline-block bg-white/5 border border-border-subtle text-white px-8 py-3 rounded-standard font-bold hover:bg-white/10 transition-colors">
                                Return to Home
                            </Link>
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white/5 border border-border-subtle rounded-standard p-6 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-border-subtle">Order Summary</h3>
                        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-base shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white line-clamp-1">{item.name}</p>
                                        <p className="text-primary text-xs font-bold">
                                            {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2 pt-4 border-t border-border-subtle text-sm">
                            <div className="flex justify-between text-secondary">
                                <span>Subtotal</span>
                                <span>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(total)}</span>
                            </div>
                            <div className="flex justify-between text-secondary">
                                <span>Shipping Fees</span>
                                <span className="text-emerald-400">Calculated</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-white pt-2">
                                <span>Total Payable</span>
                                <span>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
