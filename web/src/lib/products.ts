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
  highlights: Record<"fr" | "ar" | "en", string[]>;
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
    image: "/images/products/processed/tapis-selle.jpg",
    description: {
      fr: "Un tapis de selle technique qui conjugue stabilité et respiration. Ses fibres évacuent la transpiration, son anti-glisse fixe la selle sans compromettre le mouvement du cheval — aussi juste à l'entraînement qu'en compétition.",
      ar: "بردعة تقنية تجمع بين الثبات والتهوية. أليافها تُبعد الرطوبة، ووجهها السفلي مانع للانزلاق يثبّت السرج دون أن يعيق حركة الحصان — مناسبة للتدريب والمنافسة على حد سواء.",
      en: "A technical saddle pad that pairs stability with breathability. Its fibres wick away sweat, and its non-slip base keeps the saddle planted without hindering the horse's movement — as at home in training as in competition.",
    },
    highlights: {
      fr: [
        "Fibres respirantes qui évacuent la transpiration",
        "Dessous anti-glisse pour une selle stable",
        "Épaisseur calibrée pour le travail comme la compétition",
      ],
      ar: [
        "ألياف قابلة للتنفس تُبعد العرق",
        "وجه سفلي مانع للانزلاق يثبّت السرج",
        "سماكة متوازنة للتدريب والمنافسة",
      ],
      en: [
        "Breathable fibres that wick away sweat",
        "Non-slip underside for a stable saddle",
        "Calibrated thickness for training and competition",
      ],
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
    image: "/images/products/processed/bridon.jpg",
    description: {
      fr: "Un bridon façonné dans un cuir souple, doté d'un montant anatomique qui épouse le contour de la tête du cheval. L'équilibre idéal entre précision de contact et douceur de port.",
      ar: "لجام مُشكَّل من جلد ناعم، بتاج تشريحي يلائم محيط رأس الحصان. توازن مثالي بين دقة التلامس ونعومة الارتداء.",
      en: "A bridle crafted from supple leather with an anatomical headpiece that follows the contours of the horse's head. The ideal balance between precision of contact and gentleness of wear.",
    },
    highlights: {
      fr: [
        "Cuir souple qui se patine avec le temps",
        "Montant anatomique pour un meilleur confort",
        "Boucles en inox et montages soignés",
      ],
      ar: [
        "جلد ناعم يزداد جمالاً مع الاستخدام",
        "تاج تشريحي لمزيد من الراحة",
        "أبازيم من الستانلس ستيل بتشطيب دقيق",
      ],
      en: [
        "Supple leather that develops a rich patina",
        "Anatomical headpiece for greater comfort",
        "Stainless steel buckles, refined stitching",
      ],
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
    image: "/images/products/processed/bottes.jpg",
    description: {
      fr: "Une paire de bottes de protection en néoprène respirant, avec coque renforcée qui absorbe les chocs. Pensées pour le travail quotidien comme pour les déplacements.",
      ar: "زوج من أحذية الحماية من النيوبرين القابل للتنفس، بقشرة مقواة تمتص الصدمات. مصممة للعمل اليومي وللتنقل.",
      en: "A pair of protective boots in breathable neoprene with a reinforced shell that absorbs shocks. Designed for daily work and travel alike.",
    },
    highlights: {
      fr: [
        "Néoprène respirant qui laisse passer l'air",
        "Coque renforcée qui absorbe les chocs",
        "Fermeture ajustable pour un maintien sûr",
      ],
      ar: [
        "نيوبرين قابل للتنفس يسمح بمرور الهواء",
        "قشرة مقواة تمتص الصدمات",
        "إغلاق قابل للتعديل لثبات آمن",
      ],
      en: [
        "Breathable neoprene that lets the skin breathe",
        "Reinforced shell that absorbs shock",
        "Adjustable fastening for a secure fit",
      ],
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
    image: "/images/products/processed/guetres.jpg",
    description: {
      fr: "Guêtres de transport généreusement matelassées, qui enveloppent les membres d'une protection moelleuse pendant le déplacement. La sérénité du transport, du box au van.",
      ar: "أربطة حماية للنقل ببطانة وافرة تلتف حول الأرجل بحماية ناعمة أثناء التنقل. راحة البال من الإسطبل إلى الشاحنة.",
      en: "Generously padded travel boots that wrap the legs in plush protection during transit. Peace of mind from stall to trailer.",
    },
    highlights: {
      fr: [
        "Matelassage généreux sur toute la hauteur",
        "Fermetures éclair résistantes et ajustables",
        "Protection complète pendant le transport",
      ],
      ar: [
        "بطانة وافرة على كامل الارتفاع",
        "سحابات متينة وقابلة للتعديل",
        "حماية كاملة أثناء النقل",
      ],
      en: [
        "Generous padding over the full height",
        "Durable, adjustable zips",
        "Complete protection during travel",
      ],
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
    image: "/images/products/processed/selle.jpg",
    description: {
      fr: "La selle polyvalente qui a fait la réputation de la Maison. Arçon résistant, assise profonde et cuir confortable : une alliée fidèle pour le travail, la balade et la détente.",
      ar: "السرج متعدد الاستعمالات الذي صنع سمعة الدار. هيكل متين، مقعد عميق وجلد مريح: رفيق وفيّ للعمل والجولات والاسترخاء.",
      en: "The versatile saddle that built the House's reputation. Robust tree, deep comfortable seat and supple leather: a faithful ally for work, rides and relaxation.",
    },
    highlights: {
      fr: [
        "Arçon robuste adapté aux chevaux de travail",
        "Assise profonde et confortable pour le cavalier",
        "Panneaux rembourrés pour le dos du cheval",
      ],
      ar: [
        "هيكل قوي ملائم لخيول العمل",
        "مقعد عميق ومريح للفارس",
        "وسائد مبطنة لظهر الحصان",
      ],
      en: [
        "Robust tree suited to working horses",
        "Deep, comfortable seat for the rider",
        "Padded panels for the horse's back",
      ],
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
    image: "/images/products/processed/licol.jpg",
    description: {
      fr: "Un licol en cuir pleine fleur, des boucles nickélées et un réglage précis : l'essentiel, dans sa forme la plus noble, pour accompagner votre cheval au quotidien.",
      ar: "حبل رأس من الجلد الطبيعي، بأبازيم مطلية بالنيكل وضبط دقيق: الأساس في أسمى صوره لمرافقة حصانك يوميًا.",
      en: "A full-grain leather halter with nickel buckles and precise adjustment: the essential, in its noblest form, for everyday companionship with your horse.",
    },
    highlights: {
      fr: [
        "Cuir pleine fleur, tannage de qualité",
        "Boucles nickel et finitions soignées",
        "Réglable pour tous les gabarits",
      ],
      ar: [
        "جلد طبيعي بدباغة عالية الجودة",
        "أبازيم نيكل وتشطيبات متقنة",
        "قابل للضبط لجميع الأحجام",
      ],
      en: [
        "Full-grain leather, quality tanning",
        "Nickel buckles and refined finishing",
        "Adjustable for all sizes",
      ],
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
    image: "/images/products/processed/chemise.jpg",
    description: {
      fr: "Une chemise anti-mouches respirante qui protège des insectes et des rayons UV, pensée pour les climats chauds. La légèreté d'un vêtement, la sécurité d'une protection.",
      ar: "غطاء مضاد للحشرات قابل للتنفس يحمي من الحشرات والأشعة فوق البنفسجية، مصمم للمناخات الحارة. خفة الملابس وأمان الحماية.",
      en: "A breathable fly sheet that protects against insects and UV rays, designed for hot climates. The lightness of clothing, the security of protection.",
    },
    highlights: {
      fr: [
        "Tissu respirant, protection UV intégrée",
        "Coupe ajustée qui ne gêne pas le mouvement",
        "Fermeture sûre pour une tenue parfaite",
      ],
      ar: [
        "نسيج قابل للتنفس مع حماية UV مدمجة",
        "قصّة ملائمة لا تعيق الحركة",
        "إغلاق آمن لثبات مثالي",
      ],
      en: [
        "Breathable fabric with built-in UV protection",
        "Tailored cut that never hinders movement",
        "Secure fastening for a perfect fit",
      ],
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
    image: "/images/products/processed/pansage.jpg",
    description: {
      fr: "Le rituel du pansage, réuni dans un kit complet : étrille, brosse douce, cure-pied et éponge. Tout le nécessaire pour un soin méticuleux, chaque jour.",
      ar: "طقس العناية بالحصان مجمّعًا في طقم كامل: فرشاة خشنة، فرشاة ناعمة، خطاف حوافر وإسفنجة. كل ما يلزم لعناية دقيقة يوميًا.",
      en: "The grooming ritual, gathered into a complete kit: curry comb, soft brush, hoof pick and sponge. Everything needed for meticulous daily care.",
    },
    highlights: {
      fr: [
        "Quatre outils essentiels réunis",
        "Poignées ergonomiques antidérapantes",
        "Idéal pour une routine de soin quotidienne",
      ],
      ar: [
        "أربع أدوات أساسية في طقم واحد",
        "مقابض مريحة مانعة للانزلاق",
        "مثالي لروتين عناية يومي",
      ],
      en: [
        "Four essential tools in one kit",
        "Ergonomic non-slip handles",
        "Perfect for a daily care routine",
      ],
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
    image: "/images/products/processed/polaire.jpg",
    description: {
      fr: "Une couverture polaire d'une douceur rare, pour les soirées fraîches et l'après-pansage. Un cocon chaleureux, une finition qui respire la qualité.",
      ar: "غطاء صوفي نادر النعومة، للأمسيات الباردة وبعد التنظيف. دفء مريح وتشطيب يوحي بالجودة.",
      en: "A fleece blanket of rare softness, for cool evenings and after grooming. A warm cocoon with a finish that speaks of quality.",
    },
    highlights: {
      fr: [
        "Polaire ultra-douce et thermorégulante",
        "Fini roulé et coutures résistantes",
        "Parfaite après l'effort ou le pansage",
      ],
      ar: [
        "صوف فائق النعومة ومنظِّم للحرارة",
        "حواف مخيطة وخياطة متينة",
        "مثالي بعد المجهود أو التنظيف",
      ],
      en: [
        "Ultra-soft, thermo-regulating fleece",
        "Rolled hem and durable stitching",
        "Perfect after effort or grooming",
      ],
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
    image: "/images/products/processed/casque.jpg",
    description: {
      fr: "Un casque léger, ventilé et certifié CE, taillé pour le confort et la sécurité du cavalier moderne. Protection sans compromis, style sans effort.",
      ar: "خوذة خفيفة جيدة التهوية بمطابقة CE، صُممت لراحة وسلامة الفارس العصري. حماية بلا مساومة وأناقة بلا جهد.",
      en: "A lightweight, ventilated, CE-certified helmet designed for the comfort and safety of the modern rider. Protection without compromise, style without effort.",
    },
    highlights: {
      fr: [
        "Norme CE, sécurité certifiée",
        "Léger et ventilé pour le confort",
        "Réglage précis à l'arrière",
      ],
      ar: [
        "مطابقة CE، أمان معتمد",
        "خفيفة وجيدة التهوية للراحة",
        "ضبط دقيق من الخلف",
      ],
      en: [
        "CE certified, proven safety",
        "Lightweight and ventilated for comfort",
        "Precise rear adjustment",
      ],
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
    image: "/images/products/processed/bottes-cavalier.jpg",
    description: {
      fr: "Des bottes d'équitation en cuir, à tige haute, dont la semelle antidérapante et le maintien travaillé accompagnent chaque foulée. L'élégance du geste, la sûreté de l'assise.",
      ar: "أحذية فروسية من الجلد بساق عالية، نعلها مانع للانزلاق وثباتها المدروس يرافقان كل خطوة. أناقة الحركة وأمان الثبات.",
      en: "Leather riding boots with a tall shaft; their non-slip sole and worked support accompany every stride. The elegance of the gesture, the certainty of the seat.",
    },
    highlights: {
      fr: [
        "Cuir souple qui épouse la jambe",
        "Semelle antidérapante et talon marqué",
        "Tige haute pour un maintien parfait",
      ],
      ar: [
        "جلد ناعم يلائم الساق",
        "نعل مانع للانزلاق وكعب بارز",
        "ساق عالية لثبات مثالي",
      ],
      en: [
        "Supple leather that hugs the leg",
        "Non-slip sole with defined heel",
        "Tall shaft for perfect support",
      ],
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
    image: "/images/products/processed/chaps.jpg",
    description: {
      fr: "Des chaps en cuir, zippés sur le côté, qui protègent la jambe et affinent la tenue en selle. Un accessoire d'exigence pour le travail comme pour la présentation.",
      ar: "أغطية ساق جلدية بسحاب جانبي، تحمي الساق وتحسّن الثبات في السرج. إكسسوار بالغ الدقة للعمل والعرض على السواء.",
      en: "Zip-side leather chaps that protect the leg and refine the seat. An exacting accessory for work and for presentation alike.",
    },
    highlights: {
      fr: [
        "Cuir robuste, protection durable",
        "Fermeture éclair sur le côté",
        "Améliorent la prise en selle",
      ],
      ar: [
        "جلد متين وحماية تدوم",
        "سحاب جانبي",
        "تحسّن الثبات في السرج",
      ],
      en: [
        "Robust leather, lasting protection",
        "Side zip fastening",
        "Improves grip in the saddle",
      ],
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
    image: "/images/products/processed/brosse.jpg",
    description: {
      fr: "La brosse à double face qui simplifie le pansage : poils durs pour décoller, poils doux pour lustrer. Un geste précis, une seule brosse.",
      ar: "الفرشاة ذات الوجهين التي تبسّط العناية: شعر خشن لإزالة الأوساخ وشعر ناعم للتلميع. لمسة دقيقة، فرشاة واحدة.",
      en: "The double-sided brush that simplifies grooming: hard bristles to lift, soft bristles to polish. One precise gesture, one brush.",
    },
    highlights: {
      fr: [
        "Double face : poils durs et poils doux",
        "Poignée ergonomique antidérapante",
        "Compacte et facile à emporter",
      ],
      ar: [
        "وجهان: خشن وناعم",
        "مقبض مريح مانع للانزلاق",
        "صغيرة الحجم وسهلة الحمل",
      ],
      en: [
        "Two sides: firm and soft bristles",
        "Ergonomic non-slip handle",
        "Compact and easy to carry",
      ],
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
    image: "/images/products/processed/porte-bouteille.svg",
    description: {
      fr: "Un porte-bouteille de selle en cuir, discrètement pensé pour les balades et le tourisme équestre. L'hydratation à portée de main, sans gêner le geste.",
      ar: "حامل زجاجة للسرج من الجلد، مصمم بعناية للجولات والسياحة الفروسية. ترطيب في متناول اليد دون أن يعيق حركتك.",
      en: "A leather saddle bottle holder, thoughtfully designed for rides and equestrian tourism. Hydration within reach, without hindering your movement.",
    },
    highlights: {
      fr: [
        "Cuir robuste et coutures renforcées",
        "Se fixe solidement à la selle",
        "Pratique pour les longues balades",
      ],
      ar: [
        "جلد متين وخياطة معززة",
        "يُثبَّت بإحكام على السرج",
        "عملي للجولات الطويلة",
      ],
      en: [
        "Robust leather with reinforced stitching",
        "Secures firmly to the saddle",
        "Handy for long rides",
      ],
    },
    badge: EU,
    inStock: true,
    createdAt: "2026-08-01",
  },
];

export const BADGE_COLOR: Record<string, "gold" | "green" | "red" | "royalblue"> = {
  new: "gold",
  promo: "red",
  eu: "green",
};
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