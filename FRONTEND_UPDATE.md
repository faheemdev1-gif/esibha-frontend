# Complete frontend: restore the Vercel build

This download contains the complete frontend source and assets, including `src/main.jsx`, `src/App.jsx`, all existing pages, the admin panel, and the three redesigned homepage sections.

## Restore the frontend

1. Extract this new ZIP.
2. Copy its complete `src/` and `public/` folders into the matching locations in your existing main `esibha` project. Merge and replace matching files. Do not replace the entire project directory.
3. Keep your existing `.git`, `.env`, `.env.local` and separate `backend/` directory in place.
4. In the main frontend folder, check the entry point and build:

```bash
ls src/main.jsx
npm run build
```

5. After the build succeeds, push the frontend repository:

```bash
git add src public
git commit -m "Restore complete frontend and homepage design"
git push
```

Vercel should then deploy the new commit. If it still reports a missing `src/main.jsx`, check that GitHub's `esibha-frontend` repository contains `src/main.jsx` next to the `index.html` project root. Vercel's Root Directory must point to that same project root.

The ZIP also contains the frontend root configuration files for completeness; retain your existing hosting environment values. No backend push is required.

## Local preview

Keep the backend running with `npm start` in its own directory. In the main frontend folder, set `.env.local` to `VITE_API_URL=http://localhost:5000/api` and run `npm run dev`.

## Homepage changes

- Five photographic mood collections with live labels and working mood filters.
- Large Fragrance Finder banner with a working link.
- Journal cards with article links, date/category labels, gold ornaments and craft values.
- Locally bundled fonts and responsive desktop, tablet and phone layouts.

Assign product moods in the existing admin product editor to populate the collections. The visible Luxury collection uses the existing backend value `Luxurious`.

The earlier download was a partial update. This version includes the complete frontend folders to restore any files missing after a folder replacement.
