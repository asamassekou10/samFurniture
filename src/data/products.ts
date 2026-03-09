import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    name: "Sofas & Loveseats",
    slug: "sofas-loveseats",
    description: "Premium stationary sofas and loveseats for your living room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    productCount: 12,
  },
  {
    name: "Sectionals",
    slug: "sectionals",
    description: "Spacious sectional sofas for the whole family",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    productCount: 8,
  },
  {
    name: "Beds & Bedrooms",
    slug: "beds-bedrooms",
    description: "Complete bedroom sets and individual bed frames",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
    productCount: 15,
  },
  {
    name: "Dining Room",
    slug: "dining-room",
    description: "Elegant dining tables and chair sets",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    productCount: 10,
  },
  {
    name: "Recliners",
    slug: "recliners",
    description: "Comfortable recliners and lift chairs",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
    productCount: 9,
  },
  {
    name: "Mattresses",
    slug: "mattresses",
    description: "Quality mattresses for a perfect night's sleep",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    productCount: 7,
  },
  {
    name: "TV Stands",
    slug: "tv-stands",
    description: "Modern TV stands and entertainment centers",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
    productCount: 6,
  },
  {
    name: "Bunk Beds",
    slug: "bunk-beds",
    description: "Space-saving bunk beds for kids and teens",
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80",
    productCount: 5,
  },
];

