import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (src/fonts) so builds don't depend on Google Fonts at compile time
const nunito = localFont({
  src: "../fonts/nunito-latin-var.woff2",
  variable: "--font-nunito",
  weight: "400 900",
  display: "swap",
});

const patrickHand = localFont({
  src: "../fonts/patrick-hand-latin.woff2",
  variable: "--font-hand",
  weight: "400",
  display: "swap",
});

const chewy = localFont({
  src: "../fonts/chewy-latin.woff2",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const SITE_URL = "https://yaqtin.net/la-tarongeta";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "La Tarongeta · Espacio creativo en inglés para niños",
    template: "%s · La Tarongeta",
  },
  description:
    "La Tarongeta es un espacio creativo sin pantallas en Sant Andreu, Barcelona: arte, juego e inglés en un ambiente relajado y natural. ¡Abrimos en septiembre!",
  openGraph: {
    title: "La Tarongeta · Espacio creativo en inglés para niños",
    description:
      "Espacio creativo sin pantallas en Sant Andreu, Barcelona: arte, juego e inglés en un ambiente relajado y natural.",
    url: SITE_URL,
    siteName: "La Tarongeta",
    images: [
      {
        url: `${SITE_URL}/og.jpg`,
        width: 1200,
        height: 630,
        alt: "El cartel de La Tarongeta: coming soon, abrimos en septiembre",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${nunito.variable} ${patrickHand.variable} ${chewy.variable} font-nunito antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
