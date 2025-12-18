# Sapiens Solutions Website

A modern, minimalist website built with Next.js, TypeScript, and a centralized design system.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. **Downloaded and installed Josefin Sans font:**

   The website uses Josefin Sans, which is self-hosted. 

3. Copy images from the old site:
```bash
# Copy images directory to public
cp -r images public/
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
 ├─ app/                    # Next.js App Router pages
 │  ├─ layout.tsx          # Root layout
 │  ├─ page.tsx            # Home page
 │  ├─ services/           # Services page
 │  ├─ about/              # About page
 │  ├─ open-source/        # Open Source page
 │  └─ contact/            # Contact page
 ├─ components/            # React components
 │  ├─ Navbar/            # Navigation component
 │  └─ Footer/            # Footer component
 ├─ design-system/        # Design tokens (TypeScript)
 │  └─ tokens/            # Color, typography, spacing, etc.
 └─ styles/               # Global styles
    ├─ globals.scss       # Global stylesheet
    ├─ reset.scss         # CSS reset
    └─ tokens.scss        # SCSS design tokens
```

## Design System

The project uses a centralized design system with tokens for:

- **Colors**: Primary blue (#4696e5), secondary dark blue, neutral greys
- **Typography**: Josefin Sans font family
- **Spacing**: 4px base unit system
- **Motion**: Durations and easings
- **Shadows**: Subtle depth system
- **Radii**: Border radius scale
- **Z-index**: Layering system

All tokens are defined in `src/design-system/tokens/` and can be imported in both TypeScript and SCSS.

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **SCSS Modules**
- **React 18** (Functional components only)
- No UI frameworks - custom components only

## Pages

- `/` - Home page
- `/services` - Services overview
- `/about` - About us
- `/open-source` - Open source contributions
- `/contact` - Contact form

## Features

- **Responsive Design**: Mobile-first approach
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Optimized images, code splitting
- **Animations**: Subtle, premium motion (respects prefers-reduced-motion)
- **Modern UI**: Clean, minimalist design

## Deployment

```bash
npm run build
npm start
```

## License

See LICENSE.txt for details.
