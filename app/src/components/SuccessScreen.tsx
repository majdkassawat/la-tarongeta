"use client";

import { BIZUM_CONFIG } from "@/config/bizum";
import { slotLabel } from "@/config/schedule";
import { Dict } from "@/i18n";
import { FormData, ScheduleSlot } from "@/types";
import WhatsAppIcon from "./WhatsAppIcon";

interface SuccessScreenProps {
  t: Dict;
  formData: FormData;
  selectedSlot: ScheduleSlot | null;
}

export default function SuccessScreen({ t, formData, selectedSlot }: SuccessScreenProps) {
  const slot = selectedSlot ? slotLabel(selectedSlot) : "…";
  const waMessage = encodeURIComponent(t.waMessage(formData.childName, slot));
  const waLink = `https://wa.me/${BIZUM_CONFIG.WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className="text-center space-y-6 py-8 px-4">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl shadow-inner">
          🎉
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-gray-800">{t.successTitle}</h2>
        <p className="text-gray-600 text-sm">
          {t.successBody1}{" "}
          <strong className="text-gray-700">{formData.childName}</strong>{" "}
          {t.successBody2}{" "}
          <strong className="text-orange-700">{slot}</strong>
          {t.successBody3 ? ` ${t.successBody3}` : ""}.
        </p>
      </div>

      <div className="rounded-2xl bg-orange-50 border border-orange-200 p-5 text-left space-y-3">
        <p className="text-sm font-bold text-orange-800">{t.nextSteps}</p>
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-lg">🧡</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.step1Title}</p>
              <p className="text-xs text-gray-600">
                {BIZUM_CONFIG.BIZUM_AMOUNT} · {BIZUM_CONFIG.BIZUM_PHONE} ({BIZUM_CONFIG.BIZUM_ALIAS})
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-lg">💬</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.step2Title}</p>
              <p className="text-xs text-gray-600">
                {t.step2Body} {formData.whatsapp1} {t.step2Body2}
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-lg">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.step3Title}</p>
              <p className="text-xs text-gray-600">{t.step3Body}</p>
            </div>
          </div>
        </div>
      </div>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 px-4 transition-colors text-sm"
      >
        <WhatsAppIcon />
        {t.waNotify}
      </a>

      <p className="text-xs text-gray-500">{t.doubts}</p>
    </div>
  );
}
