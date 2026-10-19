# eSibha admin panel

After deploying the frontend **and** backend, open **`/admin`** on your website, for example `https://www.esibha.com/admin`.

## What you can manage

| Section              | Controls                                                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Overview             | Completed order value, pending orders, stock, active promotions and recent orders                                                       |
| Products             | Add/edit/delete; upload a photo or use an image URL; descriptions, categories, fragrance notes, mood, intensity, tags and display order |
| Sizes and highlights | Price for each bottle size; featured, bestseller, most loved, new arrival and in-stock switches                                         |
| Categories           | Add/edit/delete collections; changes appear in the shop menu and collection tabs                                                        |
| Gift packs           | Add/edit/delete sets, contents, description, price and stock                                                                            |
| Promo codes          | Percentage/fixed discount, minimum order, discount cap, expiry, usage limit, activation and usage count                                 |
| Shop orders          | Customer/delivery details, items, wrapping, gift messages, discounts, totals and fulfilment status                                      |
| Custom Lab orders    | Recipe, size, price, customer, notes and status                                                                                         |
| Hybrid orders        | Both fragrances, blend ratio, size, price, customer and status                                                                          |
| Store settings       | Shipping, free shipping threshold, custom fragrance prices and gift wrapping charges                                                    |

Gift packs and categories now load from the database. Custom Lab submissions now create real orders. Uploaded images are stored in MongoDB and survive ordinary backend redeploys. Upload PNG, JPEG, WebP or GIF images up to 5 MB.

## 1. Create your admin login

Use Node.js **22.12+ or 24+**. In a terminal inside the project:

```bash
cd backend
npm ci
npm run admin:credentials
```

Enter an email and a password of at least 12 characters. Password input is hidden. Copy the three generated values into your **backend hosting environment variables**:

```dotenv
ADMIN_LOGIN_EMAIL=your-admin-email
ADMIN_PASSWORD_HASH=the-generated-salt-and-hash
ADMIN_TOKEN_SECRET=the-generated-secret
```

There is no default password. `ADMIN_LOGIN_EMAIL` controls sign-in; `ADMIN_EMAIL` remains the order notification inbox. These are separate settings and may use the same address.

## 2. Deploy the backend on Hostinger

Deploy the contents of `backend/` to your existing backend service. Entry point: `server.js`. Install command: `npm ci --omit=dev`. Start command: `npm start`.

**Retain your existing database and email credentials.** This download includes `.env.example` files instead of live secrets. Keep your real `.env` on your computer/host, or retain the equivalent hosting environment variables.

| Backend variable      | Value                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `MONGO_URI`           | Your existing MongoDB connection string                                                                                     |
| `ADMIN_LOGIN_EMAIL`   | Generated in step 1                                                                                                         |
| `ADMIN_PASSWORD_HASH` | Generated in step 1, including its salt and colon                                                                           |
| `ADMIN_TOKEN_SECRET`  | Generated in step 1; at least 32 characters                                                                                 |
| `CORS_ORIGINS`        | Comma-separated frontend origins, such as `https://esibha.com,https://www.esibha.com`; add the actual Vercel origin if used |
| `PORT`                | Hosting-assigned port, or `5000` locally                                                                                    |
| `ADMIN_EMAIL`         | Existing order notification inbox                                                                                           |
| `RESEND_API_KEY`      | Existing Resend key, if using order emails                                                                                  |
| `FROM_EMAIL`          | Existing verified sender email                                                                                              |

Restart the backend after changing variables. On first startup, a one-time migration creates categories from existing products and the five original collections. If the gift pack database is empty, it saves the three sets previously displayed from frontend sample data. Existing catalog data and orders are retained. Deleting those categories or gift packs later does not recreate them on restart.

## 3. Deploy the frontend on Vercel

Deploy the project root. Build command: `npm run build`. Output directory: `dist`.

Set this **frontend** environment variable to your actual backend API URL:

```dotenv
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

The original Hostinger URL remains the production fallback. Set the variable explicitly and redeploy after changing it. Admin credentials, database credentials and email API keys belong only on the backend.

Deploy both sides before using the panel. Visit `/admin` and sign in using the email/password from step 1.

## Local development

1. Copy `backend/.env.example` to `backend/.env`; supply your MongoDB connection and generated login values.
2. Copy the root `.env.example` to `.env`. Local API URL: `http://localhost:5000/api`.
3. In `backend/`, run `npm ci` and `npm start`.
4. In another terminal at the project root, run `npm ci` and `npm run dev`.
5. Open `http://localhost:5173/admin`.

## Using the panel

- Create a category before assigning a product to it. Slugs use lowercase letters, numbers and hyphens.
- A category with assigned products cannot be renamed or deleted. Move its products first. Its description, slug and display order remain editable.
- Products need at least one bottle size. Each size has its own price. Smaller display order values appear first in the default shop sort.
- Upload an image, then use **Save changes** to attach it to a product. Canceling an edit leaves the upload unattached.
- Leave optional promo limits/expiry blank for no limit. Expiry uses your browser's local timezone and is stored as an absolute time.
- Promo usage increases when an order is accepted. Later cancellation does not release a use.
- Historical orders retain their original prices and details after catalog edits.
- Checkout validates current prices, stock, shipping, wrapping and discounts on the server. The cart now survives a page refresh. A saved cart may display older prices until refreshed; current store prices apply at submission.
- Custom Lab and hybrid orders use Store settings prices.
- Admin sessions last up to eight hours and are stored in the current browser tab. Sign out clears the session.

## Change or recover the admin password

Run `npm run admin:credentials` again, update all three generated backend values, and restart/redeploy. The new password hash invalidates previous admin sessions. This version uses one administrator login configured through environment variables; email password resets and additional admin accounts are outside its scope.

## Verification

Frontend production build:

```bash
npm ci
npm run build
npm test
```

Backend integration tests, with development dependencies installed:

```bash
cd backend
npm ci
npm test
```

Tests launch a disposable MongoDB 7.0.24 database. They do not load your `.env` or use your live database. The first run downloads a test database binary and needs network access. The test database shuts down afterward.

## Scope and deployment status

The panel covers every data entity in the supplied backend, plus new category and pricing settings. Journal content, About page text, the quiz and homepage editorial text remain in frontend source because the original backend has no CMS models for those sections. Saved product data and highlight flags update the existing homepage product sections.

This is the updated project source. It has not been deployed to your live hosting accounts.
