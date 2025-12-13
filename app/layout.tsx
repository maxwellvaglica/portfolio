import type { Metadata, Viewport } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import NetworkBackground from '@/components/ui/network-background'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://nim-fawn.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Maxwell Vaglica - Computational Biologist',
    template: '%s | Maxwell Vaglica',
  },
  description:
    'Programmer with expertise in Python, cloud computing, SQL, and machine learning.',
}

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${robotoMono.variable} bg-zinc-950 tracking-tight text-zinc-400 antialiased`}
      >
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
        >
          <NetworkBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
