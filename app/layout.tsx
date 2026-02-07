import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CBSE Scholarship Test - Get 90% Scholarship',
  description:
    'Register for the All India CBSE Scholarship Test. Get up to 90% scholarship on online subscriptions. Free test for Class 6-12 and Foundation students.',
  keywords: 'scholarship, CBSE, test, education, students, discount',
  generator: 'v0.app',
  openGraph: {
    title: 'CBSE Scholarship Test - Get 90% Scholarship',
    description: 'Register for the All India CBSE Scholarship Test and get up to 90% scholarship',
    type: 'website',
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
