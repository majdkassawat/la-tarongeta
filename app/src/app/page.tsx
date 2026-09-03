"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AGES, SCHEDULE_SLOTS, slotLabel, slotsForAge } from "@/config/schedule";
import { asset } from "@/config/site";
import { DICTS, Dict, Lang } from "@/i18n";
import BizumInfo from "@/components/BizumInfo";
import SummaryCard from "@/components/SummaryCard";
import SuccessScreen from "@/components/SuccessScreen";
import { FormData, FormErrors, SubmitState } from "@/types";

const LANG_KEY = "lt-lang";

const INITIAL_FORM: FormData = {
  childName: "",
  childAge: "",
  selectedSlotId: "",
  whatsapp1: "",
  whatsapp2: "",
  notes: "",
  gdprConsent: false,
};

function sanitize(value: string): string {
  return value.replace(/[<>"']/g, "").trim();
}

/** Spanish numbers (optionally with 34 / +34 / 0034) or any international +number */
function validatePhone(value: string): boolean {
  const v = value.replace(/[\s\-().]/g, "").replace(/^00/, "+");
  if (v.startsWith("+")) return /^\+\d{8,15}$/.test(v);
  return /^(34)?[6789]\d{8}$/.test(v);
}

function validate(data: FormData, t: Dict): FormErrors {
  const errors: FormErrors = {};
  if (!data.childName.trim()) errors.childName = t.errChildName;
  if (!data.childAge) errors.childAge = t.errAge;
  if (!data.selectedSlotId) {
    errors.selectedSlotId = t.errSlot;
  } else if ((SCHEDULE_SLOTS.find((s) => s.id === data.selectedSlotId)?.remainingSpots ?? 0) <= 0) {
    errors.selectedSlotId = t.errSlotFull;
  }
  if (!data.whatsapp1.trim()) {
    errors.whatsapp1 = t.errWhatsapp1;
  } else if (!validatePhone(data.whatsapp1)) {
    errors.whatsapp1 = t.errWhatsappInvalid;
  }
  if (data.whatsapp2.trim() && !validatePhone(data.whatsapp2)) {
    errors.whatsapp2 = t.errWhatsappInvalid;
  }
  if (!data.gdprConsent) errors.gdprConsent = t.errGdpr;
  return errors;
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function scrollToFirstError() {
  document
    .querySelector("[data-field-error]")
    ?.scrollIntoView({ behavior: scrollBehavior(), block: "center" });
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("ca");
  const t = DICTS[lang];

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [showSummary, setShowSummary] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Remember the visitor's language and keep <html lang> in sync.
  // The saved preference is applied after hydration on purpose (the static
  // HTML is Catalan), so this setState must live in an effect.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "ca" || saved === "en") setLang(saved);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {}
  }, [lang, t.htmlLang]);

  useEffect(() => {
    if (showSummary) summaryRef.current?.focus();
  }, [showSummary]);
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const selectedSlot = SCHEDULE_SLOTS.find((s) => s.id === form.selectedSlotId) ?? null;
  const ageNumber = form.childAge ? Number(form.childAge) : null;
  const availableSlots = ageNumber ? slotsForAge(ageNumber) : [];

  const handleChange = useCallback((field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setShowSummary(false);
  }, []);

  // The schedule follows the age group, so choosing an age pre-selects its session
  const handleAgeChange = (value: string) => {
    const slots = value ? slotsForAge(Number(value)) : [];
    const open = slots.find((s) => s.remainingSpots > 0);
    setForm((prev) => ({ ...prev, childAge: value, selectedSlotId: open?.id ?? "" }));
    setErrors((prev) => ({ ...prev, childAge: undefined, selectedSlotId: undefined }));
    setShowSummary(false);
  };

  const handleReview = () => {
    const errs = validate(form, t);
    if (Object.keys(errs).length > 0) {
      flushSync(() => setErrors(errs));
      scrollToFirstError();
      return;
    }
    setShowSummary(true);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const handleSubmit = async () => {
    if (submitState === "loading") return; // anti-double-submit
    const errs = validate(form, t);
    if (Object.keys(errs).length > 0) {
      flushSync(() => {
        setErrors(errs);
        setShowSummary(false);
      });
      scrollToFirstError();
      return;
    }
    setSubmitState("loading");

    const payload = {
      childName: sanitize(form.childName),
      childAge: form.childAge,
      selectedSlotId: form.selectedSlotId,
      slotLabel: selectedSlot ? slotLabel(selectedSlot) : "",
      whatsapp1: sanitize(form.whatsapp1),
      whatsapp2: sanitize(form.whatsapp2),
      notes: sanitize(form.notes),
      language: lang,
      submittedAt: new Date().toISOString(),
    };

    // TODO: Replace with real API call
    // await fetch("/api/reservations", { method: "POST", body: JSON.stringify(payload) });
    console.log("[La Tarongeta] Reservation submitted:", payload);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSubmitState("success");
    setSubmitted(true);
  };

  const logo = (
    <div className="flex justify-center">
      <Image
        src={asset("/logo.png")}
        alt="La Tarongeta"
        width={340}
        height={54}
        className="w-[300px] h-auto"
        priority
      />
    </div>
  );

  const langToggle = (
    <div className="flex flex-col items-center gap-2 pt-2">
      <span className="text-xs text-gray-500">{t.language}</span>
      <div
        role="group"
        aria-label={t.language}
        className="inline-flex rounded-full border border-orange-200 bg-white p-1 shadow-sm"
      >
        {(["ca", "en"] as Lang[]).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={[
              "px-4 py-1.5 rounded-full text-sm font-semibold transition-colors",
              lang === code
                ? "bg-orange-700 text-white"
                : "text-gray-600 hover:bg-orange-50",
            ].join(" ")}
          >
            {code === "ca" ? "CAT" : "ENG"}
          </button>
        ))}
      </div>
    </div>
  );

  const footer = (
    <footer className="text-center text-xs text-gray-500 pb-4 space-y-4">
      {langToggle}
      <div className="space-y-1">
        <p>La Tarongeta · {t.address}</p>
        <p>
          © {new Date().getFullYear()} {t.rights}
        </p>
      </div>
    </footer>
  );

  // ── Success screen ──────────────────────────────────────────────────────
  if (submitted && submitState === "success") {
    return (
      <main className="min-h-screen bg-amber-50">
        <div className="max-w-lg mx-auto px-4 py-10 space-y-8">
          {logo}
          <div
            ref={successRef}
            tabIndex={-1}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden outline-none"
          >
            <SuccessScreen t={t} formData={form} selectedSlot={selectedSlot} />
          </div>
          {footer}
        </div>
      </main>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-amber-50">
      <div className="max-w-lg mx-auto px-4 py-10 space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          {logo}
          <p className="text-gray-600 text-sm mt-1">{t.address}</p>
        </header>

        {/* Info banner */}
        <div className="rounded-2xl bg-white border border-orange-100 shadow-sm p-4 text-sm text-gray-700 leading-relaxed">
          {t.intro}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* ── Child ──────────────────────────────────────────────── */}
            <section aria-labelledby="child-section">
              <h2
                id="child-section"
                className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4"
              >
                {t.childSection}
              </h2>
              <div className="space-y-4">
                <Field
                  label={t.childName}
                  id="childName"
                  required
                  placeholder={t.childNamePlaceholder}
                  value={form.childName}
                  onChange={(v) => handleChange("childName", v)}
                  error={errors.childName}
                />
                <SelectField
                  label={t.age}
                  id="childAge"
                  required
                  value={form.childAge}
                  onChange={handleAgeChange}
                  error={errors.childAge}
                  placeholder={t.agePlaceholder}
                  options={AGES.map((a) => ({ value: String(a), label: `${a} ${t.years}` }))}
                />
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* ── Schedule ───────────────────────────────────────────── */}
            <section aria-labelledby="schedule-section">
              <h2
                id="schedule-section"
                className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4"
              >
                {t.scheduleSection}
              </h2>
              <SelectField
                label={t.scheduleLabel}
                id="selectedSlotId"
                required
                value={form.selectedSlotId}
                onChange={(v) => handleChange("selectedSlotId", v)}
                error={errors.selectedSlotId}
                placeholder={t.schedulePlaceholder}
                disabled={availableSlots.length === 0}
                options={availableSlots.map((s) => ({
                  value: s.id,
                  label: `${slotLabel(s)} · ${s.ages[0]}–${s.ages[1]} ${t.ages}${
                    s.remainingSpots <= 0 ? ` · ${t.full}` : ""
                  }`,
                  disabled: s.remainingSpots <= 0,
                }))}
              />
              <div className="mt-2 text-xs text-gray-600 space-y-0.5">
                <p>{t.weekdays}</p>
                {selectedSlot?.doorsOpen && (
                  <p>
                    {t.doorsOpen} {selectedSlot.doorsOpen}.
                  </p>
                )}
                <p>{t.maxPerSession}</p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* ── Parents ────────────────────────────────────────────── */}
            <section aria-labelledby="parents-section">
              <h2
                id="parents-section"
                className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4"
              >
                {t.parentsSection}
              </h2>
              <div className="space-y-4">
                <Field
                  label={`${t.parent1} · ${t.whatsappNumber}`}
                  id="whatsapp1"
                  required
                  type="tel"
                  placeholder="612 345 678"
                  value={form.whatsapp1}
                  onChange={(v) => handleChange("whatsapp1", v)}
                  error={errors.whatsapp1}
                />
                <Field
                  label={`${t.parent2} · ${t.whatsappNumber}`}
                  id="whatsapp2"
                  type="tel"
                  placeholder="612 345 678"
                  value={form.whatsapp2}
                  onChange={(v) => handleChange("whatsapp2", v)}
                  error={errors.whatsapp2}
                  hint={t.optional}
                />
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* ── Bizum ──────────────────────────────────────────────── */}
            <section aria-labelledby="bizum-section">
              <h2
                id="bizum-section"
                className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4"
              >
                {t.bizumSection}
              </h2>
              <BizumInfo t={t} selectedSlot={selectedSlot} childName={form.childName} />
            </section>

            <hr className="border-gray-100" />

            {/* ── Notes ──────────────────────────────────────────────── */}
            <section>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-1">
                {t.notes} <span className="text-gray-500 font-normal">{t.optional}</span>
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder={t.notesPlaceholder}
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 resize-none"
              />
            </section>

            {/* ── GDPR ───────────────────────────────────────────────── */}
            <section data-field-error={errors.gdprConsent ? true : undefined}>
              <label className="flex gap-3 items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.gdprConsent}
                  onChange={(e) => handleChange("gdprConsent", e.target.checked)}
                  className="mt-0.5 h-5 w-5 flex-shrink-0 accent-orange-700"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  {t.gdpr} <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.gdprConsent && (
                <p role="alert" className="mt-1.5 text-xs text-red-600">
                  {errors.gdprConsent}
                </p>
              )}
            </section>

            {/* ── CTA ────────────────────────────────────────────────── */}
            {!showSummary ? (
              <button
                type="button"
                onClick={handleReview}
                className="w-full bg-orange-700 hover:bg-orange-800 active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl transition-all shadow-md"
              >
                {t.review}
              </button>
            ) : (
              <div ref={summaryRef} tabIndex={-1} className="space-y-4 outline-none">
                <SummaryCard t={t} formData={form} selectedSlot={selectedSlot} />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSummary(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl text-sm transition-colors"
                  >
                    {t.edit}
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitState === "loading"}
                    className="flex-[2] bg-orange-700 hover:bg-orange-800 active:scale-[0.98] text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitState === "loading" ? (
                      <>
                        <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        {t.sending}
                      </>
                    ) : (
                      t.confirm
                    )}
                  </button>
                </div>

                {submitState === "error" && (
                  <p role="alert" className="text-sm text-red-600 text-center">
                    {t.submitError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {footer}
      </div>
    </main>
  );
}

// ─── Reusable field components ───────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}

const inputBase =
  "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors";

function Field({ id, label, required, type = "text", placeholder, value, onChange, error, hint }: FieldProps) {
  return (
    <div data-field-error={error ? true : undefined}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-600 mb-1">{hint}</p>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          inputBase,
          error ? "border-red-300 focus:ring-red-600 bg-red-50" : "border-gray-200 focus:ring-orange-600",
        ].join(" ")}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  disabled?: boolean;
  options: { value: string; label: string; disabled?: boolean }[];
}

function SelectField({ id, label, required, value, onChange, error, placeholder, disabled, options }: SelectFieldProps) {
  return (
    <div data-field-error={error ? true : undefined}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          inputBase,
          "bg-white disabled:bg-gray-50 disabled:text-gray-500",
          error ? "border-red-300 focus:ring-red-600 bg-red-50" : "border-gray-200 focus:ring-orange-600",
        ].join(" ")}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
