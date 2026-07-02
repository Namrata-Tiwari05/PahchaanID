# Pahchaan ID — Next.js Project

This is the original single-file HTML prototype (Pahchaan ID — Smart Hotel
Guest Verification) converted into a standard Next.js project structure.

**No markup, styling, or logic was changed.** The original file was split
into the conventional locations a Next.js app expects:

```
pahchaan-id-nextjs/
├── pages/
│   ├── _app.js        → imports the global stylesheet
│   ├── _document.js   → sets <html lang="en">
│   └── index.js        → renders the original body markup + loads the script
├── lib/
│   └── markup.js       → the original <body>...</body> HTML, unmodified, as a string
├── styles/
│   └── globals.css     → the original <style>...</style> CSS, unmodified
├── public/
│   └── js/
│       └── app.js       → the original <script>...</script> JS, unmodified
├── package.json
├── next.config.js
└── .gitignore
```

Source mapping (exact, no edits):
- `<style>...</style>`  → `styles/globals.css`
- `<body>...</body>` (markup only, excluding the script) → `lib/markup.js` (exported string, rendered via `dangerouslySetInnerHTML`)
- `<script>...</script>` → `public/js/app.js` (loaded via `next/script`)

All screen IDs, classes, inline styles, emoji, copy, and the `goTo`,
`handleSignIn`, `setRole`, `toggleTag`, `adjustCount` functions behave
exactly as in the original prototype — this is a structural move only.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Production build

```bash
npm run build
npm run start
```

## Notes
- This is still a client-side "screen toggling" SPA (the same `goTo()` pattern
  as the original), now served through Next.js. It has not been refactored
  into React state/routing — that was intentionally avoided per the request
  to not modify the original behavior.
- The Google Font `@import` from the original `<style>` block is preserved
  as-is inside `globals.css`.
