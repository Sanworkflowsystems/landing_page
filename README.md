# Lumora.ai Landing Page - v2.0

This project is a premium, single-page landing page for Lumora.ai, built with a static HTML/CSS/JS stack and styled with TailwindCSS. This version is a complete refactor of the initial site to align with a more elegant, futuristic, and enterprise-grade design system.

## Project Structure

-   `/index.html`: The main and only HTML file.
-   `/dist/output.css`: The compiled and minified CSS file.
-   `/src/styles.css`: The source CSS file containing Tailwind directives and custom component styles.
-   `/src/main.js`: Contains all JavaScript for interactivity (mobile nav, FAQ, animations).
-   `/tailwind.config.js`: The TailwindCSS configuration file with the project's design system (colors, fonts, etc.).
-   `/assets/icons/`: Contains all SVG icons used throughout the site.

## How to View the Site

Since this is a static website, you can simply open the `index.html` file directly in your web browser.

For a more accurate experience that mimics a live web server, you can use a simple command-line server. If you have Node.js installed, you can use the `serve` package:

1.  Make sure you are in the `lumora-site` directory.
2.  Run the server:
    ```bash
    npx serve .
    ```
    This will host the site on a local port (e.g., `http://localhost:3000`).

## How to Build from Source

The project uses TailwindCSS for styling. To recompile the CSS after making changes to `tailwind.config.js` or `src/styles.css`, you need to run the build process.

**Note on Build Environment:** The standard `npm run build:css` script has proven unreliable in some shell environments. The most robust method is to run the command directly using the executable's full path.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run Build Command:**
    ```bash
    # Replace with the correct absolute path on your system if different
    C:\\Users\\Kush\\Desktop\\AiAutomationLandingPage\\Lumora_outreach_landing_page\\lumora-site\\node_modules\\.bin\\tailwindcss.cmd -i ./src/styles.css -o ./dist/output.css
    ```

## Content & Asset Replacement Guide

All placeholder content is marked with `<!-- TODO: ... -->` comments in `index.html`.

-   **Logo:** The logo is currently text-based. You can replace it with an SVG in the `<header>`.
-   **Icons:** All icons are professional SVGs located in `/assets/icons/`. They can be replaced or updated there.
-   **Portfolio:** The case studies are placeholders. Update the stats and descriptions in the `#portfolio` section.
-   **Partnerships:** The partner logos are placeholders using `brand-placeholder.svg`. Replace the `<img>` tags with your actual partner logos.
-   **Contact Form:** The form is cosmetic. To make it functional, you will need to integrate a backend service or a third-party form provider (e.g., Netlify Forms, Formspree).
-   **Calendly:** A `TODO` comment marks where a Calendly link or embed can be added for the "Book a Discovery Call" CTA.

---

### Visual QA Checklist (Summary of Changes)

-   [x] **No Emojis:** All emoji characters have been removed and replaced with professional SVGs.
-   [x] **Premium Typography:** The headline uses `Space Grotesk` with a gradient `accent-clip` effect. The type scale has been adjusted across breakpoints.
-   [x] **Glass Navbar:** The navigation bar is sticky with a `backdrop-filter` blur effect and a subtle bottom border. The CTA button has a new gradient and glow effect.
-   [x] **Upgraded Cards:** All info cards now use a consistent glass/gradient background, hover elevation, and contain SVG icons in a styled circle.
-   [x] **Partnerships Section:** The "Results" section has been replaced with a "Partnerships" grid containing 6 placeholder logo slots.
-   [x] **Accessible FAQ:** The FAQ section now uses a semantic `button` and `panel` structure with `aria-expanded` attributes, controllable via keyboard.
-   [x] **Performant Animations:** All reveal-on-scroll animations use a lightweight IntersectionObserver and respect `prefers-reduced-motion`.
-   [x] **Accessibility:** All images have `alt` text (or are marked as decorative), and interactive elements are keyboard-focusable.
-   [x] **Optimized Assets:** All icons are served as SVGs.
