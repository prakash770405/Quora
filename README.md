# quora

A minimal Express.js + EJS learning app that demonstrates a basic in-memory posts CRUD (create, read, update, delete). It's designed for learning Express routing, EJS templating, method-override for PATCH/DELETE, and serving static assets.

## Table of contents

- Prerequisites
- Install
- Run
- Project structure
- Routes
- Views & static assets
- Notes & caveats
- Future improvements makdown

## Prerequisites

- Node.js (v14+ recommended)
- npm (bundled with Node.js)

## Install

From the project root (where `package.json` is located) run:

```powershell
npm install
```

## Run

Start the server with:

```powershell
node index.js
```

By default the app listens on port `8080`. Open your browser to:

http://localhost:8080/post

Developer tip: use `nodemon` for auto-restarts during development:

```powershell
npm i -g nodemon
nodemon index.js
```

Or add these scripts to `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

## Project structure

- `index.js` — Express app, route handlers, and the in-memory `posts` array.
- `package.json` — dependency manifest.
- `views/` — EJS templates used by the app (`index.ejs`, `new.ejs`, `edit.ejs`, `detail.ejs`).
- `public/` — static assets (CSS) served by Express.

## Routes

The app exposes the following routes (implemented in `index.js`):

- GET `/post` — list all posts (renders `views/index.ejs`).
- GET `/post/new` — show form to create a new post (renders `views/new.ejs`).
- POST `/post` — create a new post and redirect to `/post`.
- GET `/post/:id` — show details for a single post (renders `views/detail.ejs`).
- GET `/post/:id/edit` — show an edit form for the post (renders `views/edit.ejs`).
- PATCH `/post/:id/edit` — update the post (the form uses `method-override` to submit a PATCH).
- DELETE `/post/:id` — delete the post (the form uses `method-override` to submit a DELETE).

Note: forms that perform PATCH/DELETE rely on `method-override` (look for `_method` in the HTML form). The server uses `uuid` to generate unique IDs for posts.

## Views & static assets

- EJS templates are located in `views/` and are rendered using `app.set('view engine', 'ejs')`.
- Static files (CSS) are served from the `public/` folder via `app.use(express.static('public'))`.

## Notes & caveats

- Data persistence: posts are stored in an in-memory array (`posts`) inside `index.js`. All data is lost when the server restarts — this is intended for demonstration only.
- No validation or sanitization is performed on user input. Do not use this code as-is in production.
- There is no authentication or authorization.

## Future improvements

- Add a persistent datastore (SQLite, MongoDB, or `lowdb`) so data survives restarts.
- Add server-side validation and sanitize user input to prevent XSS.
- Add a `start`/`dev` script to `package.json` (example above).
- Add unit/integration tests and linting (ESLint).
- Improve UI and add basic accessibility checks in the EJS views.

---
