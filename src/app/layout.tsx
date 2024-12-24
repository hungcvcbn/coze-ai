import React from 'react'
import type { Metadata } from 'next'
import { ReduxProvider } from '@/redux/redux-provider'
import './globals.scss'

export const metadata: Metadata = {
  title: 'AI Agent',
  description: 'AI Agent',
  icons: `/logo.png?v=${+new Date()}`
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const session = await getServerSession(authOptions as any)
  return (
    <html lang="en">
      <head>
        <title>AI Agent</title>
        <link rel="icon" href={`/logo.png?v=${+new Date()}`} sizes="any" />
      </head>
      <body className="bg-neutral-100">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
