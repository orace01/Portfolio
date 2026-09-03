import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orace Honfin — Ingénieur Logiciel Fullstack",
  description:
    "Ingénieur logiciel fullstack, conception de produits web & mobile de bout en bout. Co-fondateur chez Webspace. Portfolio d'Orace Honfin.",
  metadataBase: new URL("https://oracehonfin.dev"),
  openGraph: {
    title: "Orace Honfin — Ingénieur Logiciel Fullstack",
    description:
      "Ingénieur logiciel fullstack, conception de produits web & mobile de bout en bout. Co-fondateur chez Webspace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#030712] font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
