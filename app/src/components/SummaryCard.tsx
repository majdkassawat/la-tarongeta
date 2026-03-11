"use client";

import { FormData, ScheduleSlot } from "@/types";

interface SummaryCardProps {
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

export default function SummaryCard({ formData, selectedSlot }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-5">
      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
        Resumen de tu reserva
      </h3>
      <div className="space-y-0">
        <Row label="Padre / madre" value={formData.parentName} />
        <Row label="Nombre del niño/a" value={formData.childName} />
        <Row label="Edad" value={formData.childAge ? `${formData.childAge} años` : ""} />
        <Row label="Teléfono" value={formData.phone} />
        <Row label="WhatsApp" value={formData.whatsapp} />
        <Row
          label="Horario"
          value={
            selectedSlot
              ? `${selectedSlot.day} ${selectedSlot.startTime}–${selectedSlot.endTime}`
              : "No seleccionado"
          }
        />
        {formData.notes && <Row label="Comentarios" value={formData.notes} />}
      </div>
    </div>
  );
}
