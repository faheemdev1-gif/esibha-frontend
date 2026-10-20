# Catalog, galleries, variations and filters

This update changes BOTH repositories. Deploy the backend first, then the frontend. Existing products, their single cover images, sizes, prices, and saved orders remain compatible.

## Install the complete source updates

- `esibha-frontend-update.zip` contains the COMPLETE frontend source. Copy its contents into your main `esibha` folder. Keep your existing `.git`, `.env`, and nested `backend` folder. It includes `src/main.jsx`, `index.html`, and all frontend assets.
- `esibha-backend-update.zip` contains the COMPLETE backend source. Copy its contents into your existing `esibha/backend` folder. Keep the backend's existing `.git` and `.env`.
- `esibha.zip` is an optional complete project backup with frontend and backend together. Use either the two separate updates or this full project; you do not need both.

No live environment files, Git metadata, dependencies, database data, or production build output are included. Source updates do not replace your MongoDB data.

From the main frontend folder:

```bash
npm ci
npm test
npm run build
npm run dev
```

In a second terminal, from `esibha/backend`:

```bash
npm ci
npm test
npm start
```

Open `http://localhost:5173/admin` to manage the catalog and `http://localhost:5173/shop` to browse it. Keep your existing `MONGO_URI` and admin environment values. If necessary, set frontend `VITE_API_URL=http://localhost:5000/api`; restart Vite after changing environment values.

On backend startup a one-time migration adds the original scent families and moods plus any existing product values. Later restarts preserve your edits and deletions. No new environment variables are required.

## Product photos and variations

1. Open Admin → Products → Add product or Edit.
2. Under Product photos, select several files at once. Up to 12 product photos are supported; PNG, JPEG, WebP and GIF are supported at up to 5 MB each. Files upload sequentially with progress shown. Already completed uploads remain available if a later file fails.
3. Use the arrows to reorder photos. The first photo is the product cover. Remove a photo from the gallery with ×. You can also add an HTTP(S) image URL.
4. Under Variations and prices, enter any unique variation label (for example `10ml`, `50ml`, or `Gift boxed`), its price in PKR, optional SKU, and availability. Labels are unique regardless of letter case.
5. Each variation accepts up to 8 photos. Upload photos, paste image URLs, or reuse a product photo. Leave its gallery empty to use the product photos.
6. Save changes. Product detail pages switch to the selected variation's photos, followed by the other product photos. Thumbnails and an enlarged photo viewer are available. Product cards and cart items show the selected variation's cover. Prices of zero are supported.

Product-level In stock controls the whole product; variation-level availability controls individual variants. Checkout verifies current prices and rejects sold-out variations on the server. SKUs are retained with new orders and shown in admin order details.

## Managed scent families and moods

Use Admin → Scent families or Admin → Moods to add, edit, arrange and remove options, just like categories. Create an option first, then select it in the product editor. New options appear in shop filters automatically. Names assigned to products cannot be renamed or deleted until those products are moved to another option; descriptions, slugs and display order remain editable.

The existing homepage mood cards remain curated shortcuts to the original moods. Additional moods are available through the shop filters.

## Shop filters

- Search product names, inspiration, families, tags and accords.
- Select multiple categories, scent families, moods, sizes/variation labels and intensity levels.
- Enter a price range in PKR and select In stock only.
- Choices within one group are alternatives; different groups are combined.
- Size, price and availability must match the same variation. Product cards show matching variations and price sorting uses matching available variation prices.
- Filter counts reflect the other selected filters. Remove individual active chips or use Clear all / Reset all.
- Shareable URLs retain filters and sorting across reloads and browser back/forward navigation. Existing category routes and homepage mood links continue working.
- On mobile, open Filters, adjust selections and press Show fragrances to return to the results.

## Push your two repositories

First verify that each directory really belongs to its intended repository. Earlier, `git rev-parse --show-toplevel` from your backend directory returned the frontend root. If that still happens, do not commit backend files there; restore or clone the separate backend repository and copy the backend update into it first.

From the backend repository root, run each command separately:

```bash
git rev-parse --show-toplevel
git remote -v
git status --short
git add app.js controllers models routes scripts utils tests package.json package-lock.json .gitignore .env.example CATALOG_UPDATE.md
git commit -m "Add catalog options, product galleries and variation images"
git push origin main
```

Confirm the remote is `esibha-backend.git`, then deploy/restart that backend. Its entry point remains `server.js`.

From the frontend repository root, run each command separately:

```bash
git rev-parse --show-toplevel
git remote -v
git status --short
git add src public tests index.html package.json package-lock.json vite.config.js eslint.config.js vercel.json .gitignore .env.example README.md ADMIN_SETUP.md FRONTEND_UPDATE.md CATALOG_UPDATE.md
git commit -m "Add product galleries, variation management and shop filters"
git push origin main
```

Confirm the remote is `esibha-frontend.git`. Vercel should build the frontend root with `npm run build` and publish `dist`. Keep the live frontend's existing `VITE_API_URL` pointing to the deployed backend's `/api` URL. Do not stage `.env` or force-add the backend folder into the frontend repository.

## Validation

- 17 backend integration tests against an isolated temporary MongoDB instance.
- 7 frontend tests for cart persistence, variation photos, filter matching, gallery fallback and sorting.
- Production Vite build and lint checks for changed frontend files.
- Browser checks for admin multi-file uploads, variation images, taxonomy creation, galleries, cart and mobile/URL filter behavior.