export const products: Product[] = [
  // Sofas & Loveseats
  {
    id: "1",
    name: "Milano Gray Sofa & Loveseat Set",
    slug: "milano-gray-sofa-loveseat",
    price: 1299.99,
    originalPrice: 1599.99,
    description:
      "Transform your living room with the Milano Gray Sofa & Loveseat Set. Crafted with premium upholstery and high-density foam cushions, this set delivers both style and comfort. The sleek gray fabric pairs beautifully with any decor, while the solid hardwood frame ensures lasting durability. Set includes a full-size sofa and matching loveseat.",
    shortDescription: "Premium gray fabric sofa & loveseat set with solid hardwood frame",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    ],
    category: "Sofas & Loveseats",
    categorySlug: "sofas-loveseats",
    dimensions: '90" W x 38" D x 35" H',
    material: "Premium Fabric",
    color: "Gray",
    sku: "MIL-GRY-SL-001",
    inStock: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "2",
    name: "Relax White Sleeper Sofa",
    slug: "relax-white-sleeper-sofa",
    price: 999.99,
    description:
      "The Relax White Sleeper Sofa seamlessly combines daytime elegance with nighttime comfort. Features a smooth pull-out mechanism with a premium innerspring mattress. The crisp white upholstery brings a fresh, modern look to any space.",
    shortDescription: "White sleeper sofa with pull-out innerspring mattress",
    images: [
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "Sofas & Loveseats",
    categorySlug: "sofas-loveseats",
    dimensions: '84" W x 36" D x 34" H',
    material: "Linen Blend",
    color: "White",
    sku: "RLX-WHT-SS-002",
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 87,
  },
  {
    id: "3",
    name: "Miami LED Sofa & Loveseat Set",
    slug: "miami-led-sofa-loveseat",
    price: 1899.99,
    originalPrice: 2299.99,
    description:
      "Make a statement with the Miami LED Sofa & Loveseat Set. Featuring built-in LED ambient lighting with multiple color modes, this futuristic set is perfect for modern homes and entertainment spaces. Premium bonded leather with chrome accents.",
    shortDescription: "Modern sofa set with built-in LED ambient lighting",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "Sofas & Loveseats",
    categorySlug: "sofas-loveseats",
    dimensions: '92" W x 40" D x 33" H',
    material: "Bonded Leather",
    color: "White",
    sku: "MIA-LED-SL-003",
    inStock: true,
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 56,
  },

  // Sectionals
  {
    id: "4",
    name: "Hampton L-Shape Sectional",
    slug: "hampton-l-shape-sectional",
    price: 2199.99,
    originalPrice: 2799.99,
    description:
      "The Hampton L-Shape Sectional offers generous seating for the whole family. Featuring deep cushions, reinforced springs, and stain-resistant fabric. The reversible chaise lets you customize the layout to fit your room perfectly.",
    shortDescription: "Reversible L-shape sectional with stain-resistant fabric",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
    ],
    category: "Sectionals",
    categorySlug: "sectionals",
    dimensions: '112" W x 85" D x 34" H',
    material: "Performance Fabric",
    color: "Charcoal",
    sku: "HMP-CHR-SC-004",
    inStock: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: "5",
    name: "Modular Cloud Sectional",
    slug: "modular-cloud-sectional",
    price: 3499.99,
    description:
      "Create your perfect seating arrangement with the Modular Cloud Sectional. Each piece can be configured independently, giving you endless layout possibilities. Ultra-plush down-filled cushions feel like sitting on a cloud.",
    shortDescription: "Customizable modular sectional with down-filled cushions",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "Sectionals",
    categorySlug: "sectionals",
    dimensions: '140" W x 100" D x 32" H',
    material: "Velvet",
    color: "Beige",
    sku: "CLD-BEI-SC-005",
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 45,
  },

  // Beds & Bedrooms
  {
    id: "6",
    name: "Royal Platform Bed - King",
    slug: "royal-platform-bed-king",
    price: 899.99,
    originalPrice: 1199.99,
    description:
      "The Royal Platform Bed combines timeless design with modern convenience. The upholstered headboard features elegant button tufting, while the low-profile platform eliminates the need for a box spring. Available in King size with solid wood slats for optimal mattress support.",
    shortDescription: "Upholstered king platform bed with tufted headboard",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    category: "Beds & Bedrooms",
    categorySlug: "beds-bedrooms",
    dimensions: '80" W x 85" D x 52" H',
    material: "Upholstered Fabric & Wood",
    color: "Dark Gray",
    sku: "RYL-GRY-BD-006",
    inStock: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 312,
  },
  {
    id: "7",
    name: "Nova 5-Piece Bedroom Set",
    slug: "nova-5-piece-bedroom-set",
    price: 2499.99,
    originalPrice: 3199.99,
    description:
      "Complete your bedroom with the Nova 5-Piece Set. Includes queen bed frame with LED-lit headboard, two nightstands, dresser, and mirror. The sleek contemporary design features a rich walnut finish with chrome hardware.",
    shortDescription: "Complete 5-piece bedroom set with LED headboard",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    category: "Beds & Bedrooms",
    categorySlug: "beds-bedrooms",
    dimensions: '65" W x 86" D x 55" H (bed)',
    material: "Engineered Wood & MDF",
    color: "Walnut",
    sku: "NVA-WAL-BR-007",
    inStock: true,
    isNew: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 178,
  },

  // Dining Room
  {
    id: "8",
    name: "Harvest Dining Table Set - 7 Piece",
    slug: "harvest-dining-table-7pc",
    price: 1599.99,
    description:
      "Gather around the Harvest Dining Table Set for memorable meals. This 7-piece set includes a spacious rectangular table and six upholstered chairs. The solid wood construction features a warm rustic finish that adds character to any dining room.",
    shortDescription: "7-piece solid wood dining set with upholstered chairs",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?w=800&q=80",
    ],
    category: "Dining Room",
    categorySlug: "dining-room",
    dimensions: '72" W x 42" D x 30" H',
    material: "Solid Wood",
    color: "Rustic Brown",
    sku: "HRV-BRN-DN-008",
    inStock: true,
    rating: 4.6,
    reviewCount: 93,
  },
  {
    id: "9",
    name: "Modern Glass Dining Set - 5 Piece",
    slug: "modern-glass-dining-5pc",
    price: 1199.99,
    originalPrice: 1499.99,
    description:
      "The Modern Glass Dining Set brings contemporary elegance to your dining space. Features a tempered glass tabletop on a sculptural chrome base, paired with four faux leather chairs. Easy to clean and maintain.",
    shortDescription: "5-piece glass top dining set with chrome base",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?w=800&q=80",
    ],
    category: "Dining Room",
    categorySlug: "dining-room",
    dimensions: '60" W x 36" D x 30" H',
    material: "Tempered Glass & Chrome",
    color: "Clear/Silver",
    sku: "MDN-GLS-DN-009",
    inStock: true,
    isFeatured: true,
    isNew: true,
    rating: 4.5,
    reviewCount: 67,
  },

  // Recliners
  {
    id: "10",
    name: "ComfortMax Power Recliner",
    slug: "comfortmax-power-recliner",
    price: 799.99,
    description:
      "Experience ultimate relaxation with the ComfortMax Power Recliner. Features one-touch power recline, adjustable headrest, and built-in USB charging port. The premium top-grain leather and memory foam cushioning provide unmatched comfort.",
    shortDescription: "Power recliner with USB charging and memory foam",
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "Recliners",
    categorySlug: "recliners",
    dimensions: '35" W x 38" D x 42" H',
    material: "Top-Grain Leather",
    color: "Brown",
    sku: "CMX-BRN-RC-010",
    inStock: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 256,
  },

  // Mattresses
  {
    id: "11",
    name: "DreamCloud Hybrid Mattress - Queen",
    slug: "dreamcloud-hybrid-queen",
    price: 699.99,
    originalPrice: 999.99,
    description:
      "Sleep like never before on the DreamCloud Hybrid Mattress. Combining individually wrapped coils with gel-infused memory foam, this mattress provides the perfect balance of support and comfort. Features a cooling cover for temperature regulation.",
    shortDescription: "Hybrid queen mattress with cooling gel memory foam",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
    ],
    category: "Mattresses",
    categorySlug: "mattresses",
    dimensions: '60" W x 80" D x 12" H',
    material: "Hybrid (Foam + Springs)",
    color: "White",
    sku: "DRC-WHT-MT-011",
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 421,
  },

  // TV Stands
  {
    id: "12",
    name: "Ember Fireplace TV Stand",
    slug: "ember-fireplace-tv-stand",
    price: 599.99,
    originalPrice: 799.99,
    description:
      "The Ember Fireplace TV Stand combines entertainment and ambiance. Features a built-in electric fireplace with realistic flame effects and adjustable heat. Accommodates TVs up to 65 inches with ample storage for media components.",
    shortDescription: 'Fireplace TV stand for up to 65" TVs with electric insert',
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "TV Stands",
    categorySlug: "tv-stands",
    dimensions: '60" W x 18" D x 28" H',
    material: "Engineered Wood",
    color: "Espresso",
    sku: "EMB-ESP-TV-012",
    inStock: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 189,
  },

  // Bunk Beds
  {
    id: "13",
    name: "Adventure Twin-over-Full Bunk Bed",
    slug: "adventure-twin-over-full-bunk",
    price: 749.99,
    description:
      "The Adventure Bunk Bed is perfect for shared kids' rooms or guest rooms. The twin-over-full design maximizes space while the solid pine construction ensures safety and durability. Includes a built-in ladder and full-length guardrails.",
    shortDescription: "Solid pine twin-over-full bunk bed with guardrails",
    images: [
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
    ],
    category: "Bunk Beds",
    categorySlug: "bunk-beds",
    dimensions: '78" W x 58" D x 68" H',
    material: "Solid Pine",
    color: "Natural",
    sku: "ADV-NAT-BB-013",
    inStock: true,
    rating: 4.6,
    reviewCount: 134,
  },

  // More Sofas
  {
    id: "14",
    name: "Venice Velvet Sofa",
    slug: "venice-velvet-sofa",
    price: 1099.99,
    description:
      "Add a touch of luxury with the Venice Velvet Sofa. The rich velvet upholstery and gold-finished legs create an opulent focal point. Features pocket coil seating for long-lasting comfort and support.",
    shortDescription: "Luxury velvet sofa with gold-finished legs",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
    ],
    category: "Sofas & Loveseats",
    categorySlug: "sofas-loveseats",
    dimensions: '85" W x 35" D x 33" H',
    material: "Velvet",
    color: "Emerald Green",
    sku: "VEN-GRN-SF-014",
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 72,
  },
  {
    id: "15",
    name: "Oslo Reclining Sofa & Loveseat",
    slug: "oslo-reclining-sofa-loveseat",
    price: 1799.99,
    originalPrice: 2199.99,
    description:
      "The Oslo Reclining Set brings first-class comfort to your living room. Both the sofa and loveseat feature power recline with adjustable headrests. Air leather upholstery offers the look and feel of genuine leather with easier maintenance.",
    shortDescription: "Power reclining sofa & loveseat set in air leather",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "Sofas & Loveseats",
    categorySlug: "sofas-loveseats",
    dimensions: '88" W x 39" D x 40" H',
    material: "Air Leather",
    color: "Dark Brown",
    sku: "OSL-BRN-RS-015",
    inStock: true,
    rating: 4.7,
    reviewCount: 198,
  },
  {
    id: "16",
    name: "Zen Minimalist Platform Bed - Queen",
    slug: "zen-minimalist-platform-queen",
    price: 649.99,
    description:
      "The Zen Platform Bed embodies minimalist design at its finest. The floating frame creates an airy feel, while the solid wood construction provides unwavering support. No box spring needed — just place your mattress and enjoy.",
    shortDescription: "Floating minimalist queen platform bed in solid wood",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    category: "Beds & Bedrooms",
    categorySlug: "beds-bedrooms",
    dimensions: '63" W x 82" D x 14" H',
    material: "Solid Acacia Wood",
    color: "Natural Walnut",
    sku: "ZEN-WAL-BD-016",
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 89,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material?.toLowerCase().includes(q) ||
      p.color?.toLowerCase().includes(q)
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
