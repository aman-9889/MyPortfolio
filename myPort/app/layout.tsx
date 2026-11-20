import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Aman Sahani — Full Stack Developer',
  description:
    'Portfolio of Aman Sahani, a Full Stack Developer building fast, scalable web apps with .NET, React and SQL.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#110f1c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.VERCEL === '1' && <Analytics />}
        <Script
          defer
          data-site="0C5C4A3F-7664-47AD-83A9-04FDE90EAC29"
          src="//traffnext.sysfolabs.com/api/tracker.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
