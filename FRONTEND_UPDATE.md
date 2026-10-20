# Complete frontend update

This archive contains the complete frontend, including `src/main.jsx` and all existing source files and assets. Copy its contents into the main frontend repository folder. Keep your existing `.git`, `.env` and nested `backend` folder.

This version also needs the accompanying backend update. Deploy the backend first. Read `CATALOG_UPDATE.md` for installation, local startup, admin usage and the separate repository push commands.

From the frontend folder, run `npm ci`, `npm test`, and `npm run build`. Run `npm run dev` for localhost. On Vercel, use the frontend repository root, build command `npm run build`, output directory `dist`, and the existing `VITE_API_URL` environment value for your backend API.
