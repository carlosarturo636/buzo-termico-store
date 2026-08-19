import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { MetaPixel } from "@/components/MetaPixel";
import { MufasaIntro } from "@/components/MufasaIntro";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Mufasa | Buzo térmico tipo saco-cobija",
  description: "Comodidad envolvente para disfrutar los días fríos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" href="/media/hoodie-360-intro-poster.webp" as="image" type="image/webp" />
      </head>
      <body className={`${manrope.variable} ${playfair.variable}`}>
        <Script id="mufasa-intro-session" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("mufasa-intro-seen")==="true")document.documentElement.classList.add("mufasa-intro-seen")}catch{}`}
        </Script>
        <MufasaIntro />
        <Suspense fallback={null}>{children}</Suspense>
        <MetaPixel />
      </body>
    </html>
  );
}
