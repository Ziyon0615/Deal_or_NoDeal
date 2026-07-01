import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deal or No Deal - Online Game',
  description: 'Play the modern Deal or No Deal game. Choose your boxes, make deals, and win big!',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-stone-100">
        {children}
      </body>
    </html>
  )
}
