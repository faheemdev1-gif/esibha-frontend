export const FAMILIES = [
  "Fresh & Citrus",
  "Floral",
  "Oud & Amber",
  "Woody & Oriental",
  "Musk",
];
export const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const resources = {
  products: {
    title: "Products",
    singular: "product",
    endpoint: "/products",
    description: "Your fragrances, sizes, prices, and collection highlights.",
    defaults: {
      name: "",
      slug: "",
      category: "",
      family: "",
      inspo: "eSibha Original",
      mood: "",
      intensity: 70,
      description: "",
      sizes: [{ label: "30ml", price: 0 }],
      images: [],
      top: [],
      heart: [],
      base: [],
      accords: [],
      tags: [],
      displayOrder: 0,
      inStock: true,
      featured: false,
      bestseller: false,
      mostLoved: false,
      newArrival: false,
    },
    fields: [
      ["name", "Product name", "text", true],
      ["slug", "URL slug", "slug", true],
      ["category", "Category", "category", true],
      ["family", "Scent family", "taxonomy", true],
      ["inspo", "Inspired by", "text"],
      ["mood", "Mood", "taxonomy", true],
      ["description", "Description", "textarea", true],
      ["images", "Product photos", "images"],
      ["sizes", "Variations and prices (PKR)", "sizes"],
      ["intensity", "Intensity (0–100)", "number", true, 100],
      ["displayOrder", "Display order", "number"],
      ["top", "Top notes", "list"],
      ["heart", "Heart notes", "list"],
      ["base", "Base notes", "list"],
      ["accords", "Accords", "list"],
      ["tags", "Tags", "list"],
      ["inStock", "In stock", "checkbox"],
      ["featured", "Featured", "checkbox"],
      ["bestseller", "Bestseller", "checkbox"],
      ["mostLoved", "Most loved", "checkbox"],
      ["newArrival", "New arrival", "checkbox"],
    ],
  },
  categories: {
    taxonomy: "category",
    title: "Categories",
    singular: "category",
    endpoint: "/categories",
    description: "Collections shown in the shop menu and product filters.",
    defaults: { name: "", slug: "", description: "", displayOrder: 0 },
    fields: [
      ["name", "Category name", "text", true],
      ["slug", "URL slug", "slug", true],
      ["description", "Description", "textarea"],
      ["displayOrder", "Display order", "number"],
    ],
  },
  "gift-packs": {
    title: "Gift packs",
    singular: "gift pack",
    endpoint: "/gift-packs",
    description: "Curated sets, contents, availability, and prices.",
    defaults: {
      name: "",
      description: "",
      price: 0,
      contents: [],
      inStock: true,
    },
    fields: [
      ["name", "Gift pack name", "text", true],
      ["description", "Description", "textarea"],
      ["price", "Price (PKR)", "number", true],
      ["contents", "Contents", "list"],
      ["inStock", "In stock", "checkbox"],
    ],
  },
  coupons: {
    title: "Promo codes",
    singular: "promo code",
    endpoint: "/coupons",
    description:
      "Percentage or fixed discounts, expiry dates, and usage limits.",
    defaults: {
      code: "",
      type: "percentage",
      value: 10,
      minOrderAmount: 0,
      maxDiscount: null,
      usageLimit: null,
      expiresAt: null,
      isActive: true,
    },
    fields: [
      ["code", "Promo code", "text", true],
      ["type", "Discount type", "select", true, ["percentage", "fixed"]],
      ["value", "Discount value (% or PKR)", "number", true],
      ["minOrderAmount", "Minimum order (PKR)", "number", true],
      ["maxDiscount", "Maximum percentage discount (PKR)", "optionalNumber"],
      ["usageLimit", "Total usage limit", "optionalInteger"],
      ["expiresAt", "Expiry date and time", "datetime-local"],
      ["isActive", "Active", "checkbox"],
    ],
  },
};
for (const [key, title, singular, field] of [
  ["scent-families", "Scent families", "scent family", "family"],
  ["moods", "Moods", "mood", "mood"],
])
  resources[key] = {
    ...resources.categories,
    title,
    singular,
    endpoint: `/${key}`,
    taxonomy: field,
    description: `Create and arrange ${title.toLowerCase()} for products and shop filters.`,
    fields: resources.categories.fields.map((row) =>
      row[0] === "name"
        ? [
            "name",
            `${singular[0].toUpperCase() + singular.slice(1)} name`,
            "text",
            true,
          ]
        : row,
    ),
  };
export const money = (value) => `PKR ${Number(value || 0).toLocaleString()}`;
export const errorMessage = (error) =>
  error.response?.data?.message ||
  (error.code === "ECONNABORTED"
    ? "The request timed out. Please try again."
    : "Could not connect to the server. Please try again.");
export const orderTypes = {
  orders: {
    title: "Shop orders",
    endpoint: "/orders",
    statuses: [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ],
  },
  "custom-lab-orders": {
    title: "Custom Lab orders",
    endpoint: "/custom-lab-orders",
    statuses: ["pending", "confirmed", "processing", "completed", "cancelled"],
  },
  "hybrid-orders": {
    title: "Hybrid orders",
    endpoint: "/hybrid-orders",
    statuses: ["pending", "confirmed", "processing", "completed", "cancelled"],
  },
};

export const date = (value) =>
  value
    ? new Date(value).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";
