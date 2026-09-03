"use client";

import { slotLabel } from "@/config/schedule";
import { Dict } from "@/i18n";
import { FormData, ScheduleSlot } from "@/types";

interface SummaryCardProps {
  t: Dict;
  formData: FormData;
  selectedSlot: ScheduleSlot | null;
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-800 text-right">{value}</span>
    </div>
  );
}

export default function SummaryCard({ t, formData, selectedSlot }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-5">
      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
        {t.summaryTitle}
      </h3>
      <div className="space-y-0">
        <Row label={t.summaryChild} value={formData.childName} />
        <Row
          label={t.summaryAge}
          value={formData.childAge ? `${formData.childAge} ${t.years}` : ""}
        />
        <Row
          label={t.summarySchedule}
          value={selectedSlot ? slotLabel(selectedSlot) : t.notSelected}
        />
        <Row label={t.summaryParent1} value={formData.whatsapp1} />
        <Row label={t.summaryParent2} value={formData.whatsapp2} />
        {formData.notes && <Row label={t.summaryNotes} value={formData.notes} />}
      </div>
    </div>
  );
}
