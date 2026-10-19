# Homepage design update

This update recreates the three supplied designs on the existing homepage:

- **Discover by Feeling:** five photographic mood collections with live text, icons, and Explore links.
- **Fragrance Finder:** a large cream-and-gold banner using the supplied eSibha bottle photography, a working Finder link, and the three service steps.
- **Stories & Craft:** photographic journal cards, category/date labels, gold ornaments, working article links, and the four craft values.

The sections adapt to desktop, tablet, and phone sizes. Fonts are included locally with their licenses. Photography comes from the supplied references; headings, buttons, descriptions, metadata, and icons are HTML/SVG.

## Apply to your existing frontend repository

1. Extract `esibha-frontend-update.zip`.
2. **Merge** the update's `src/` and `public/` folders into the matching folders in your existing main `esibha` project. Replace the matching files when asked. Copy the files into your current repository rather than replacing the whole project folder.
3. Keep your current `.git`, `.env`, and `backend/` folders in place. This update contains no backend files or environment changes.
4. From the main frontend project folder, run:

```bash
npm run build
```

No new npm packages are required. The update uses the dependencies already in the project.

## Push the frontend

From your main `esibha` folder, which uses `esibha-frontend.git`:

```bash
git add src/pages/HomePage.jsx src/pages/ShopPage.jsx src/components/home public/images/home public/fonts
git commit -m "Redesign homepage mood, finder and journal sections"
git push
```

Wait for Vercel's frontend deployment to finish, then reload the homepage. No backend push or admin credential changes are required for this update.

## Mood collections

The Explore links filter the shop using the saved product **Mood** field from the admin panel. For example, Fresh shows products with mood `Fresh`. The visible Luxury card uses the backend's existing `Luxurious` value. Set these moods in the product editor if a collection is empty. A Clear mood link on the shop removes only the mood filter.

## Included files

- `src/pages/HomePage.jsx`
- `src/pages/ShopPage.jsx`
- `src/components/home/EditorialSections.jsx`
- `src/components/home/editorial-sections.css`
- `public/images/home/` — three supplied photography sources
- `public/fonts/` — four font files and two licenses

## Validation

- Production build and frontend cart regression tests.
- Browser checks for all five mood links, filtered results, Luxury mapping, clearing the filter, the Finder button, all three article links, and All Posts navigation.
- Layout and image loading checked at 1600, 1280, 1024, 768, 390, and 360 pixels wide.

The ZIP is a source update; it has not been pushed to your GitHub repository or deployed to your website.
