/**
 * UI strings. Catalan is the default language; English is available via the
 * CAT / ENG toggle at the bottom of the page.
 */
import { CONTACT } from "@/config/contact";
import { AgeGroup, Day } from "@/types";

export type Lang = "ca" | "en";

const ca = {
  htmlLang: "ca",
  title: "La Tarongeta · Reserva la teva plaça",
  tagline:
    "Un espai creatiu on les criatures curioses puguin explorar l'art i la llengua anglesa en un entorn relaxat i natural.",
  address: "Carrer de Castellbell, 12, Sant Andreu, 08030",
  intro:
    "Omple el formulari, tria el teu horari i completa el pagament per assegurar la plaça de la teva criatura. 🧡",

  childSection: "Dades de la criatura",
  childName: "Nom complet",
  childNamePlaceholder: "Nom i cognoms",

  scheduleSection: "Horari",
  ageQuestion: "Quina edat té el teu infant?",
  agePlaceholder: "Tria una opció",
  ageGroupLabel: (g: AgeGroup) => `${g.ages[0]}–${g.ages[1]} anys`,
  slotQuestion: "Tria el teu horari",
  slotPlaceholder: "Tria un horari",
  slotLabel: (g: AgeGroup) =>
    g.doorsOpen
      ? `${g.startTime} – ${g.endTime} (Portes obertes a les ${g.doorsOpen})`
      : `${g.startTime} – ${g.endTime}`,
  slotShort: (g: AgeGroup) => `${g.startTime} – ${g.endTime}`,
  doorsNote: (g: AgeGroup) => (g.doorsOpen ? `Portes obertes a les ${g.doorsOpen}.` : ""),
  dayQuestion: "Quin dia vols venir?",
  dayPlaceholder: "Tria un dia",
  days: { mon: "Dilluns", tue: "Dimarts", wed: "Dimecres", thu: "Dijous", fri: "Divendres" } as Record<Day, string>,
  full: "Complet",

  contactsSection: "Contactes",
  contact1Title: "Dades de contacte de la família",
  contact2Title: "Dades de contacte de la família (Segon contacte)",
  contactName: "Nom i cognoms",
  contactWhatsapp: "Número de WhatsApp",
  optional: "(opcional)",

  paymentSection: "Pagament",
  paymentLead: "Finalitza la teva inscripció!",
  payTitle: "Calendari de pagaments (curs acadèmic):",
  payDueTitle: "A pagar en el moment de la inscripció:",
  payDueAmount: "125 €",
  payDueNote:
    "(Inclou el primer mes de quota [50 €] + la quota de material del 1r trimestre [75 €]. Rebràs un enllaç de BBVA PayGold al teu telèfon/correu per completar el pagament i assegurar la plaça.)",
  payUpcomingTitle: "Propers càrrecs automàtics (es cobren el dia 1 de cada mes):",
  payItems: [
    ["1 de novembre i 1 de desembre:", "50 €/mes", ""],
    ["1 de gener:", "125 €", "(50 € de quota + 75 € de material del 2n trimestre)"],
    ["1 de febrer i 1 de març:", "50 €/mes", ""],
    ["1 d'abril:", "125 €", "(50 € de quota + 75 € de material del 3r trimestre)"],
    ["1 de maig i 1 de juny:", "50 €/mes", "(L'últim pagament, l'1 de juny, cobreix les classes fins al final del curs, el 21 de juny.)"],
  ] as [string, string, string][],
  payConsentTitle: "Consentiment de pagament recurrent:",
  payConsent:
    "Autoritzo el pagament inicial de 125 € en el moment de la inscripció mitjançant BBVA PayGold per assegurar la plaça, i accepto els càrrecs automàtics mensuals el dia 1 de cada mes fins a l'1 de juny segons el calendari anterior.",

  otherSection: "Altres",
  notes: "Comentaris",
  notesPlaceholder: "Al·lèrgies, necessitats especials, preguntes…",

  dpTitle: "Informació bàsica sobre protecció de dades (LOPDGDD / RGPD)",
  dpBody: [
    ["Responsable:", "La Tarongeta"],
    ["Finalitat:", "gestió de la inscripció als tallers, la participació en les activitats i el processament dels pagaments mitjançant BBVA PayGold."],
    ["Legitimació:", "execució del contracte i consentiment dels pares i mares."],
    ["Destinataris:", "BBVA / Redsys (passarel·la de pagament) i les autoritats fiscals quan ho exigeixi la llei espanyola."],
    ["Drets:", `pots accedir, rectificar o suprimir les teves dades en qualsevol moment contactant amb la Sarah King per WhatsApp o telèfon al ${CONTACT.PHONE_DISPLAY}.`],
  ] as [string, string][],
  dataConsent: "Accepto les condicions i autoritzo el tractament de les dades per a la inscripció i els pagaments amb BBVA PayGold.",
  photoConsent:
    "Autoritzo La Tarongeta a fer i publicar fotos o vídeos curts del meu fill o filla durant les activitats, exclusivament per a la documentació de l'estudi, actualitzacions pedagògiques i promoció a les xarxes socials oficials (p. ex. Instagram) i canals digitals. No es publicaran mai noms complets ni dades personals.",
  newsConsent: "Accepto rebre notícies sobre propers casals i tallers especials per WhatsApp.",
  required: "(obligatori)",

  review: "Revisa la teva inscripció →",
  edit: "← Edita",
  confirm: "Confirma la inscripció ✓",
  sending: "Enviant…",
  submitError: `Hi ha hagut un error i la inscripció no s'ha enviat. Torna-ho a provar o escriu-nos per WhatsApp al ${CONTACT.PHONE_DISPLAY}.`,

  summaryTitle: "Resum de la teva inscripció",
  summaryChild: "Criatura",
  summaryAge: "Edat",
  summarySchedule: "Horari",
  summaryDay: "Dia",
  summaryContact1: "Contacte",
  summaryContact2: "Segon contacte",
  summaryNotes: "Comentaris",
  notSelected: "No seleccionat",

  errChildName: "Indica el nom complet de la criatura.",
  errAgeGroup: "Tria l'edat del teu infant.",
  errSlot: "Tria un horari.",
  errDay: "Tria un dia.",
  errDayFull: "Aquesta sessió està completa. Tria un altre dia.",
  errGroupFull: `Totes les sessions d'aquest grup estan completes. Escriu-nos per WhatsApp al ${CONTACT.PHONE_DISPLAY} i t'apuntarem a la llista d'espera.`,
  errContactName: "Indica el nom i cognoms.",
  errWhatsapp: "Indica un número de WhatsApp.",
  errWhatsappInvalid: "El número no sembla vàlid (p. ex. 612 345 678 o +44 7700 900123).",
  errPaymentConsent: "Has d'autoritzar el pagament per continuar.",
  errDataConsent: "Has d'acceptar les condicions per continuar.",

  successTitle: "Inscripció rebuda!",
  successBody: (child: string, slot: string, day: string) =>
    `Hem rebut la inscripció de ${child} per a l'horari ${slot}, els ${day.toLowerCase()}.`,
  nextSteps: "Propers passos:",
  step1Title: "Completa el pagament inicial de 125 €",
  step1Body: "Rebràs un enllaç de BBVA PayGold al teu telèfon o correu per completar el pagament i assegurar la plaça.",
  step2Title: "Espera la nostra confirmació per WhatsApp",
  step2Body: (phone: string) => `T'escriurem al ${phone} per confirmar la plaça.`,
  doubts: "Dubtes? Escriu-nos per WhatsApp al",

  language: "Idioma",
  rights: "Tots els drets reservats",
};

