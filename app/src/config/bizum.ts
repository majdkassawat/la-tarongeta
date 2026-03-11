/**
 * BIZUM CONFIGURATION
 * Edit this file to update payment details.
 *
 * ⚠️  PLACEHOLDERS — replace before going live:
 * - BIZUM_PHONE: the phone number to receive Bizum
 * - BIZUM_ALIAS: optional Bizum alias/name shown to payer
 * - BIZUM_AMOUNT: monthly fee in EUR
 * - WHATSAPP_BUSINESS_NUMBER: number for the confirmation WhatsApp link
 *   Format: international without + or spaces, e.g. "34612345678"
 */

export const BIZUM_CONFIG = {
  /** [PLACEHOLDER] Replace with actual Bizum phone number */
  BIZUM_PHONE: "612 345 678",

  /** [PLACEHOLDER] Replace with Bizum alias / recipient name */
  BIZUM_ALIAS: "La Tarongeta",

  /** [PLACEHOLDER] Replace with actual monthly price */
  BIZUM_AMOUNT: "30€",

  /** [PLACEHOLDER] Replace with WhatsApp Business number (no +, no spaces) */
  WHATSAPP_NUMBER: "34612345678",

  /** Prefilled WhatsApp message sent when parent taps the link */
  whatsappMessage: (parentName: string, slotLabel: string) =>
    `Hola! Soy ${parentName} y acabo de enviar la reserva para el horario ${slotLabel}. He realizado el Bizum. Quedo a la espera de confirmación. ¡Gracias!`,
};
