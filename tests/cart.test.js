import { test } from "node:test";
import assert from "node:assert/strict";
const values = new Map();
globalThis.localStorage = {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value),
  removeItem: (key) => values.delete(key),
};
globalThis.window = { localStorage: globalThis.localStorage };
let index = 0;
const freshStore = async () =>
  (await import(`../src/data/index.js?cart-test=${index++}`)).useCartStore;
test("a persisted cart survives a full page/module reload", async () => {
  values.clear();
  const first = await freshStore();
  first
    .getState()
    .addItem(
      {
        _id: "product-one",
        name: "Fragrance",
        sizes: [{ label: "30ml", price: 3450 }],
      },
      "30ml",
      2,
    );
  const afterReload = await freshStore();
  assert.equal(afterReload.getState().items.length, 1);
  assert.equal(afterReload.getState().items[0].qty, 2);
  assert.equal(afterReload.getState().items[0].price, 3450);
  assert.deepEqual(Object.keys(JSON.parse(values.get("esibha-cart")).state), [
    "items",
  ]);
  afterReload.getState().clearCart();
  assert.equal((await freshStore()).getState().items.length, 0);
});
test("different gift wrapping and personal messages remain distinct cart items", async () => {
  values.clear();
  const store = await freshStore();
  const gift = {
    _id: "gift-one",
    name: "Gift pack",
    kind: "gift",
    wrap: "classic",
    giftMessage: "For Mum",
    price: 2200,
  };
  store.getState().addItem(gift, "Gift", 1);
  store.getState().addItem({ ...gift, wrap: "luxury", price: 2550 }, "Gift", 1);
  store.getState().addItem({ ...gift, giftMessage: "For Dad" }, "Gift", 1);
  store.getState().addItem(gift, "Gift", 1);
  const items = store.getState().items;
  assert.equal(items.length, 3);
  assert.equal(items[0].qty, 2);
  assert.equal(items[1].price, 2550);
});
