import React from "react";
import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/redux-provider";
import "./globals.scss";
import LayoutFooter from "@/components/layout/LayoutFooter";
import LayoutHeader from "../components/layout/LayoutHeader";
import BasicToast from "@/components/common/BasicToast";
export const metadata: Metadata = {
  title: "AI Agent",
  description: "AI Agent",
  icons: `/logo.png?v=${+new Date()}`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>AI Agent</title>
        <link rel='icon' href={`/logo.png?v=${+new Date()}`} sizes='any' />
      </head>
      <body className='bg-neutral-100'>
        <ReduxProvider>
          <LayoutHeader />
          {children}
          <LayoutFooter />
          <BasicToast />
        </ReduxProvider>
      </body>
    </html>
  );
}
