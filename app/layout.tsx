import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { SITE_CONFIG } from "@/lib/config";
import { generateWebsiteSchema, generatePersonSchema } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.siteName,
    template: "%s | Sam",
  },
  description: SITE_CONFIG.siteDescription,
  keywords: ["blog", "software", "engineering", "AI", "tech"],
  authors: [
    {
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.siteUrl,
    },
  ],
  creator: SITE_CONFIG.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.siteName,
    title: SITE_CONFIG.siteName,
    description: SITE_CONFIG.siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.siteName,
    description: SITE_CONFIG.siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebsiteSchema();
  const personSchema = generatePersonSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          defer
          src="https://umami-csps.vercel.app/script.js"
          data-website-id="d5c57d5d-5903-4fbc-a51b-c3a1051ae78f"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
