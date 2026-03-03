import type { Product } from '../components/product/BentoProductCard';

export const dummyProducts: Product[] = [
  {
    id: "prod_1",
    name: "iPhone 15 Pro Max",
    price: 1850000,
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop",
    technicalSpecs: {
      battery: "4422mAh",
      storage: "256GB NVMe",
      ram: "8GB",
      condition: "New",
      screen: "6.7in OLED 120Hz"
    }
  },
  {
    id: "prod_2",
    name: "MacBook Pro M3",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    technicalSpecs: {
      battery: "70Wh",
      storage: "512GB SSD",
      ram: "18GB",
      condition: "New",
      screen: "14.2in Liquid Retina XDR"
    }
  },
  {
    id: "prod_3",
    name: "Samsung Galaxy S24 Ultra",
    price: 1750000,
    image: "https://images.unsplash.com/photo-1707227155452-9b27a6f22370?q=80&w=800&auto=format&fit=crop",
    technicalSpecs: {
      battery: "5000mAh",
      storage: "512GB UFS 4.0",
      ram: "12GB",
      condition: "Open Box",
      screen: "6.8in Dynamic LTPO AMOLED 2X"
    }
  },
  {
    id: "prod_4",
    name: "Sony WH-1000XM5",
    price: 450000,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
    technicalSpecs: {
      battery: "30 Hours",
      condition: "Refurbished",
      connectivity: "Bluetooth 5.2",
      noiseCancellation: "Industry Leading ANC"
    }
  },
  {
    id: "prod_5",
    name: "AirPods Pro (2nd Gen)",
    price: 285000,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop",
    technicalSpecs: {
      battery: "6 Hours (30 with case)",
      condition: "New",
      connectivity: "Bluetooth 5.3",
      noiseCancellation: "Active + Transparency"
    }
  },
  {
    id: "prod_6",
    name: "iPad Pro 12.9 M2",
    price: 1550000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
    technicalSpecs: {
      battery: "10758mAh",
      storage: "256GB SSD",
      ram: "8GB",
      condition: "New",
      screen: "12.9in Liquid Retina XDR Mini-LED"
    }
  }
];

export const categories = [
  { id: "phones", name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop" },
  { id: "laptops", name: "Laptops & MacBooks", image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400&auto=format&fit=crop" },
  { id: "audio", name: "Audio & Headphones", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop" },
  { id: "accessories", name: "Accessories", image: "https://images.unsplash.com/photo-1588693892881-22fb1dfbd92c?q=80&w=400&auto=format&fit=crop" }
];
