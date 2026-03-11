/**
 * SCHEDULE CONFIGURATION
 * Edit this file to update the weekly schedule slots.
 *
 * Fields:
 * - id: unique identifier (keep URL-safe)
 * - day: full day name in Spanish
 * - dayShort: abbreviated day for mobile
 * - startTime / endTime: "HH:MM" format
 * - totalSpots: maximum places per slot
 * - remainingSpots: currently available (set to 0 to mark as full)
 */

import { ScheduleSlot } from "@/types";

export const SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: "mon-17",
    day: "Lunes",
    dayShort: "Lun",
    startTime: "17:00",
    endTime: "18:00",
    totalSpots: 8,
    remainingSpots: 3,
  },
  {
    id: "mon-18",
    day: "Lunes",
    dayShort: "Lun",
    startTime: "18:00",
    endTime: "19:00",
    totalSpots: 8,
    remainingSpots: 0, // FULL — slot disabled
  },
  {
    id: "wed-17",
    day: "Miércoles",
    dayShort: "Mié",
    startTime: "17:00",
    endTime: "18:00",
    totalSpots: 8,
    remainingSpots: 5,
  },
  {
    id: "fri-17",
    day: "Viernes",
    dayShort: "Vie",
    startTime: "17:00",
    endTime: "18:00",
    totalSpots: 8,
    remainingSpots: 1,
  },
];
