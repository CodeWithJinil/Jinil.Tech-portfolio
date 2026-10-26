# JINIL.TECH — AI-Focused Developer Portfolio

A premium, futuristic personal portfolio website for Jinil Tailor — AI-focused Software Developer & Full-Stack Web Developer.

![Built with HTML, CSS, JS](https://img.shields.io/badge/Built%20With-HTML%20%7C%20CSS%20%7C%20JS-00E5FF?style=flat-square&logo=html5&logoColor=white)

## 🚀 Features

- **Futuristic Design System** — Near-black charcoal backgrounds, neon cyan/violet accents, glassmorphism cards
- **Animated Neural Network Sphere** — Hero section with orbiting nodes, connection lines, and floating tech labels
- **Particle Network Canvas** — Subtle connecting particles in the background
- **Interactive Skills Matrix** — Category-based filtering with animated transitions
- **Project Showcase** — 6 detailed project cards with filtering, modals, and custom thumbnails
- **Experience Timeline** — Elegant vertical timeline with glowing dots
- **Education & Certifications** — Clean cards with all academic credentials
- **Contact Form** — mailto-based form (no backend required)
- **Custom Cursor** — Desktop-only glow cursor with hover effects
- **Scroll Reveal Animations** — Elements animate in as you scroll
- **Fully Responsive** — Mobile, tablet, laptop, and desktop
- **Accessible** — Semantic HTML, keyboard navigation, focus indicators, reduced-motion support
- **SEO Optimized** — Meta tags, Open Graph, semantic headings

## 📁 Project Structure

```
├── index.html          # Main HTML (all sections)
├── index.css           # Complete CSS design system & styles
├── main.js             # All JavaScript interactions & animations
├── assets/
│   ├── favicon.svg     # JT monogram favicon
│   └── Jinil_Tailor_CV.pdf  # Your CV file (add your own)
└── README.md           # This file
```

## 🏃 Running Locally

This is a static website — no build step or dependencies required.

### Option 1: Direct File Open
Simply open `index.html` in any modern browser.

### Option 2: Local Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

Using Node.js (if installed):
```bash
npx serve .
```

Using VS Code:
- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## ✏️ Customization

### Colors
All colors are defined as CSS variables in `index.css`:
```css
:root {
  --bg-primary: #080B12;
  --accent-cyan: #00E5FF;
  --accent-violet: #8B5CF6;
  --text-primary: #F4F7FB;
  /* ... */
}
```

### Content
- Edit text directly in `index.html`
- Project details are in the `projectData` object in `main.js`
- Update links, descriptions, and metadata as needed

### CV Download
Replace `assets/Jinil_Tailor_CV.pdf` with your actual CV file. The download button in the hero section links to this path.

## 🌐 Deployment

### Netlify (Recommended)
1. Push to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Set build command to *empty* (static site)
4. Set publish directory to `/`
5. Deploy

### Vercel
1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Framework: Other
4. Deploy

### GitHub Pages
1. Go to repository Settings → Pages
2. Set source to `main` branch, root `/`
3. Save and wait for deployment

### Firebase Hosting
```bash
npx -y firebase-tools init hosting
npx -y firebase-tools deploy --only hosting
```

## 🔧 Technical Details

- **Zero Dependencies** — Pure HTML, CSS, and JavaScript
- **No Build Step** — Works directly in browser
- **Performance** — Lightweight particles, CSS animations, lazy effects
- **Accessibility** — `prefers-reduced-motion` support, ARIA labels, semantic HTML
- **Browser Support** — All modern browsers (Chrome, Firefox, Safari, Edge)

## 📝 Notes

- Add your real CV PDF as `assets/Jinil_Tailor_CV.pdf`
- Contact form uses `mailto:` — opens the user's email client
- For a backend contact form, integrate with Formspree, Netlify Forms, or similar
- All project links and social links point to your real profiles

---

Designed and built by **Jinil Tailor** — Building the future, one line of code at a time.
