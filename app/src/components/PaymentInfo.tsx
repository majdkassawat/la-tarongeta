"use client";

import { Dict } from "@/i18n";

interface PaymentInfoProps {
  t: Dict;
  consent: boolean;
  onConsentChange: (value: boolean) => void;
  error?: string;
}

export default function PaymentInfo({ t, consent, onConsentChange, error }: PaymentInfoProps) {
  return (
    <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-5 space-y-4 text-sm text-orange-950">
      <p className="text-base font-bold text-orange-800">{t.paymentLead}</p>

      <div className="space-y-3">
        <p className="font-bold">{t.payTitle}</p>
        <div>
          <p>
            <span className="font-bold">{t.payDueTitle}</span>{" "}
            <span className="font-bold">{t.payDueAmount}</span>
          </p>
          <p className="italic text-orange-900/90 mt-1">{t.payDueNote}</p>
        </div>
        <div>
          <p className="font-bold">{t.payUpcomingTitle}</p>
          <ul className="mt-1 space-y-1 list-disc pl-5">
            {t.payItems.map(([when, amount, note]) => (
              <li key={when}>
                <span className="font-bold">{when}</span> {amount}
                {note && <span className="italic"> {note}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-field-error={error ? true : undefined}>
        <p className="font-bold mb-2">{t.payConsentTitle}</p>
        <label className="flex gap-3 items-start cursor-pointer">
          <input
            id="paymentConsent"
            type="checkbox"
            checked={consent}
            onChange={(e) => onConsentChange(e.target.checked)}
            aria-required
            aria-invalid={!!error}
            aria-describedby={error ? "paymentConsent-error" : undefined}
            className="mt-0.5 h-5 w-5 flex-shrink-0 accent-orange-700"
          />
          <span className="italic leading-relaxed">
            “{t.payConsent}” <span className="text-red-700 not-italic">*</span>
          </span>
        </label>
        {error && (
          <p id="paymentConsent-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