/** "17.15 h" → "17:15" */
const enTime = (s: string) => s.replace(".", ":").replace(" h", "");

const en: typeof ca = {
  htmlLang: "en",
  title: "La Tarongeta · Book your place",
  tagline:
    "A creative workshop for curious kids to explore art and English in a relaxed natural environment.",
  address: "Carrer de Castellbell, 12, Sant Andreu, 08030",
  intro:
    "Fill in the form, choose your schedule and complete the payment to secure your child's place. 🧡",

  childSection: "Child's details",
  childName: "Full name",
  childNamePlaceholder: "First and last name",

  scheduleSection: "Schedule",
  ageQuestion: "How old is your child?",
  agePlaceholder: "Choose an option",
  ageGroupLabel: (g: AgeGroup) => `${g.ages[0]}–${g.ages[1]} years old`,
  slotQuestion: "Choose your schedule",
  slotPlaceholder: "Choose a time",
  slotLabel: (g: AgeGroup) =>
    g.doorsOpen
      ? `${enTime(g.startTime)} – ${enTime(g.endTime)} (Doors open at ${enTime(g.doorsOpen)})`
      : `${enTime(g.startTime)} – ${enTime(g.endTime)}`,
  slotShort: (g: AgeGroup) => `${enTime(g.startTime)} – ${enTime(g.endTime)}`,
  doorsNote: (g: AgeGroup) => (g.doorsOpen ? `Doors open at ${enTime(g.doorsOpen)}.` : ""),
  dayQuestion: "Which day would you like to attend?",
  dayPlaceholder: "Choose a day",
  days: { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday" } as Record<Day, string>,
  full: "Full",

  contactsSection: "Contacts",
  contact1Title: "Family contact details",
  contact2Title: "Family contact details (Second contact)",
  contactName: "Full name",
  contactWhatsapp: "WhatsApp phone number",
  optional: "(optional)",

  paymentSection: "Payment",
  paymentLead: "Finalize your sign-up!",
  payTitle: "Payment & Billing Schedule (Academic Year):",
  payDueTitle: "Due Upon Registration:",
  payDueAmount: "€125",
  payDueNote:
    "(Covers your first month of tuition [€50] + 1st trimester material fee [€75]. A BBVA PayGold link will be sent to your phone/email to complete payment and lock in your spot.)",
  payUpcomingTitle: "Upcoming Automatic Charges (Billed on the 1st of each month):",
  payItems: [
    ["Nov 1 & Dec 1:", "€50/month", ""],
    ["Jan 1:", "€125", "(€50 tuition + 2nd trimester material fee €75)"],
    ["Feb 1 & Mar 1:", "€50/month", ""],
    ["Apr 1:", "€125", "(€50 tuition + 3rd trimester material fee €75)"],
    ["May 1 & Jun 1:", "€50/month", "(Final payment on June 1 covers classes through the end of the school term June 21.)"],
  ] as [string, string, string][],
  payConsentTitle: "Recurring Payment Consent:",
  payConsent:
    "I authorize the initial €125 payment upon registration via BBVA PayGold to secure my spot, and agree to automatic monthly charges on the 1st of each month through June 1 according to the schedule above.",

  otherSection: "Other",
  notes: "Comments",
  notesPlaceholder: "Allergies, special needs, questions…",

  dpTitle: "Basic Data Protection Summary (LOPDGDD / RGPD)",
  dpBody: [
    ["Responsable:", "La Tarongeta"],
    ["Finalidad:", "Managing workshop registration, activity participation, and payment processing via BBVA PayGold."],
    ["Legitimación:", "Contract execution and parent consent."],
    ["Destinatarios:", "BBVA / Redsys (payment gateway) and tax authorities as required by Spanish law."],
    ["Derechos:", `Access, rectify, or erase your data anytime by contacting Sarah King via WhatsApp/phone at ${CONTACT.PHONE_DISPLAY}.`],
  ] as [string, string][],
  dataConsent: "I accept the terms and authorize data processing for registration and BBVA PayGold payments.",
  photoConsent:
    "I authorize La Tarongeta to take and publish photos or short video clips of my child during activities solely for studio documentation, pedagogical updates, and promotional use on official social media (e.g., Instagram) and digital channels. No full names or personal details will ever be published.",
  newsConsent: "I agree to receive news about upcoming camps and special workshops via WhatsApp.",
  required: "(required)",

  review: "Review my sign-up →",
  edit: "← Edit",
  confirm: "Confirm sign-up ✓",
  sending: "Sending…",
  submitError: `Something went wrong and your sign-up was not sent. Please try again or message us on WhatsApp at ${CONTACT.PHONE_DISPLAY}.`,

  summaryTitle: "Your sign-up summary",
  summaryChild: "Child",
  summaryAge: "Age",
  summarySchedule: "Schedule",
  summaryDay: "Day",
  summaryContact1: "Contact",
  summaryContact2: "Second contact",
  summaryNotes: "Comments",
  notSelected: "Not selected",

  errChildName: "Please enter the child's full name.",
  errAgeGroup: "Please choose your child's age.",
  errSlot: "Please choose a schedule.",
  errDay: "Please choose a day.",
  errDayFull: "This session is full. Please choose another day.",
  errGroupFull: `All sessions for this age group are full. Message us on WhatsApp at ${CONTACT.PHONE_DISPLAY} and we'll add you to the waiting list.`,
  errContactName: "Please enter the full name.",
  errWhatsapp: "Please enter a WhatsApp number.",
  errWhatsappInvalid: "That number doesn't look valid (e.g. 612 345 678 or +44 7700 900123).",
  errPaymentConsent: "You must authorize the payment to continue.",
  errDataConsent: "You must accept the terms to continue.",

  successTitle: "Sign-up received!",
  successBody: (child: string, slot: string, day: string) =>
    `We've received ${child}'s sign-up for the ${slot} session on ${day}s.`,
  nextSteps: "Next steps:",
  step1Title: "Complete the initial €125 payment",
  step1Body: "A BBVA PayGold link will be sent to your phone or email to complete payment and lock in your spot.",
  step2Title: "Wait for our WhatsApp confirmation",
  step2Body: (phone: string) => `We'll message you at ${phone} to confirm the place.`,
  doubts: "Questions? Message us on WhatsApp at",

  language: "Language",
  rights: "All rights reserved",
};

export const DICTS: Record<Lang, typeof ca> = { ca, en };
export type Dict = typeof ca;
