import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="//my.spline.design" />
        <link rel="preconnect" href="https://my.spline.design" />
      </head>
      <body>{children}</body>
    </html>
  )
}
