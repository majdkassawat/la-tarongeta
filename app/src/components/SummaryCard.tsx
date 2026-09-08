"use client";

import { groupById } from "@/config/schedule";
import { Dict } from "@/i18n";
import { Day, FormData } from "@/types";

interface SummaryCardProps {
  t: Dict;
  formData: FormData;
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

export default function SummaryCard({ t, formData }: SummaryCardProps) {
  const group = groupById(formData.ageGroup);
  const contact = (name: string, phone: string) =>
    [name, phone].filter(Boolean).join(" · ");
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-5">
      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
        {t.summaryTitle}
      </h3>
      <div className="space-y-0">
        <Row label={t.summaryChild} value={formData.childName} />
        <Row label={t.summaryAge} value={group ? t.ageGroupLabel(group) : ""} />
        <Row label={t.summarySchedule} value={group ? t.slotLabel(group) : t.notSelected} />
        <Row label={t.summaryDay} value={formData.day ? t.days[formData.day as Day] : t.notSelected} />
        <Row label={t.summaryContact1} value={contact(formData.contact1Name, formData.contact1Whatsapp)} />
        <Row label={t.summaryContact2} value={contact(formData.contact2Name, formData.contact2Whatsapp)} />
        {formData.notes && <Row label={t.summaryNotes} value={formData.notes} />}
      </div>
    </div>
  );
}
