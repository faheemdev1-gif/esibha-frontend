# eSibha

React/Vite storefront and Express/MongoDB backend, with a complete admin workspace at `/admin`.

Read **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** for admin credentials, hosting variables, deployment steps and usage instructions.

- Frontend: `npm ci`, then `npm run dev` or `npm run build`.
- Frontend cart regression tests: `npm test`.
- Backend: run `npm ci` and `npm start` inside `backend/` after configuring its environment.
- Backend integration tests: run `npm test` inside `backend/`; they use a disposable test database.
- Admin credentials: `npm run admin:credentials` inside `backend/`.

Live secrets and installed dependencies are excluded from the source archive. Keep the existing database/email environment values when deploying.
