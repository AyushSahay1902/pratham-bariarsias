import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Pratham - GS Foundation Course Scholarship Test | Bariar's IAS Academy",
    template: "%s | Bariar's IAS Academy",
  },
  description:
    "Pratham Scholarship Test by Bariar's IAS Academy. Register for the GS Foundation Course and get up to 70% merit-based scholarship. Free test for UPSC aspirants preparing for 2027.",
  keywords: [
    'UPSC scholarship',
    'GS foundation',
    'Pratham scholarship test',
    'Bariar\'s IAS',
    'UPSC coaching',
    'Civil Services exam',
    'Free scholarship test',
  ],
  generator: 'v0.app',
  metadataBase: new URL('https://www.bariarsias.com'),
  openGraph: {
    title: "Pratham - GS Foundation Course Scholarship Test | Bariar's IAS Academy",
    description:
      "Pratham Scholarship Test by Bariar's IAS Academy. Register for the GS Foundation Course and get up to 70% merit-based scholarship.",
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
