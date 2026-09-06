/**
 * SCHEDULE CONFIGURATION
 * Two age groups, each with one time slot, Monday to Friday. Every
 * (group, day) session takes at most CAPACITY children.
 *
 * SIGNUPS is edited by hand until the form has a backend: put the number of
 * confirmed sign-ups per session there and a full session is shown as
 * "Complet" and cannot be chosen.
 */

import { AgeGroup, Day } from "@/types";

export const CAPACITY = 10;

export const AGE_GROUPS: AgeGroup[] = [
  { id: "g35", ages: [3, 5], startTime: "17.15 h", endTime: "18.15 h", doorsOpen: "17.00 h" },
  { id: "g68", ages: [6, 8], startTime: "18.25 h", endTime: "19.25 h" },
];

export const DAYS: Day[] = ["mon", "tue", "wed", "thu", "fri"];

/** Confirmed sign-ups per session, keyed "<groupId>-<day>" (edit by hand). */
export const SIGNUPS: Partial<Record<`${AgeGroup["id"]}-${Day}`, number>> = {
  // "g35-mon": 10,   // example: Monday 3–5 session full
};

export function remainingSpots(groupId: AgeGroup["id"], day: Day): number {
  return CAPACITY - (SIGNUPS[`${groupId}-${day}`] ?? 0);
}

export function groupById(id: string): AgeGroup | null {
  return AGE_GROUPS.find((g) => g.id === id) ?? null;
}
