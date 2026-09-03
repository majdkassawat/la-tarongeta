import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted Lexend (src/fonts) so builds don't depend on Google Fonts
const lexend = localFont({
  src: "../fonts/lexend-latin-var.woff2",
  variable: "--font-lexend",
  weight: "100 900",
  display: "swap",
});

const SITE_URL = "https://yaqtin.net/la-tarongeta";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "La Tarongeta · Reserva la teva plaça",
  description:
    "Reserva una plaça per a la teva criatura a La Tarongeta, extraescolars creatives en anglès a Sant Andreu, Barcelona. Carrer de Castellbell, 12.",
  openGraph: {
    title: "La Tarongeta · Reserva la teva plaça",
    description:
      "Extraescolars creatives en anglès a Sant Andreu, Barcelona. Reserva fàcil i ràpida.",
    url: SITE_URL,
    siteName: "La Tarongeta",
    locale: "ca_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body className={`${lexend.variable} font-lexend antialiased`}>
        {children}
      </body>
    </html>
  );
}
