# ATA Web Platform · Frontend

React frontend for the ATA Web Platform (shipments and invoices). This phase runs locally
with sample data only; the .NET backend will be connected later through `src/api/`.

## Requirements

- Node.js 20 or newer (with npm)

## Getting started

```bash
npm install
npm run dev
```

The app opens at http://localhost:5173.

## Scripts

| Script                 | What it does                       |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start the dev server               |
| `npm run build`        | Type-check and build to `dist/`    |
| `npm run preview`      | Serve the production build locally |
| `npm run lint`         | Lint with oxlint                   |
| `npm run format`       | Format all files with Prettier     |
| `npm run format:check` | Check formatting without writing   |

## Structure

```
public/logo.png
src/
  main.tsx, App.tsx               # entry point and routes
  styles/tokens.css               # colors and sizes from the mockups
  styles/global.css               # base styles
  app/AppLayout.tsx               # header, color stripe, main and footer
  components/                     # shared UI (Button, Card, Badge, ...)
  features/
    auth/LoginPage.tsx            # /login
    home/HomePage.tsx             # /
    gr-invoice/GrInvoicePage.tsx  # /gr-invoice
    not-found/NotFoundPage.tsx    # *
  api/                            # data layer (sample data now, .NET API later)
```

## Routes

| Path          | Page                |
| ------------- | ------------------- |
| `/login`      | Sign in             |
| `/`           | Home                |
| `/gr-invoice` | GR Invoice Template |
| `*`           | Not found           |
