import type { Metadata, Viewport } from 'next'
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
  title: 'AdVerse.media | AI-Powered Cinematic Video Production',
  description: 'Transform your B-roll footage into cinematic marketing videos with AI. We leverage AI to create professional videos with voiceovers, AI avatars, and Hollywood-grade aesthetics.',
  keywords: ['AI video production', 'B-roll to cinematic', 'AI voiceover', 'AI avatars', 'cinematic video conversion', 'automated video editing', 'AI marketing videos', 'video production AI'],
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
    title: 'AdVerse.media | AI-Powered Cinematic Video Production',
    description: 'Transform your B-roll footage into cinematic marketing videos with AI. Professional voiceovers, AI avatars, and Hollywood-grade aesthetics.',
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
    title: 'AdVerse.media | AI-Powered Cinematic Video Production',
    description: 'Transform your B-roll footage into cinematic marketing videos with AI. Professional voiceovers, AI avatars, and Hollywood-grade aesthetics.',
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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

