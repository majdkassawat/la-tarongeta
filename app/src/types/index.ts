export interface ScheduleSlot {
  id: string;
  /** Inclusive age range this session is for */
  ages: [number, number];
  startTime: string;
  endTime: string;
  /** Doors open before the session (only some slots) */
  doorsOpen?: string;
  totalSpots: number;
  remainingSpots: number;
}

export interface FormData {
  childName: string;
  childAge: string;
  selectedSlotId: string;
  whatsapp1: string;
  whatsapp2: string;
  notes: string;
  gdprConsent: boolean;
}

export interface FormErrors {
  childName?: string;
  childAge?: string;
  selectedSlotId?: string;
  whatsapp1?: string;
  whatsapp2?: string;
  gdprConsent?: string;
}

export type SubmitState = "idle" | "loading" | "success" | "error";
