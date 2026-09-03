/**
 * SCHEDULE CONFIGURATION
 * One session per age group, Monday to Friday. Edit remainingSpots to mark a
 * session as full (0).
 */

import { ScheduleSlot } from "@/types";

export const AGES = [3, 4, 5, 6, 7, 8] as const;

export const SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: "g34",
    ages: [3, 4],
    startTime: "17.00 h",
    endTime: "17.50 h",
    doorsOpen: "16.50 h",
    totalSpots: 10,
    remainingSpots: 10,
  },
  {
    id: "g56",
    ages: [5, 6],
    startTime: "18.00 h",
    endTime: "18.50 h",
    totalSpots: 10,
    remainingSpots: 10,
  },
  {
    id: "g78",
    ages: [7, 8],
    startTime: "19.00 h",
    endTime: "19.50 h",
    totalSpots: 10,
    remainingSpots: 10,
  },
];

/** Sessions available for a given age (the age groups partition 3–8). */
export function slotsForAge(age: number): ScheduleSlot[] {
  return SCHEDULE_SLOTS.filter((s) => age >= s.ages[0] && age <= s.ages[1]);
}

export function slotLabel(slot: ScheduleSlot): string {
  return `${slot.startTime} – ${slot.endTime}`;
}
