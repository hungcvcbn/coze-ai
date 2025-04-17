import React from "react";
import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/redux-provider";
import "./globals.scss";
import BasicToast from "@/components/common/BasicToast";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/helpers/config/theme";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CheckAuth from "@/components/auth/CheckAuth";
import "./landing.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenee AI",
  description: "Zenee AI",
  icons: `/logo.svg?v=${+new Date()}`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${inter.className} ${jetbrains.variable}`}>
      <head>
        <title>Zenee AI</title>
        <link rel='icon' href={`/logo.svg?v=${+new Date()}`} sizes='any' />
      </head>
      <body className='bg-neutral-100'>
        <GoogleOAuthProvider
          clientId={
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
            "194724921997-nmoqict0q0f9qg1nosvssuk562io8q8o.apps.googleusercontent.com"
          }
        >
          <ReduxProvider>
            <CheckAuth>
              <ThemeProvider theme={theme}>
                {children}
                <BasicToast />
              </ThemeProvider>
            </CheckAuth>
          </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
