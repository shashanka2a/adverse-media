import type { Metadata } from 'next'
import { Playfair_Display, Courier_Prime, Oswald } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/CustomCursor'
import { FilmGrain } from '@/components/FilmGrain'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: 'AdVerse.media | Cinematic B2B Marketing',
  description: 'Stop making "content". Start making cinema. We apply French New Wave aesthetics to SaaS, Fintech, and Enterprise storytelling. Raw, honest, and impossible to ignore.',
  keywords: ['B2B marketing', 'cinematic video production', 'SaaS marketing', 'Fintech marketing', 'enterprise storytelling', 'video production', 'creative agency', 'Los Angeles'],
  authors: [{ name: 'AdVerse Media' }],
  creator: 'AdVerse Media',
  publisher: 'AdVerse Media',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://adverse.media'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AdVerse.media | Cinematic B2B Marketing',
    description: 'Stop making "content". Start making cinema. We apply French New Wave aesthetics to SaaS, Fintech, and Enterprise storytelling.',
    url: 'https://adverse.media',
    siteName: 'AdVerse Media',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AdVerse Media - Cinematic B2B Marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AdVerse.media | Cinematic B2B Marketing',
    description: 'Stop making "content". Start making cinema. We apply French New Wave aesthetics to SaaS, Fintech, and Enterprise storytelling.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${courierPrime.variable} ${oswald.variable}`}>
      <body className="bg-film-black text-silver-screen antialiased">
        <CustomCursor />
        <FilmGrain />
        {children}
      </body>
    </html>
  )
}

