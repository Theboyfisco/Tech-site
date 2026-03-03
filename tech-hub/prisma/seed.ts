import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { id: "phones", name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop" },
  { id: "laptops", name: "Laptops & MacBooks", image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=400&auto=format&fit=crop" },
  { id: "audio", name: "Audio & Headphones", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop" },
  { id: "accessories", name: "Accessories", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=400&auto=format&fit=crop" }
];

const dummyProducts = [
  {
    id: "prod_1",
    name: "iPhone 15 Pro Max",
    price: 1850000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop",
    categoryId: "phones",
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
    categoryId: "laptops",
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
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    categoryId: "phones",
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
    categoryId: "audio",
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
    categoryId: "audio",
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
    categoryId: "accessories",
    technicalSpecs: {
      battery: "10758mAh",
      storage: "256GB SSD",
      ram: "8GB",
      condition: "New",
      screen: "12.9in Liquid Retina XDR Mini-LED"
    }
  },
  {
    id: "prod_7",
    name: "Apple MagSafe Charger",
    price: 45000,
    image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=800&auto=format&fit=crop",
    categoryId: "accessories",
    technicalSpecs: {
      condition: "New",
      compatibility: "iPhone 12 or later",
      wattage: "15W Fast Charge"
    }
  },
  {
    id: "prod_8",
    name: "iPhone 15 Leather Case",
    price: 35000,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=800&auto=format&fit=crop",
    categoryId: "accessories",
    technicalSpecs: {
      condition: "New",
      material: "Premium Leather",
      protection: "Drop + Scratch Resistant"
    }
  }
];

async function main() {
  console.log('Start seeding...')

  // 1. Seed Categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.id.toLowerCase(),
        image: cat.image,
      },
    })
  }

  // 2. Seed Products
  for (const prod of dummyProducts) {
    const rawCondition = prod.technicalSpecs.condition || "New";
    const mappedCondition = rawCondition.toUpperCase().replace(/\s+/g, '_') as "NEW" | "OPEN_BOX" | "REFURBISHED";

    await prisma.product.upsert({
      where: { id: prod.id },
      update: {},
      create: {
        id: prod.id,
        name: prod.name,
        slug: prod.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
        description: `Premium ${prod.name} with advanced features and top-tier performance.`,
        price: prod.price,
        stock: 50,
        condition: ["NEW", "OPEN_BOX", "REFURBISHED"].includes(mappedCondition) ? mappedCondition : "NEW",
        technicalSpecs: prod.technicalSpecs,
        images: [prod.image],
        categoryId: prod.categoryId,
      },
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
