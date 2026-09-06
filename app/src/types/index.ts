export type Day = "mon" | "tue" | "wed" | "thu" | "fri";

export interface AgeGroup {
  id: "g35" | "g68";
  /** Inclusive age range */
  ages: [number, number];
  startTime: string;
  endTime: string;
  /** Doors open before the session (only some groups) */
  doorsOpen?: string;
}

export interface FormData {
  childName: string;
  ageGroup: string;
  slot: string;
  day: string;
  contact1Name: string;
  contact1Whatsapp: string;
  contact2Name: string;
  contact2Whatsapp: string;
  notes: string;
  paymentConsent: boolean;
  dataConsent: boolean;
  photoConsent: boolean;
  newsConsent: boolean;
}

/** Keys of the i18n dictionary; resolved to text at render time so errors follow the CAT/ENG toggle. */
export type ErrorKey =
  | "errChildName"
  | "errAgeGroup"
  | "errSlot"
  | "errDay"
  | "errDayFull"
  | "errGroupFull"
  | "errContactName"
  | "errWhatsapp"
  | "errWhatsappInvalid"
  | "errPaymentConsent"
  | "errDataConsent";

export type FormErrors = Partial<Record<keyof FormData, ErrorKey>>;

export type SubmitState = "idle" | "loading" | "success" | "error";
