export type CategorySlug = "equipment" | "materials" | "rider";

export type Product = {
  id: string;
  slug: string;
  category: CategorySlug;
  name: Record<"fr" | "ar" | "en", string>;
  price: number; // MAD
  priceEur?: number;
  image: string;
  description: Record<"fr" | "ar" | "en", string>;
  badge?: "new" | "promo" | "eu";
  featured?: boolean;
  inStock: boolean;
  createdAt: string;
};

export const CATEGORIES: {
  slug: CategorySlug;
  icon: string;
}[] = [
  { slug: "equipment", icon: "/images/categories/equipment.svg" },
  { slug: "materials", icon: "/images/categories/materials.svg" },
  { slug: "rider", icon: "/images/categories/rider.svg" },
];

const EU = "eu" as const;

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "tapis-de-selle-technique",
    category: "equipment",
    name: {
      fr: "Tapis de selle technique",
      ar: "بردعة تقنية للسرج",
      en: "Technical saddle pad",
    },
    price: 289,
    priceEur: 27,
    image: "/images/products/tapis-selle.jpg",
    description: {
      fr: "Tapis de selle anti-glisse à fibres respirantes, adapté à l'entraînement quotidien et à la compétition.",
      ar: "بردعة مانعة للانزلاق بألياف قابلة للتنفس، مناسبة للتدريب اليومي والمنافسات.",
      en: "Non-slip saddle pad with breathable fibers, ideal for daily training and competition.",
    },
    badge: EU,
    featured: true,
    inStock: true,
    createdAt: "2026-08-01",
  },
  {
    id: "p02",
    slug: "bridon-ergonomique",
    category: "equipment",
    name: {
      fr: "Bridon ergonomique",
      ar: "لجام مريح",
      en: "Ergonomic bridle",
    },
    price: 449,
    priceEur: 42,
    image: "/images/products/bridon.jpg",
    description: {
      fr: "Bridon ergonomique en cuir souple, montant anatomique pour un meilleur confort du cheval.",
      ar: "لجام مريح من الجلد الناعم مع تاج تشريحي لراحة أفضل للحصان.",
      en: "Ergonomic soft-leather bridle with anatomical headpiece for better horse comfort.",
    },
    badge: EU,
    featured: true,
    inStock: true,
    createdAt: "2026-08-05",
  },
  {
    id: "p03",
    slug: "bottes-de-protection",
    category: "equipment",
    name: {
      fr: "Bottes de protection (paire)",
      ar: "أحذية حماية (زوج)",
      en: "Protective boots (pair)",
    },
    price: 199,
    priceEur: 19,
    image: "/images/products/bottes.jpg",
    description: {
      fr: "Paire de bottes de protection en néoprène avec coque renforcée, pour le travail et le transport.",
      ar: "زوج من أحذية الحماية من النيوبرين بقشرة مقواة، للعمل والنقل.",
      en: "Pair of neoprene protective boots with reinforced shell, for work and transport.",
    },
    badge: EU,
    inStock: true,
    createdAt: "2026-08-01",
  },
  {
    id: "p04",
    slug: "guetres-de-transport",
    category: "equipment",
    name: {
      fr: "Guêtres de transport",
      ar: "أربطة حماية للنقل",
      en: "Transport boots",
    },
    price: 259,
    priceEur: 24,
    image: "/images/products/guetres.jpg",
    description: {
      fr: "Guêtres de transport matelassées, protègent les membres pendant le déplacement.",
      ar: "أربطة حماية مبطنة تحمي الأرجل أثناء النقل.",
      en: "Padded travel boots protecting the legs during transport.",
    },
    badge: EU,
    inStock: true,
    createdAt: "2026-08-01",
  },
  {
    id: "p05",
    slug: "selle-entree-de-gamme",
    category: "materials",
    name: {
      fr: "Selle d'entrée de gamme",
      ar: "سرج للمبتدئين",
      en: "Entry-level saddle",
    },
    price: 2499,
    priceEur: 234,
    image: "/images/products/selle.jpg",
    description: {
      fr: "Selle polyvalente d'entrée de gamme, arçon résistant et assise confortable pour cavaliers amateurs.",
      ar: "سرج متعدد الاستعمالات للمبتدئين، هيكل متين ومقعد مريح للفرسان الهواة.",
      en: "Versatile entry-level saddle, sturdy tree and comfortable seat for amateur riders.",
    },
    badge: "promo",
    featured: true,
    inStock: true,
    createdAt: "2026-08-10",
  },
  {
    id: "p06",
    slug: "licol-en-cuir",
    category: "materials",
    name: {
      fr: "Licol en cuir",
      ar: "حبل رأس من الجلد",
      en: "Leather halter",
    },
    price: 179,
    priceEur: 17,
    image: "/images/products/licol.jpg",
    description: {
      fr: "Licol en cuir pleine fleur, boucles nickel, ajustable pour tous les gabarits.",
      ar: "حبل رأس من الجلد الطبيعي، إبزيم نيكل قابل للتعديل لجميع الأحجام.",
      en: "Full-grain leather halter, nickel buckles, adjustable for all sizes.",
    },
    badge: EU,
    inStock: true,
    createdAt: "2026-08-01",
  },
  {
    id: "p07",
    slug: "chemise-anti-mouches",
    category: "materials",
    name: {
      fr: "Chemise anti-mouches",
      ar: "غطاء مضاد للحشرات",
      en: "Fly sheet",
    },
    price: 329,
    priceEur: 31,
    image: "/images/products/chemise.jpg",
    description: {
      fr: "Chemise anti-mouches respirante, protection UV, idéale pour les climats chauds.",
      ar: "غطاء مضاد للحشرات قابل للتنفس مع حماية من الأشعة فوق البنفسجية، مثالي للمناخات الحارة.",
      en: "Breathable fly sheet with UV protection, ideal for hot climates.",
    },
    badge: EU,
    featured: true,
    inStock: true,
    createdAt: "2026-08-06",
  },
  {
    id: "p08",
    slug: "kit-de-pansage",
    category: "materials",
    name: {
      fr: "Kit de pansage complet",
      ar: "طقم تنظيف كامل",
      en: "Complete grooming kit",
    },
    price: 149,
    priceEur: 14,
    image: "/images/products/pansage.jpg",
    description: {
      fr: "Kit de pansage : étrille, brosse douce, cure-pied et éponge, le nécessaire au quotidien.",
      ar: "طقم تنظيف: فرشاة خشنة، فرشاة ناعمة، خطاف حوافر وإسفنجة، كل ما تحتاجه يومياً.",
      en: "Grooming kit: curry comb, soft brush, hoof pick and sponge — everything for daily care.",
    },
    inStock: true,
    createdAt: "2026-08-01",
  },
  {
    id: "p09",
    slug: "couverture-polonaise",
    category: "materials",
    name: {
      fr: "Couverture polaire",
      ar: "غطاء صوفي",
      en: "Fleece blanket",
    },
    price: 259,
    priceEur: 24,
    image: "/images/products/polaire.jpg",
    description: {
      fr: "Couverture polaire douce, pour les soirées fraîches et l'après-pansage.",
      ar: "غطاء صوفي ناعم للأمسيات الباردة وبعد التنظيف.",
      en: "Soft fleece blanket for cool evenings and after grooming.",
    },
    badge: EU,
    inStock: true,
    createdAt: "2026-08-01",
  },
  {
    id: "p10",
    slug: "casque-equitation",
    category: "rider",
    name: {
      fr: "Casque d'équitation",
      ar: "خوذة فروسية",
      en: "Riding helmet",
    },
    price: 599,
    priceEur: 56,
    image: "/images/products/casque.jpg",
    description: {
      fr: "Casque d'équitation léger et ventilé, norme CE, tailles ajustables.",
      ar: "خوذة فروسية خفيفة وجيدة التهوية، بمطابقة CE، بمقاسات قابلة للتعديل.",
      en: "Lightweight ventilated riding helmet, CE certified, adjustable sizes.",
    },
    badge: "new",
    featured: true,
    inStock: true,
    createdAt: "2026-08-12",
  },
  {
    id: "p11",
    slug: "bottes-equitation",
    category: "rider",
    name: {
      fr: "Bottes d'équitation",
      ar: "أحذية فروسية",
      en: "Riding boots",
    },
    price: 799,
    priceEur: 75,
    image: "/images/products/bottes-cavalier.jpg",
    description: {
      fr: "Bottes d'équitation en cuir, tige haute, semelle antidérapante et confort durable.",
      ar: "أحذية فروسية من الجلد بساق عالية ونعل مانع للانزلاق وراحة تدوم.",
      en: "Leather riding boots, tall shaft, non-slip sole and lasting comfort.",
    },
    badge: EU,
    featured: true,
    inStock: true,
    createdAt: "2026-08-08",
  },
  {
    id: "p12",
    slug: "chaps-en-cuir",
    category: "rider",
    name: {
      fr: "Chaps en cuir",
      ar: "أغطية ساق جلدية",
      en: "Leather chaps",
    },
    price: 349,
    priceEur: 33,
    image: "/images/products/chaps.jpg",
    description: {
      fr: "Chaps en cuir avec fermeture éclair, protègent la jambe et améliorent la tenue en selle.",
      ar: "أغطية ساق جلدية بسحاب، تحمي الساق وتحسن الثبات في السرج.",
      en: "Leather chaps with zip, protecting the leg and improving seat grip.",
    },
    badge: EU,
    inStock: true,
    createdAt: "2026-08-01",
  },
  {
    id: "p13",
    slug: "brosse-pansage-double-face",
    category: "rider",
    name: {
      fr: "Brosse de pansage double face",
      ar: "فرشاة تنظيف ذات وجهين",
      en: "Double-sided grooming brush",
    },
    price: 89,
    priceEur: 8,
    image: "/images/products/brosse.jpg",
    description: {
      fr: "Brosse double face : poils durs et poils doux, poignée ergonomique antidérapante.",
      ar: "فرشاة ذات وجهين: شعر خشن وشعر ناعم، بمقبض مريح مانع للانزلاق.",
      en: "Double-sided brush: hard and soft bristles, ergonomic non-slip handle.",
    },
    inStock: true,
    createdAt: "2026-08-01",
  },
  {
    id: "p14",
    slug: "porte-bouteille-de-selle",
    category: "rider",
    name: {
      fr: "Porte-bouteille de selle",
      ar: "حامل زجاجة للسرج",
      en: "Saddle bottle holder",
    },
    price: 129,
    priceEur: 12,
    image: "/images/products/porte-bouteille.svg",
    description: {
      fr: "Porte-bouteille de selle en cuir, pratique pour les balades et le tourisme équestre.",
      ar: "حامل زجاجة للسرج من الجلد، عملي للجولات والسياحة الفروسية.",
      en: "Leather saddle bottle holder, handy for rides and equestrian tourism.",
    },
    badge: EU,
    inStock: true,
    createdAt: "2026-08-01",
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return PRODUCTS.filter((p) => p.featured);
}

export function getCategoryMeta(slug: CategorySlug) {
  return CATEGORIES.find((c) => c.slug === slug);
}