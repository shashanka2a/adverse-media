# AdVerse.media - Cinematic B2B Marketing

A production-level Next.js 15 application featuring cinematic B2B marketing with a film strip concept. Built with TypeScript, Tailwind CSS v3, GSAP animations, and Lenis smooth scrolling.

## Features

- 🎬 Cinematic horizontal scrolling experience
- 🎨 Custom cursor with hover interactions
- ✨ GSAP-powered animations and parallax effects
- 📱 Fully responsive design
- 🎯 SEO optimized with comprehensive meta tags
- 🎭 Film grain overlay and sprocket effects
- 🚀 Next.js 15 with App Router
- 💅 Tailwind CSS v3 with custom theme

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: GSAP with ScrollTrigger
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
adverse-media/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   ├── globals.css         # Global styles
│   ├── icon.svg            # Favicon (clapperboard icon)
│   └── favicon.svg         # Alternative favicon
├── components/
│   ├── CustomCursor.tsx    # Custom cursor component
│   ├── FilmGrain.tsx       # Film grain overlay
│   ├── Sprockets.tsx       # Film sprocket strips
│   ├── Countdown.tsx       # Hero countdown animation
│   └── ScrollAnimations.tsx # GSAP scroll animations
├── package.json
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## SEO Features

- Comprehensive meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured metadata
- Optimized viewport settings
- Canonical URLs

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  'film-black': '#050505',
  'celluloid-cream': '#F2E8D5',
  'red-carpet': '#D91E36',
  'silver-screen': '#E0E0E0',
  'charcoal': '#1A1A1A',
}
```

### Fonts

Fonts are configured in `app/layout.tsx` using Next.js font optimization:
- Playfair Display (display)
- Courier Prime (mono)
- Oswald (oswald)

## Build for Production

```bash
npm run build
npm start
```

## License

© 2025 ADVERSE MEDIA. FILM STRIP CONCEPT V2.

