/**
 * SCHEDULE CONFIGURATION
 * Two age groups, each with one time slot, Monday to Friday. Every
 * (group, day) session takes at most CAPACITY children. The number of spots
 * already taken comes from the sign-up API (GET ?view=availability); a full
 * session is shown as "Complet" and cannot be chosen, and the API refuses
 * sign-ups for it too.
 *
 * Keep GROUPS / DAYS / CAPACITY in sync with yaqtin-website/api/la-tarongeta.js.
 */

import { AgeGroup, Day } from "@/types";

export const CAPACITY = 10;

export const AGE_GROUPS: AgeGroup[] = [
  { id: "g35", ages: [3, 5], startTime: "17.15 h", endTime: "18.15 h", doorsOpen: "17.00 h" },
  { id: "g68", ages: [6, 8], startTime: "18.25 h", endTime: "19.25 h" },
];

export const DAYS: Day[] = ["mon", "tue", "wed", "thu", "fri"];

export type SessionKey = `${AgeGroup["id"]}-${Day}`;
/** Sign-ups already taken per session, as reported by the API. */
export type Counts = Partial<Record<SessionKey, number>>;

export function sessionKey(groupId: AgeGroup["id"], day: Day): SessionKey {
  return `${groupId}-${day}`;
}

export function remainingSpots(groupId: AgeGroup["id"], day: Day, counts: Counts): number {
  return CAPACITY - (counts[sessionKey(groupId, day)] ?? 0);
}

export function groupById(id: string): AgeGroup | null {
  return AGE_GROUPS.find((g) => g.id === id) ?? null;
}
