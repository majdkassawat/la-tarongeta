/**
 * UI strings. Catalan is the default language; English is available via the
 * CAT / ENG toggle at the bottom of the page.
 */
export type Lang = "ca" | "en";

const ca = {
  htmlLang: "ca",
  address: "Carrer de Castellbell, 12, Sant Andreu, 08030",
  intro:
    "Omple el formulari, tria el teu horari i envia el Bizum per assegurar la plaça de la teva criatura. 🧡",

  childSection: "Dades de la criatura",
  childName: "Nom complet",
  childNamePlaceholder: "Nom i cognoms",
  age: "Edat",
  agePlaceholder: "Tria l'edat",
  years: "anys",

  scheduleSection: "Horari",
  scheduleLabel: "Tria el teu horari.",
  schedulePlaceholder: "Tria primer l'edat de la criatura",
  full: "Complet",
  weekdays: "De dilluns a divendres.",
  doorsOpen: "Les portes s'obren a les",
  maxPerSession: "Màxim 10 criatures per sessió.",
  ages: "anys",

  parentsSection: "Contacte",
  parent1: "Pare/mare 1",
  parent2: "Pare/mare 2",
  whatsappNumber: "Número de WhatsApp",
  optional: "(opcional)",

  bizumSection: "Pagament amb Bizum",
  bizumLead: "Finalitza la teva inscripció!",
  bizumStep1Before: "Envia un Bizum per",
  bizumStep1Mid: "a la",
  bizumStep2: "Us confirmarem la reserva per WhatsApp així que rebem el pagament.",
  bizumSendTo: "Envia el Bizum a",
  amount: "Import",
  waOpen: "Obre WhatsApp amb el missatge preparat",

  notes: "Comentaris",
  notesPlaceholder: "Al·lèrgies, necessitats especials, preguntes…",
  gdpr: "Accepto que les dades facilitades s'utilitzin únicament per gestionar aquesta reserva i la comunicació per WhatsApp relacionada.",

  review: "Revisa la teva reserva →",
  edit: "← Edita",
  confirm: "Confirma la sol·licitud ✓",
  sending: "Enviant…",
  submitError: "Hi ha hagut un error. Torna-ho a provar.",

  summaryTitle: "Resum de la teva reserva",
  summaryChild: "Criatura",
  summaryAge: "Edat",
  summarySchedule: "Horari",
  summaryParent1: "WhatsApp (pare/mare 1)",
  summaryParent2: "WhatsApp (pare/mare 2)",
  summaryNotes: "Comentaris",
  notSelected: "No seleccionat",

  errChildName: "Indica el nom complet de la criatura.",
  errAge: "Tria l'edat de la criatura.",
  errSlot: "Tria un horari.",
  errSlotFull: "Aquesta sessió està completa. Escriu-nos per WhatsApp per a la llista d'espera.",
  errWhatsapp1: "Indica un número de WhatsApp.",
  errWhatsappInvalid: "El número no sembla vàlid (ex: 612 345 678 o +44 7700 900123).",
  errGdpr: "Has d'acceptar l'ús de les dades per continuar.",

  successTitle: "Sol·licitud rebuda!",
  successBody1: "Hem rebut la teva sol·licitud per a",
  successBody2: "a l'horari",
  successBody3: "",
  nextSteps: "Propers passos:",
  step1Title: "Envia el Bizum ara",
  step2Title: "Espera la nostra confirmació per WhatsApp",
  step2Body: "T'escriurem al",
  step2Body2: "per confirmar la plaça.",
  step3Title: "La plaça es confirma només després del Bizum",
  step3Body: "Fins que rebem el pagament i et confirmem, la plaça no està garantida.",
  waNotify: "Avisa per WhatsApp que has enviat el Bizum",
  doubts: "Dubtes? Escriu-nos per WhatsApp.",

  language: "Idioma",
  rights: "Tots els drets reservats",

  waMessage: (child: string, slot: string) =>
    `Hola! Acabo d'enviar la reserva per a ${child} a l'horari ${slot}. He fet el Bizum. Quedo a l'espera de confirmació. Gràcies!`,
};

const en: typeof ca = {
  htmlLang: "en",
  address: "Carrer de Castellbell, 12, Sant Andreu, 08030",
  intro:
    "Fill in the form, choose your schedule and send the Bizum to secure your child's place. 🧡",

  childSection: "Child's details",
  childName: "Full name",
  childNamePlaceholder: "First and last name",
  age: "Age",
  agePlaceholder: "Choose an age",
  years: "years old",

  scheduleSection: "Schedule",
  scheduleLabel: "Choose your schedule.",
  schedulePlaceholder: "Choose the child's age first",
  full: "Full",
  weekdays: "Monday to Friday.",
  doorsOpen: "Doors open at",
  maxPerSession: "Maximum 10 children per session.",
  ages: "years",

  parentsSection: "Contact",
  parent1: "Parent 1",
  parent2: "Parent 2",
  whatsappNumber: "WhatsApp number",
  optional: "(optional)",

  bizumSection: "Payment by Bizum",
  bizumLead: "Finalize your sign up!",
  bizumStep1Before: "Send a Bizum of",
  bizumStep1Mid: "to",
  bizumStep2: "We'll confirm your booking by WhatsApp as soon as we receive the payment.",
  bizumSendTo: "Send the Bizum to",
  amount: "Amount",
  waOpen: "Open WhatsApp with a ready-made message",

  notes: "Comments",
  notesPlaceholder: "Allergies, special needs, questions…",
  gdpr: "I agree that the details provided will be used only to manage this booking and the related WhatsApp communication.",

  review: "Review my booking →",
  edit: "← Edit",
  confirm: "Confirm request ✓",
  sending: "Sending…",
  submitError: "Something went wrong. Please try again.",

  summaryTitle: "Your booking summary",
  summaryChild: "Child",
  summaryAge: "Age",
  summarySchedule: "Schedule",
  summaryParent1: "WhatsApp (parent 1)",
  summaryParent2: "WhatsApp (parent 2)",
  summaryNotes: "Comments",
  notSelected: "Not selected",

  errChildName: "Please enter the child's full name.",
  errAge: "Please choose the child's age.",
  errSlot: "Please choose a schedule.",
  errSlotFull: "This session is full. Message us on WhatsApp to join the waiting list.",
  errWhatsapp1: "Please enter a WhatsApp number.",
  errWhatsappInvalid: "That number doesn't look valid (e.g. 612 345 678 or +44 7700 900123).",
  errGdpr: "You must accept the use of your details to continue.",

  successTitle: "Request received!",
  successBody1: "We've received your request for",
  successBody2: "for the",
  successBody3: "session",
  nextSteps: "Next steps:",
  step1Title: "Send the Bizum now",
  step2Title: "Wait for our WhatsApp confirmation",
  step2Body: "We'll message you at",
  step2Body2: "to confirm the place.",
  step3Title: "The place is confirmed only after the Bizum",
  step3Body: "Until we receive the payment and confirm, the place is not guaranteed.",
  waNotify: "Let us know by WhatsApp that you've sent the Bizum",
  doubts: "Questions? Message us on WhatsApp.",

  language: "Language",
  rights: "All rights reserved",

  waMessage: (child: string, slot: string) =>
    `Hi! I've just sent the booking for ${child} for the ${slot} slot. I've made the Bizum. Waiting for confirmation. Thank you!`,
};

export const DICTS: Record<Lang, typeof ca> = { ca, en };
export type Dict = typeof ca;
