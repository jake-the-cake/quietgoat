import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './_components/Navbar'
import { Footer } from './_components/Footer'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quiet Goat Blog',
  description: 'Step into my world of adventure and introspection! Join me on thrilling hikes, catch my take on running, dig into nutritious insights, and let\'s get our hands dirty in the world of gardening. It\'s a blog that\'s part trail, part prep, and all heart – where nature meets nurture meets fun!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative max-w-screen-lg flex flex-col flex-between page__wrapper">
        <Navbar />
          {children}
        <Footer />
        </div>
      </body>
    </html>
  )
}