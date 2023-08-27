import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
