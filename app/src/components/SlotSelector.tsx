"use client";

import { ScheduleSlot } from "@/types";

interface SlotSelectorProps {
  slots: ScheduleSlot[];
  selectedSlotId: string;
  onSelect: (slotId: string) => void;
  error?: string;
}

function SlotCard({
  slot,
  isSelected,
  onSelect,
}: {
  slot: ScheduleSlot;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const isFull = slot.remainingSpots === 0;
  const isLow = slot.remainingSpots === 1;

  const availabilityLabel = isFull
    ? "Completo"
    : isLow
    ? "¡Última plaza!"
    : `${slot.remainingSpots} plazas`;

  const availabilityColor = isFull
    ? "text-red-500"
    : isLow
    ? "text-amber-600 font-semibold"
    : "text-green-600";

  return (
    <button
      type="button"
      disabled={isFull}
      onClick={() => !isFull && onSelect(slot.id)}
      aria-label={`Seleccionar ${slot.day} de ${slot.startTime} a ${slot.endTime}`}
      aria-pressed={isSelected}
      className={[
        "w-full text-left rounded-2xl border-2 p-4 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
        isFull
          ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
          : isSelected
          ? "border-orange-400 bg-orange-50 shadow-md"
          : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/40 cursor-pointer",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {slot.day}
          </p>
          <p className="text-lg font-bold text-gray-800 mt-0.5">
            {slot.startTime} – {slot.endTime}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {isSelected && !isFull && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full px-2 py-0.5">
              ✓ Seleccionado
            </span>
          )}
          <span className={`text-xs ${availabilityColor}`}>
            {availabilityLabel}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function SlotSelector({
  slots,
  selectedSlotId,
  onSelect,
  error,
}: SlotSelectorProps) {
  // Group slots by day
  const grouped = slots.reduce<Record<string, ScheduleSlot[]>>((acc, slot) => {
    if (!acc[slot.day]) acc[slot.day] = [];
    acc[slot.day].push(slot);
    return acc;
  }, {});

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Elige tu horario <span className="text-red-500">*</span>
      </label>

      <div className="space-y-4">
        {Object.entries(grouped).map(([day, daySlots]) => (
          <div key={day}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">
              {day}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {daySlots.map((slot) => (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  isSelected={selectedSlotId === slot.id}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
