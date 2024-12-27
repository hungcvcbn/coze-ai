import React from "react";
import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/redux-provider";
import "./globals.scss";
import BasicToast from "@/components/common/BasicToast";
import Layout from "@/components/layout/Layout";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/helpers/config/theme";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
    <html lang="en" className={inter.className}>
      <head>
        <title>AI Agent</title>
        <link rel='icon' href={`/logo.png?v=${+new Date()}`} sizes='any' />
      </head>
      <body className='bg-neutral-100'>
        <ReduxProvider>
          <ThemeProvider theme={theme}>
            <Layout>
              {children}
            </Layout>
            <BasicToast />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
