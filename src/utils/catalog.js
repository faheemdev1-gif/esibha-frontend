export const INTENSITIES = {
  Light: [0, 40],
  Moderate: [40, 65],
  Strong: [65, 82],
  "Very Strong": [82, 101],
};
export const MULTI_FILTERS = [
  "category",
  "family",
  "mood",
  "size",
  "intensity",
];
export function readFilters(params, routeCategory) {
  const filters = Object.fromEntries(
    MULTI_FILTERS.map((key) => [key, params.getAll(key).filter(Boolean)]),
  );
  if (routeCategory) filters.category = [routeCategory];
  filters.mood = filters.mood.map((value) =>
    value === "Luxury" ? "Luxurious" : value,
  );
  return {
    ...filters,
    q: params.get("q") || "",
    min: params.get("min") || "",
    max: params.get("max") || "",
    stock: params.get("stock") === "true",
  };
}
export function matchingVariations(product, filters) {
  const min = filters.min === "" ? 0 : Math.max(0, Number(filters.min) || 0);
  const max =
    filters.max === "" ? Infinity : Math.max(0, Number(filters.max) || 0);
  return (product.sizes || []).filter(
    (size) =>
      (!filters.size.length || filters.size.includes(size.label)) &&
      size.price >= min &&
      size.price <= max &&
      (!filters.stock || (product.inStock !== false && size.inStock !== false)),
  );
}
export function matchesProduct(product, filters) {
  const text = [
    product.name,
    product.inspo,
    product.family,
    ...(product.tags || []),
    ...(product.accords || []),
  ]
    .join(" ")
    .toLowerCase();
  return (
    (!filters.q.trim() || text.includes(filters.q.trim().toLowerCase())) &&
    ["category", "family", "mood"].every(
      (key) => !filters[key].length || filters[key].includes(product[key]),
    ) &&
    (!filters.intensity.length ||
      filters.intensity.some((label) => {
        const range = INTENSITIES[label];
        return (
          range && product.intensity >= range[0] && product.intensity < range[1]
        );
      })) &&
    matchingVariations(product, filters).length > 0
  );
}
export function filterProducts(products, filters, sort = "default") {
  const list = products
    .filter((product) => matchesProduct(product, filters))
    .map((product) => ({
      ...product,
      shopSizes: matchingVariations(product, filters).sort(
        (a, b) => a.price - b.price,
      ),
    }));
  const price = (product) =>
    Math.min(
      ...(product.shopSizes.filter(
        (size) => product.inStock !== false && size.inStock !== false,
      ).length
        ? product.shopSizes.filter(
            (size) => product.inStock !== false && size.inStock !== false,
          )
        : product.shopSizes
      ).map((size) => size.price),
    );
  return list.sort((a, b) =>
    sort === "price-asc"
      ? price(a) - price(b)
      : sort === "price-desc"
        ? price(b) - price(a)
        : sort === "new"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : (a.displayOrder || 0) - (b.displayOrder || 0) ||
            Number(!!b.bestseller) - Number(!!a.bestseller),
  );
}
export function productImages(product, variation) {
  return [
    ...new Set([
      ...(variation?.images || []),
      ...(product.images?.length
        ? product.images
        : product.image
          ? [product.image]
          : []),
    ]),
  ].filter(Boolean);
}
