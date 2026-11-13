import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import WalkingCat from "./components/WalkingCat";

const geistSans = localFont({
  src: "../public/fonts/geist.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = localFont({
  src: "../public/fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["monospace"],
});

const sacramento = localFont({
  src: "../public/font/Yellowtail-Regular.ttf",
  variable: "--font-sacramento",
  display: "swap",
  fallback: ["cursive"],
});

export const metadata = {
  metadataBase: new URL("https://ayaadel.design"),
  title: {
    default: "Aya Adel | Senior Graphic Designer & Brand Specialist",
    template: "%s | Aya Adel",
  },
  description:
    "Portfolio of Aya Adel - Senior Graphic Designer specializing in brand identity systems, luxury packaging, editorial layouts, and creative digital visuals.",
  keywords: [
    "Aya Adel",
    "آية عادل",
    "Graphic Designer",
    "Brand Identity Designer",
    "Packaging Design",
    "Adobe Illustrator",
    "Photoshop",
    "Figma",
    "InDesign",
    "Typography",
    "Social Media Design",
    "Creative Direction",
    "Ismailia Graphic Designer",
    "مصممة جرافيك الإسماعيلية",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  authors: [{ name: "Aya Adel", url: "https://ayaadel.design" }],
  creator: "Aya Adel",
  alternates: {
    canonical: "https://ayaadel.design",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayaadel.design",
    title: "Aya Adel | Senior Graphic Designer & Brand Specialist",
    description:
      "Crafting memorable brand identities, luxury packaging, and creative visual experiences.",
    siteName: "Aya Adel Portfolio",
    images: [
      {
        url: "/aya-adel.png",
        width: 935,
        height: 1024,
        alt: "Aya Adel - Senior Graphic Designer with Cats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aya Adel | Senior Graphic Designer",
    description:
      "Senior Graphic Designer & Brand Specialist crafting timeless visual identities and luxury packaging.",
    images: ["/aya-adel.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    google: "notranslate",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aya Adel",
  alternateName: "آية عادل",
  jobTitle: "Senior Graphic Designer & Brand Specialist",
  url: "https://ayaadel.design",
  image: "https://ayaadel.design/aya-adel.png",
  knowsAbout: [
    "Graphic Design",
    "Brand Identity Systems",
    "Packaging Design",
    "Adobe Creative Cloud",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Adobe InDesign",
    "Figma",
    "Typography",
    "Art Direction",
    "Print Pre-Press"
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="notranslate light" translate="no" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${sacramento.variable} antialiased bg-[#fff8fa] text-[#2d1b30]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Soft pastel floating background particles */}
        <ul className="background" aria-hidden="true">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <LanguageProvider>
          {children}
          {/* Walking Persian Cat traversing the screen every 30 seconds */}
          <WalkingCat
            intervalMs={30000}
            walkMs={12000}
            initialDelayMs={3000}
            size={145}
            bottom={14}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
