import { useEffect, useState } from "react";
import api from "./api";
export const DEFAULT_CATEGORIES = [
  { name: "Men's", slug: "mens" },
  { name: "Women's", slug: "womens" },
  { name: "Unisex", slug: "unisex" },
  { name: "Gift Packs", slug: "gifts" },
  { name: "Seasonal", slug: "seasonal" },
];
export const DEFAULT_SETTINGS = {
  shippingFee: 200,
  freeShippingThreshold: 3000,
  labPrices: { "30ml": 2800, "50ml": 4200, "100ml": 6800 },
  hybridPrices: { "30ml": 3200, "50ml": 4800, "100ml": 7800 },
  wrapPrices: { classic: 0, luxury: 350, custom: 550 },
};
export function useStoreSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    let active = true;
    api
      .get("/settings")
      .then((res) => {
        if (active) setSettings(res.data.data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return settings;
}
export function useCategories() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  useEffect(() => {
    let active = true;
    api
      .get("/categories")
      .then((res) => {
        if (active) setCategories(res.data.data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return categories;
}
