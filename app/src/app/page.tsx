import Image from "next/image";
import Link from "next/link";
import TarongetaMascot from "@/components/TarongetaMascot";
import { SCHEDULE_SLOTS } from "@/config/schedule";
import { BIZUM_CONFIG } from "@/config/bizum";
import { asset } from "@/config/site";

const WHATSAPP_URL = `https://wa.me/${BIZUM_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "¡Hola! Me gustaría saber más sobre La Tarongeta 🍊"
)}`;

// Fixed per-letter tilts so the title looks hand-cut, like the sign.
// Letters are grouped per word so lines can only break at the word gap.
const TITLE_WORDS: { ch: string; tilt: number; lift: number }[][] = [
  [
    { ch: "L", tilt: -5, lift: 0 },
    { ch: "A", tilt: 4, lift: 2 },
  ],
  [
    { ch: "T", tilt: -3, lift: -2 },
    { ch: "A", tilt: 5, lift: 1 },
    { ch: "R", tilt: -4, lift: 3 },
    { ch: "O", tilt: 3, lift: -1 },
    { ch: "N", tilt: -2, lift: 2 },
    { ch: "G", tilt: 5, lift: -2 },
    { ch: "E", tilt: -5, lift: 1 },
    { ch: "T", tilt: 3, lift: -1 },
    { ch: "A", tilt: -3, lift: 2 },
  ],
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <PosterNotes />
        <Activities />
        <Schedule />
        <HowItWorks />
        <Visit />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ── Header ──────────────────────────────────────────────────────────── */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#faf3e3]/95 backdrop-blur border-b border-orange-200/60">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <TarongetaMascot className="w-9 h-9" />
          <Image
            src={asset("/logo.jpg")}
            alt="La Tarongeta"
            width={150}
            height={44}
            className="object-contain mix-blend-multiply hidden sm:block"
          />
        </Link>
        <nav aria-label="Secciones" className="hidden md:flex items-center gap-6 text-sm font-bold text-[#3b3229]">
          <a href="#espacio" className="hover:text-orange-600 transition-colors">
            El espacio
          </a>
          <a href="#actividades" className="hover:text-orange-600 transition-colors">
            Actividades
          </a>
          <a href="#horarios" className="hover:text-orange-600 transition-colors">
            Horarios
          </a>
          <a href="#donde" className="hover:text-orange-600 transition-colors">
            Dónde
          </a>
        </nav>
        <Link
          href="/reserva"
          className="bg-orange-700 hover:bg-orange-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition-colors"
        >
          Reservar plaza
        </Link>
      </div>
    </header>
  );
}

/* ── Hero: the cardboard sign, recreated ─────────────────────────────── */

