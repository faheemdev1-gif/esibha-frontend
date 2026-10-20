import { test } from "node:test";
import assert from "node:assert/strict";
import {
  readFilters,
  matchesProduct,
  filterProducts,
  productImages,
} from "../src/utils/catalog.js";
const product = {
  _id: "one",
  name: "Rose",
  family: "Gourmand",
  category: "Unisex",
  mood: "Playful",
  intensity: 65,
  inStock: true,
  sizes: [
    { label: "10ml", price: 500, inStock: false },
    { label: "50ml", price: 3500, inStock: true },
  ],
};
const filters = (query) => readFilters(new URLSearchParams(query));
test("price, size and stock must match the same variation", () => {
  assert.equal(matchesProduct(product, filters("size=50ml&max=1000")), false);
  assert.equal(matchesProduct(product, filters("size=10ml&stock=true")), false);
  assert.equal(
    matchesProduct(product, filters("size=50ml&min=3000&max=3500&stock=true")),
    true,
  );
  assert.equal(
    matchesProduct({ ...product, inStock: false }, filters("stock=true")),
    false,
  );
});
test("multiple facets use OR within a group and AND across groups, including custom taxonomies", () => {
  assert.equal(
    matchesProduct(
      product,
      filters("family=Floral&family=Gourmand&mood=Playful&intensity=Strong"),
    ),
    true,
  );
  assert.equal(
    matchesProduct(product, filters("family=Gourmand&mood=Night")),
    false,
  );
  assert.equal(matchesProduct(product, filters("intensity=Moderate")), false);
  assert.equal(matchesProduct(product, filters("q=rose")), true);
  assert.equal(matchesProduct(product, filters("q=oud")), false);
  assert.equal(
    readFilters(new URLSearchParams("mood=Luxury")).mood[0],
    "Luxurious",
  );
});
test("sorting and displayed variations reflect selected variation prices", () => {
  const second = {
    ...product,
    _id: "two",
    sizes: [
      { label: "10ml", price: 1000 },
      { label: "50ml", price: 3000 },
    ],
  };
  const sorted = filterProducts(
    [product, second],
    filters("size=50ml"),
    "price-asc",
  );
  assert.equal(sorted[0]._id, "two");
  assert.deepEqual(
    sorted[0].shopSizes.map((size) => size.label),
    ["50ml"],
  );
  assert.equal(
    filterProducts([product, second], filters(""), "price-asc")[0]._id,
    "two",
  );
  assert.equal(matchesProduct(product, filters("min=4000&max=2000")), false);
});
test("variation galleries lead with assigned photos and retain product photo fallbacks", () => {
  assert.deepEqual(
    productImages(
      { images: ["front", "back"], image: "old" },
      { images: ["variant", "front"] },
    ),
    ["variant", "front", "back"],
  );
  assert.deepEqual(productImages({ image: "legacy" }, {}), ["legacy"]);
  assert.deepEqual(productImages({ images: ["front"] }, { images: [] }), [
    "front",
  ]);
});
