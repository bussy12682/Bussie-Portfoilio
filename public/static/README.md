# Static (HTML/CSS/JS) Version

A dependency-free copy of the portfolio, visually and functionally identical to the React version.

## Files
- `index.html` – markup and SEO metadata
- `styles.css` – design tokens, layout, responsive rules, mobile menu animation
- `script.js` – data, render, scroll reveals, mobile hamburger
- `assets/` – images (profile + 3 projects)

## Run locally
Just open `index.html` in a browser, or serve the folder:

```bash
npx serve public/static
# or
python3 -m http.server -d public/static 5500
```

## Live (via this app)
When the app is published, the static site is served at `/static/`.
