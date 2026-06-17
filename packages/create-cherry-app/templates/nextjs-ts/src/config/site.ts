export const siteConfig = {
  name: "{{PROJECT_TITLE}}",
  tagline: "Furniture that elevates everyday living.",
  description:
    "Curated, handcrafted furniture for modern homes. Designed to last, made to be loved.",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Collection", href: "/#collection" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/faq" },
  ],
  footerLinks: [
    { label: "Home", href: "/" },
    { label: "Collection", href: "/#collection" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: "aalto-lounge-chair",
    name: "Aalto Lounge Chair",
    category: "Seating",
    description: "Sculpted oak frame with hand-stitched leather cushioning.",
    price: 4900000,
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
  },
  {
    id: "nordic-sofa",
    name: "Nordic Three-Seat Sofa",
    category: "Seating",
    description: "Deep, plush seating wrapped in soft boucle fabric.",
    price: 12500000,
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
    badge: "New",
  },
  {
    id: "monaco-dining-table",
    name: "Monaco Dining Table",
    category: "Tables",
    description: "Solid walnut top resting on a minimalist steel base.",
    price: 8900000,
    image:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "luna-coffee-table",
    name: "Luna Coffee Table",
    category: "Tables",
    description: "Rounded marble surface with a warm brass pedestal.",
    price: 3400000,
    image:
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "haven-bed-frame",
    name: "Haven Bed Frame",
    category: "Bedroom",
    description: "Upholstered headboard with a low, contemporary silhouette.",
    price: 9800000,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
  },
  {
    id: "oslo-bookshelf",
    name: "Oslo Bookshelf",
    category: "Storage",
    description: "Open ash-wood shelving with adjustable display tiers.",
    price: 5600000,
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "verona-armchair",
    name: "Verona Armchair",
    category: "Seating",
    description: "Velvet-upholstered accent chair with tapered legs.",
    price: 4200000,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kyoto-sideboard",
    name: "Kyoto Sideboard",
    category: "Storage",
    description: "Slatted oak doors concealing generous storage space.",
    price: 7300000,
    image:
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "milano-desk",
    name: "Milano Writing Desk",
    category: "Office",
    description: "Compact desk with a leather inlay and hidden drawer.",
    price: 6100000,
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    badge: "New",
  },
  {
    id: "sienna-pendant-lamp",
    name: "Sienna Pendant Lamp",
    category: "Lighting",
    description: "Hand-blown glass shade casting a warm ambient glow.",
    price: 2100000,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "terra-bar-stool",
    name: "Terra Bar Stool",
    category: "Seating",
    description: "Curved plywood seat on a powder-coated steel frame.",
    price: 1800000,
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "savannah-rug",
    name: "Savannah Wool Rug",
    category: "Decor",
    description: "Hand-tufted wool rug with a subtle geometric pattern.",
    price: 3900000,
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80",
  },
];
