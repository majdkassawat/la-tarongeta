import type { Metadata } from "next";
import Link from "next/link";
import TarongetaMascot from "@/components/TarongetaMascot";
import { asset } from "@/config/site";

export const metadata: Metadata = {
  title: "Descargas",
  description:
    "Descarga el código QR de La Tarongeta en distintos estilos y formatos, listo para imprimir en carteles, etiquetas y flyers.",
};

type QrVariant = {
  file: string;
  title: string;
  desc: string;
  /** background used behind the preview so transparency reads correctly */
  preview: "white" | "checker" | "dark" | "cardboard";
};

const VARIANTS: QrVariant[] = [
  {
    file: "qr-tinta-mascota-blanco.png",
    title: "Tinta con mascota",
    desc: "El QR de la marca: módulos redondeados color tinta con la naranjita en el centro, sobre blanco.",
    preview: "white",
  },
  {
    file: "qr-clasico-negro.png",
    title: "Clásico negro",
    desc: "Máxima compatibilidad: módulos cuadrados negros sobre blanco, sin adornos.",
    preview: "white",
  },
  {
    file: "qr-tinta-mascota-transparente.png",
    title: "Con mascota · fondo transparente",
    desc: "Sin fondo, para colocar sobre superficies claras: papel kraft, cartón, carteles.",
    preview: "checker",
  },
  {
    file: "qr-tinta-transparente.png",
    title: "Sin mascota · fondo transparente",
    desc: "La versión más sobria, sin fondo, para materiales claros.",
    preview: "checker",
  },
  {
    file: "qr-naranja-blanco.png",
    title: "Naranja",
    desc: "Módulos en naranja oscuro con la mascota, sobre blanco.",
    preview: "white",
  },
  {
    file: "qr-puntos-negro.png",
    title: "Puntitos",
    desc: "Módulos circulares tipo confeti, con la mascota, sobre blanco.",
    preview: "white",
  },
  {
    file: "qr-crema-sobre-tinta.png",
    title: "Crema sobre tinta",
    desc: "Versión oscura autocontenida: módulos crema sobre fondo color tinta.",
    preview: "white",
  },
  {
    file: "qr-crema-fondos-oscuros.png",
    title: "Crema · para fondos oscuros",
    desc: "Módulos crema sin fondo. Úsalo solo sobre superficies oscuras.",
    preview: "dark",
  },
  {
    file: "qr-cartel-carton.png",
    title: "Mini cartel de cartón",
    desc: "Cartel listo para imprimir y colgar, con el estilo del cartel original.",
    preview: "cardboard",
  },
  {
    file: "qr-etiqueta-url.png",
    title: "Etiqueta con URL",
    desc: "Con la dirección escrita debajo, para quien prefiera teclearla.",
    preview: "white",
  },
];

const PREVIEW_BG: Record<QrVariant["preview"], string> = {
  white: "bg-white",
  checker: "checker",
  dark: "bg-[#3b3229]",
  cardboard: "bg-[#c9a36a]",
};

export default function DescargasPage() {
  return (
    <div className="min-h-screen">
      <header className="max-w-5xl mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-orange-700 hover:text-orange-800 transition-colors"
        >
          ← Volver a la portada
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-20">
        <div className="flex items-center gap-4 mt-6 mb-3">
          <TarongetaMascot className="w-14 h-14" />
          <h1 className="font-display text-3xl sm:text-4xl">
            <span className="doodle-underline">Descargas</span>
          </h1>
        </div>
        <p className="max-w-2xl leading-relaxed mb-4">
          El código QR de La Tarongeta en distintos estilos, siempre apuntando a{" "}
          <strong>yaqtin.net/la-tarongeta</strong>. Todos están comprobados y en
          alta resolución, listos para imprimir. Deja siempre un margen blanco
          alrededor del código para que se pueda escanear bien.
        </p>
        <a
          href={asset("/qr/la-tarongeta-qr-pack.zip")}
          download
          className="inline-block bg-orange-700 hover:bg-orange-800 text-white font-bold px-5 py-3 rounded-2xl shadow-md transition-colors mb-10"
        >
          ⬇ Descargar todo (.zip)
        </a>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
          {VARIANTS.map((v, i) => (
            <li
              key={v.file}
              className={`paper-note ${i % 2 === 0 ? "tilt-l2" : "tilt-r2"} p-4 flex flex-col`}
            >
              <div
                className={`${PREVIEW_BG[v.preview]} rounded-md p-3 flex items-center justify-center`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(`/qr/${v.file}`)}
                  alt={`Código QR de La Tarongeta, variante «${v.title}»`}
                  loading="lazy"
                  className="w-full max-w-[240px] h-auto"
                />
              </div>
              <h2 className="font-display text-lg text-orange-700 mt-3">
                {v.title}
              </h2>
              <p className="text-sm leading-relaxed text-[#5b4632] mt-1 mb-4 flex-1">
                {v.desc}
              </p>
              <a
                href={asset(`/qr/${v.file}`)}
                download
                className="self-start bg-orange-700 hover:bg-orange-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
              >
                ⬇ Descargar PNG
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
