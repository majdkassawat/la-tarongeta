"use client";

import { CONTACT } from "@/config/contact";
import { groupById } from "@/config/schedule";
import { Dict } from "@/i18n";
import { Day, FormData } from "@/types";

interface SuccessScreenProps {
  t: Dict;
  formData: FormData;
}

export default function SuccessScreen({ t, formData }: SuccessScreenProps) {
  const group = groupById(formData.ageGroup);
  const slot = group ? t.slotShort(group) : "…";
  const day = formData.day ? t.days[formData.day as Day] : "…";

  return (
    <div className="text-center space-y-6 py-8 px-4">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl shadow-inner">
          🎉
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-gray-800">{t.successTitle}</h2>
        <p className="text-gray-600 text-sm">{t.successBody(formData.childName, slot, day)}</p>
      </div>

      <div className="rounded-2xl bg-orange-50 border border-orange-200 p-5 text-left space-y-3">
        <p className="text-sm font-bold text-orange-800">{t.nextSteps}</p>
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-lg">🧡</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.step1Title}</p>
              <p className="text-xs text-gray-600">{t.step1Body}</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-lg">💬</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{t.step2Title}</p>
              <p className="text-xs text-gray-600">{t.step2Body(formData.contact1Whatsapp)}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600">
        {t.doubts}{" "}
        <a
          href={`https://wa.me/${CONTACT.WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-green-800 underline"
        >
          {CONTACT.PHONE_DISPLAY}
        </a>
        .
      </p>
    </div>
  );
}
