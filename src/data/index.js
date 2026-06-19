import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── CART ────────────────────────────────────────────────────────────
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size = '30ml', qty = 1) => {
        const key = `${product._id || product.id}-${size}`;

        set(state => {
          const existing = state.items.find(i => i.key === key);

          if (existing) {
            return {
              items: state.items.map(i =>
                i.key === key ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }

          const sizeObj = product.sizes?.find(s => s.label === size);
          const price = sizeObj?.price ?? product.price ?? 0;

          return {
            items: [...state.items, { ...product, key, size, qty, price }],
          };
        });
      },

      removeItem: key =>
        set(s => ({
          items: s.items.filter(i => i.key !== key),
        })),

      updateQty: (key, qty) =>
        set(s => ({
          items:
            qty < 1
              ? s.items.filter(i => i.key !== key)
              : s.items.map(i =>
                  i.key === key ? { ...i, qty } : i
                ),
        })),

      clearCart: () => set({ items: [] }),

      get totalItems() {
        return get().items.reduce((s, i) => s + i.qty, 0);
      },

      get subtotal() {
        return get().items.reduce((s, i) => s + i.price * i.qty, 0);
      },
    }),
    {
      name: 'esibha-cart',
    }
  )
);

// ── UI ──────────────────────────────────────────────────────────────
export const useUIStore = create(set => ({
  cartOpen: false,
  mobileMenuOpen: false,

  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set(s => ({ cartOpen: !s.cartOpen })),
  toggleMobileMenu: () => set(s => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));