function Hero() {
  return (
    <section className="shutter relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20 flex justify-center">
        <div className="cardboard relative w-full max-w-3xl px-5 py-10 sm:px-12 sm:py-14 -rotate-1">
          {/* packing tape on the corners */}
          <div aria-hidden className="tape absolute -top-4 -left-6 w-28 h-8 -rotate-45" />
          <div aria-hidden className="tape absolute -top-4 -right-6 w-28 h-8 rotate-45" />

          {/* COMING SOON strip */}
          <div className="paper-note tilt-l inline-block px-3 sm:px-4 py-1.5">
            <p className="font-hand text-base sm:text-xl tracking-[0.18em] sm:tracking-[0.25em] uppercase whitespace-nowrap">
              Coming soon · Muy pronto
            </p>
          </div>

          {/* handwritten opening note */}
          <p className="font-hand text-lg sm:text-xl text-[#3b3229] mt-3 sm:mt-0 sm:absolute sm:right-10 sm:top-6 rotate-2 sm:text-right leading-tight">
            ¡abrimos en<span className="hidden sm:inline"><br /></span>
            <span className="sm:hidden"> </span>septiembre!
          </p>

          {/* title with the mascot doodled next to it */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-5 flex-wrap">
            <h1 className="font-display text-4xl min-[420px]:text-5xl sm:text-7xl leading-none select-none">
              <span className="sr-only">La Tarongeta</span>
              <span aria-hidden className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-5">
                {TITLE_WORDS.map((word, w) => (
                  <span key={w} className="inline-flex">
                    {word.map((l, i) => (
                      <span
                        key={i}
                        className="sticker-letter"
                        style={{ transform: `rotate(${l.tilt}deg) translateY(${l.lift}px)` }}
                      >
                        {l.ch}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>
            <TarongetaMascot className="mascot-bob w-16 sm:w-28 shrink-0" />
          </div>

          {/* subtitle note */}
          <div className="paper-note tilt-r max-w-md mt-8 sm:mt-10 px-5 py-4">
            <p className="font-hand text-xl sm:text-2xl leading-snug">
              Un espacio creativo <strong>sin pantallas</strong> para explorar
              el arte y el inglés en un ambiente relajado, natural y en
              familia.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/reserva"
              className="bg-orange-700 hover:bg-orange-800 active:scale-[0.98] text-white font-bold text-base sm:text-lg px-6 py-3.5 rounded-2xl shadow-md transition-all"
            >
              Reservar plaza →
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-note hover:brightness-95 font-bold text-base px-5 py-3.5 transition-all"
            >
              💬 Escríbenos por WhatsApp
            </a>
          </div>

          <p className="mt-6 font-hand text-lg text-[#3b3229]">
            📍 Sant Andreu, Barcelona
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── The four taped notes from the sign ──────────────────────────────── */

function PosterNotes() {
  return (
    <section id="espacio" className="scroll-mt-20 max-w-6xl mx-auto px-4 py-16 sm:py-24">
      <h2 className="font-display text-3xl sm:text-4xl text-center mb-12">
        <span className="doodle-underline">¿Qué es La Tarongeta?</span>
      </h2>

      <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
        <div className="grid sm:grid-cols-2 gap-5">
          <PosterNote>
            A screen-free creative space where kids can explore art and
            English in a relaxed, natural, English-speaking environment.
          </PosterNote>
          <PosterNote yellow tiltClass="tilt-r">
            Un espacio creativo sin pantallas donde los peques exploran el
            arte y el inglés en un ambiente relajado, natural y cercano.
          </PosterNote>
          <PosterNote tiltClass="tilt-r2">
            Grupos reducidos acompañados con cariño: pintura, manualidades,
            cuentos y mucho juego con materiales naturales.
          </PosterNote>
          <PosterNote yellow tiltClass="tilt-l2">
            Tardes de lunes, miércoles y viernes en Sant Andreu. Reserva
            fácil con Bizum y confirmación por WhatsApp.
          </PosterNote>
        </div>

        {/* the original sign, polaroid-style */}
        <figure className="justify-self-center rotate-2 bg-white p-3 pb-4 shadow-xl rounded-sm max-w-[240px]">
          <Image
            src={asset("/poster.jpg")}
            alt="El cartel original de La Tarongeta, hecho a mano con cartón, colgado en la persiana del local"
            width={720}
            height={994}
            className="rounded-sm"
          />
          <figcaption className="font-hand text-center text-base mt-2 leading-tight">
            Todo empezó con un cartel de cartón 🧡
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function PosterNote({
  children,
  yellow = false,
  tiltClass = "tilt-l",
}: {
  children: React.ReactNode;
  yellow?: boolean;
  tiltClass?: string;
}) {
  return (
    <div
      className={`paper-note ${yellow ? "paper-note--yellow" : ""} ${tiltClass} relative px-5 py-5`}
    >
      <div aria-hidden className="tape absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rotate-2" />
      <p className="font-hand text-lg sm:text-xl leading-snug">{children}</p>
    </div>
  );
}

/* ── Activities ──────────────────────────────────────────────────────── */

const ACTIVITIES = [
  {
    emoji: "🎨",
    title: "Arte y manualidades",
    text: "Pintura, collage, barro y tijeras: manos ocupadas y cabezas imaginando.",
  },
  {
    emoji: "🗣️",
    title: "Inglés de forma natural",
    text: "El inglés se vive jugando, cantando y creando, sin fichas ni exámenes.",
  },
  {
    emoji: "🌿",
    title: "Juego sin pantallas",
    text: "Materiales naturales, juego libre y tiempo sin prisas ni móviles.",
  },
  {
    emoji: "🧡",
    title: "Grupos pequeños",
    text: "Plazas limitadas por grupo para acompañar a cada peque con calma.",
  },
];

function Activities() {
  return (
    <section id="actividades" className="scroll-mt-20 bg-orange-100/50 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-3xl sm:text-4xl text-center mb-12">
          <span className="doodle-underline">¿Qué haremos?</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACTIVITIES.map((a, i) => (
            <div
              key={a.title}
              className={`paper-note ${i % 2 === 0 ? "tilt-l2" : "tilt-r2"} px-5 py-6 text-center`}
            >
              <span aria-hidden className="text-4xl">{a.emoji}</span>
              <h3 className="font-display text-xl mt-3 mb-2 text-orange-700">
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#5b4632]">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Schedule (from the shared config) ───────────────────────────────── */

function spotsLabel(remaining: number): { text: string; className: string } {
  if (remaining <= 0)
    return { text: "Completo", className: "bg-gray-200 text-gray-600" };
  if (remaining === 1)
    return { text: "¡Última plaza!", className: "bg-red-100 text-red-700" };
  return {
    text: `${remaining} plazas libres`,
    className: "bg-green-100 text-green-800",
  };
}

function Schedule() {
  return (
    <section id="horarios" className="scroll-mt-20 max-w-6xl mx-auto px-4 py-16 sm:py-24">
      <h2 className="font-display text-3xl sm:text-4xl text-center mb-4">
        <span className="doodle-underline">Horarios</span>
      </h2>
      <p className="text-center font-hand text-xl text-[#5b4632] mb-12">
        A partir de septiembre · {BIZUM_CONFIG.BIZUM_AMOUNT}/mes
      </p>

      <div className="cardboard rotate-1 max-w-3xl mx-auto px-5 py-8 sm:px-10">
        <div className="grid sm:grid-cols-2 gap-4">
          {SCHEDULE_SLOTS.map((slot, i) => {
            const spots = spotsLabel(slot.remainingSpots);
            return (
              <div
                key={slot.id}
                className={`paper-note ${i % 2 === 0 ? "tilt-l2" : "tilt-r2"} px-5 py-4 flex items-center justify-between gap-3`}
              >
                <div>
                  <p className="font-display text-lg text-orange-700">{slot.day}</p>
                  <p className="font-hand text-xl">
                    {slot.startTime} – {slot.endTime}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${spots.className}`}
                >
                  {spots.text}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/reserva"
            className="inline-block bg-orange-700 hover:bg-orange-800 active:scale-[0.98] text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-md transition-all"
          >
            Reservar mi plaza →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── How it works ────────────────────────────────────────────────────── */

const STEPS = [
  {
    title: "Elige un horario",
    text: "Mira los horarios semanales y elige el que mejor os venga.",
  },
  {
    title: "Rellena la reserva",
    text: `Completa el formulario y envía el Bizum (${BIZUM_CONFIG.BIZUM_AMOUNT}/mes) para guardar la plaza.`,
  },
  {
    title: "Confirmación por WhatsApp",
    text: "En cuanto recibamos el pago te confirmamos la plaza por WhatsApp. ¡Y a crear!",
  },
];

function HowItWorks() {
  return (
    <section className="bg-orange-100/50 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-display text-3xl sm:text-4xl text-center mb-12">
          <span className="doodle-underline">¿Cómo reservo?</span>
        </h2>
        <ol className="grid sm:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="text-center">
              <span
                aria-hidden
                className="font-display inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-700 text-white text-2xl shadow-md mb-4"
              >
                {i + 1}
              </span>
              <h3 className="font-bold text-lg mb-1.5">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#5b4632]">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Visit / location ────────────────────────────────────────────────── */

function Visit() {
  return (
    <section id="donde" className="scroll-mt-20 max-w-4xl mx-auto px-4 py-16 sm:py-24">
      <div className="grid sm:grid-cols-[auto_1fr] gap-8 items-center">
        <TarongetaMascot className="w-32 sm:w-40 justify-self-center" />
        <div>
          <h2 className="font-display text-3xl sm:text-4xl mb-4">
            <span className="doodle-underline">Ven a conocernos</span>
          </h2>
          <p className="leading-relaxed mb-3">
            Estamos preparando nuestro pequeño local en el barrio de{" "}
            <strong>Sant Andreu, Barcelona</strong>, con muchas ganas de abrir
            las puertas en septiembre.
          </p>
          <p className="leading-relaxed mb-6">
            ¿Quieres la dirección exacta, resolver dudas o simplemente
            saludar? Escríbenos y te contestamos enseguida.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition-colors"
          >
            💬 Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────── */

function SiteFooter() {
  return (
    <footer id="contacto" className="bg-[#3b3229] text-orange-50/90">
      <div className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 items-start">
        <div>
          <p className="font-display text-2xl text-orange-400">La Tarongeta</p>
          <p className="font-hand text-lg mt-1">
            Espacio creativo en inglés
            <br />
            Sant Andreu, Barcelona
          </p>
        </div>
        <nav aria-label="Enlaces" className="grid gap-2 text-sm">
          <a href="#espacio" className="hover:text-orange-300 transition-colors">
            El espacio
          </a>
          <a href="#actividades" className="hover:text-orange-300 transition-colors">
            Actividades
          </a>
          <a href="#horarios" className="hover:text-orange-300 transition-colors">
            Horarios
          </a>
          <Link href="/reserva" className="hover:text-orange-300 transition-colors">
            Reservar plaza
          </Link>
        </nav>
        <div className="text-sm">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-300 transition-colors"
          >
            💬 WhatsApp
          </a>
          <p className="mt-4 text-orange-50/60">
            © {new Date().getFullYear()} La Tarongeta · Todos los derechos
            reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
