"use client";

import { BIZUM_CONFIG } from "@/config/bizum";
import { slotLabel } from "@/config/schedule";
import { Dict } from "@/i18n";
import { ScheduleSlot } from "@/types";
import WhatsAppIcon from "./WhatsAppIcon";

interface BizumInfoProps {
  t: Dict;
  selectedSlot: ScheduleSlot | null;
  childName: string;
}

export default function BizumInfo({ t, selectedSlot, childName }: BizumInfoProps) {
  const slot = selectedSlot ? slotLabel(selectedSlot) : "…";
  const waMessage = encodeURIComponent(t.waMessage(childName || "…", slot));
  const waLink = `https://wa.me/${BIZUM_CONFIG.WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-5 space-y-4">
      <p className="text-base font-bold text-orange-800">{t.bizumLead}</p>

      <ol className="space-y-2 text-sm text-orange-900">
        <li className="flex gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-700 text-white text-xs font-bold flex items-center justify-center">
            1
          </span>
          <span>
            {t.bizumStep1Before} {BIZUM_CONFIG.BIZUM_AMOUNT_TEXT} {t.bizumStep1Mid}{" "}
            {BIZUM_CONFIG.BIZUM_ALIAS} (
            <span className="whitespace-nowrap">{BIZUM_CONFIG.BIZUM_PHONE}</span>)
          </span>
        </li>
        <li className="flex gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-700 text-white text-xs font-bold flex items-center justify-center">
            2
          </span>
          <span>{t.bizumStep2}</span>
        </li>
      </ol>

      {/* Bizum quick-reference box */}
      <div className="rounded-xl bg-white border border-orange-200 p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {t.bizumSendTo}
          </p>
          <p className="text-xl font-bold text-gray-800 tracking-wider">
            {BIZUM_CONFIG.BIZUM_PHONE}
          </p>
          <p className="text-sm text-gray-500">{BIZUM_CONFIG.BIZUM_ALIAS}</p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {t.amount}
          </p>
          <p className="text-3xl font-black text-orange-700">
            {BIZUM_CONFIG.BIZUM_AMOUNT}
          </p>
        </div>
      </div>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 text-sm transition-colors"
      >
        <WhatsAppIcon />
        {t.waOpen}
      </a>
    </div>
  );
}
