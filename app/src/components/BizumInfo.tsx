"use client";

import { BIZUM_CONFIG } from "@/config/bizum";
import { ScheduleSlot } from "@/types";

interface BizumInfoProps {
  selectedSlot: ScheduleSlot | null;
  parentName: string;
}

export default function BizumInfo({ selectedSlot, parentName }: BizumInfoProps) {
  const slotLabel = selectedSlot
    ? `${selectedSlot.day} ${selectedSlot.startTime}–${selectedSlot.endTime}`
    : "el horario seleccionado";

  const waMessage = encodeURIComponent(
    BIZUM_CONFIG.whatsappMessage(parentName || "...", slotLabel)
  );
  const waLink = `https://wa.me/${BIZUM_CONFIG.WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">💛</span>
        <h3 className="text-base font-bold text-orange-800">
          Cómo asegurar tu plaza
        </h3>
      </div>

      <p className="text-sm text-orange-900 leading-relaxed">
        La reserva <strong>no queda confirmada</strong> hasta que recibamos el
        Bizum y te confirmemos por WhatsApp. Sigue estos pasos:
      </p>

      <ol className="space-y-2 text-sm text-orange-900">
        <li className="flex gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-400 text-white text-xs font-bold flex items-center justify-center">
            1
          </span>
          <span>Rellena el formulario y selecciona tu horario.</span>
        </li>
        <li className="flex gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-400 text-white text-xs font-bold flex items-center justify-center">
            2
          </span>
          <span>
            Envía un Bizum de{" "}
            <strong className="text-orange-700">{BIZUM_CONFIG.BIZUM_AMOUNT}</strong>{" "}
            al número{" "}
            <strong className="text-orange-700">{BIZUM_CONFIG.BIZUM_PHONE}</strong>{" "}
            ({BIZUM_CONFIG.BIZUM_ALIAS}).
          </span>
        </li>
        <li className="flex gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-400 text-white text-xs font-bold flex items-center justify-center">
            3
          </span>
          <span>
            Envía el formulario. Te contactaremos por WhatsApp para confirmar.
          </span>
        </li>
      </ol>

      {/* Bizum quick-reference box */}
      <div className="rounded-xl bg-white border border-orange-200 p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Envía el Bizum a
          </p>
          <p className="text-xl font-bold text-gray-800 tracking-wider">
            {BIZUM_CONFIG.BIZUM_PHONE}
          </p>
          <p className="text-sm text-gray-500">{BIZUM_CONFIG.BIZUM_ALIAS}</p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Importe
          </p>
          <p className="text-3xl font-black text-orange-500">
            {BIZUM_CONFIG.BIZUM_AMOUNT}
          </p>
        </div>
      </div>

      {/* WhatsApp shortcut */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 text-sm transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Abrir WhatsApp con mensaje preparado
      </a>
    </div>
  );
}
