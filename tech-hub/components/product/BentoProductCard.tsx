"use client";

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    blurHash?: string;
    technicalSpecs: {
        battery?: string;
        storage?: string;
        ram?: string;
        [key: string]: string | number | boolean | undefined;
    };
}

interface BentoProductCardProps {
    product: Product;
    featured?: boolean;
}

export function BentoProductCard({ product, featured = false }: BentoProductCardProps) {
    const whatsappMsg = encodeURIComponent(`Hi, I'm interested in the ${product.name} listed for ₦${product.price}`);

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={`relative group p-4 border rounded-${featured ? 'featured' : 'standard'} border-border-subtle bg-surface backdrop-blur-md overflow-hidden ${featured ? 'md:col-span-2 shadow-glow' : ''}`}
        >
            <div className={`relative w-full mb-4 ${featured ? 'h-64' : 'h-48'}`}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                    placeholder={product.blurHash ? "blur" : "empty"}
                    blurDataURL={product.blurHash}
                />
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">{product.name}</h3>
            <p className="text-xl font-semibold text-primary mt-1">
                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price)}
            </p>

            {/* Quick Specs Hover Reveal */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-base/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="font-mono text-sm text-secondary flex justify-between">
                    <span>{product.technicalSpecs.battery}</span>
                    <span>{product.technicalSpecs.storage}</span>
                </div>
            </div>

            <a
                href={`https://wa.me/2348000000000?text=${whatsappMsg}`}
                className="absolute top-4 right-4 p-2 bg-primary/20 hover:bg-primary/40 text-primary rounded-full backdrop-blur-md transition-colors"
            >
                <MessageCircle size={20} />
            </a>
        </motion.div>
    );
}
