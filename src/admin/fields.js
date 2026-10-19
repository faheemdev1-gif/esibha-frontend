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
      family: FAMILIES[0],
      inspo: "eSibha Original",
      mood: "Fresh",
      intensity: 70,
      description: "",
      sizes: [{ label: "30ml", price: 0 }],
      image: "",
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
      ["family", "Scent family", "select", true, FAMILIES],
      ["inspo", "Inspired by", "text"],
      [
        "mood",
        "Mood",
        "select",
        true,
        ["Fresh", "Romantic", "Bold", "Luxurious", "Night"],
      ],
      ["description", "Description", "textarea", true],
      ["image", "Product image", "image"],
      ["sizes", "Sizes and prices (PKR)", "sizes"],
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
