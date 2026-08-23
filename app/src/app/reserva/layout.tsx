import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserva tu plaza",
  description:
    "Reserva una plaza para tu peque en La Tarongeta, espacio creativo en inglés en Sant Andreu, Barcelona. Reserva fácil con Bizum y confirmación por WhatsApp.",
};

export default function ReservaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
