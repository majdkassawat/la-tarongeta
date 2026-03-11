import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "La Tarongeta · Reserva tu plaza",
  description:
    "Reserva una plaza para tu peque en La Tarongeta, espacio creativo para niños en Sant Andreu, Barcelona.",
  openGraph: {
    title: "La Tarongeta · Reserva tu plaza",
    description:
      "Espacio creativo para niños en Sant Andreu, Barcelona. Reserva fácil y rápida.",
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
      <body className={`${nunito.variable} font-nunito antialiased`}>
        {children}
      </body>
    </html>
  );
}
