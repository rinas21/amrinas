# A.M. Rinas Portfolio

A static HTML/CSS/JS personal portfolio website for A.M. Rinas, a Software Engineer and Full-Stack Developer.

## Project Structure

```
/
├── index.html          # Main portfolio page (single-page app)
├── files/
│   ├── style.css       # All styles (dark theme, animations, responsive)
│   └── script.js       # GSAP animations, Typed.js, hamburger menu
└── img/
    ├── myself.png      # Hero section photo
    └── myself2.png     # About section photo
```

## Tech Stack

- Pure HTML5, CSS3, JavaScript (no build system)
- **GSAP + ScrollTrigger** — scroll-based animations
- **Typed.js** — text typing animation in hero
- **Shields.io** — tech stack badge images (loaded from CDN)
- **Boxicons + Font Awesome** — icon libraries
- **Poppins** font from Google Fonts
- Served via Python's built-in `http.server` on port 5000

## Sections

1. **Home** — Hero with typed animation and profile photo
2. **About** — Bio with GSAP slide-in animation
3. **Skills / Tech Stack** — Shields.io badges grouped by category (Languages, Databases, DevOps, Data Engineering, QA, Tools)
4. **Experience** — Professional timeline (Wincore Solutions, hSenid SE, hSenid QA)
5. **Projects** — Card grid of 7 projects
6. **Services** — 7 service cards
7. **Contact** — Social/contact icon links

## Design

- **Color palette**: Deep black (#080808) bg, warm amber (#F2A85F) accent, terminal green (#39D353) for dates
- **Responsive**: Desktop nav (>1080px), hamburger slide-in panel (≤1080px), mobile optimized (≤600px)
- **Animations**: CSS animations on hero/nav load, GSAP ScrollTrigger for all other sections

## Running

Workflow: `python3 -m http.server 5000 --bind 0.0.0.0`
Deployment: configured as static site with `publicDir: "."`
