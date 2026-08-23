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
    default: "La Tarongeta · Extraescolares creativas en inglés",
    template: "%s · La Tarongeta",
  },
  description:
    "La Tarongeta: extraescolares creativas en inglés en Sant Andreu, Barcelona. Talleres de arte basados en el proceso para niños y niñas curiosos de 3 a 10 años. ¡Abrimos en septiembre!",
  openGraph: {
    title: "La Tarongeta · Extraescolares creativas en inglés",
    description:
      "Extraescolares creativas en inglés en Sant Andreu, Barcelona: arte y lenguaje para peques de 3 a 10 años, en un ambiente relajado y natural.",
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
