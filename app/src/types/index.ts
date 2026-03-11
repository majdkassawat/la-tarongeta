export interface ScheduleSlot {
  id: string;
  day: string;
  dayShort: string;
  startTime: string;
  endTime: string;
  totalSpots: number;
  remainingSpots: number;
}

export interface FormData {
  parentName: string;
  childName: string;
  childAge: string;
  phone: string;
  whatsapp: string;
  selectedSlotId: string;
  notes: string;
  gdprConsent: boolean;
}

export interface FormErrors {
  parentName?: string;
  childName?: string;
  childAge?: string;
  phone?: string;
  whatsapp?: string;
  selectedSlotId?: string;
  gdprConsent?: string;
}

export type SubmitState = "idle" | "loading" | "success" | "error";
