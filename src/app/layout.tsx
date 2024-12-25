import React from "react";
import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/redux-provider";
import "./globals.scss";
import BasicToast from "@/components/common/BasicToast";
import Layout from "@/components/layout/Layout";

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
          <Layout>
            {children}
          </Layout>
          <BasicToast />
        </ReduxProvider>
      </body>
    </html>
  );
}
