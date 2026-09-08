"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AGE_GROUPS, Counts, DAYS, groupById, remainingSpots } from "@/config/schedule";
import { SIGNUP_API, asset } from "@/config/site";
import { DICTS, Lang } from "@/i18n";
import PaymentInfo from "@/components/PaymentInfo";
import SummaryCard from "@/components/SummaryCard";
import SuccessScreen from "@/components/SuccessScreen";
import { Day, ErrorKey, FormData, FormErrors, SubmitState } from "@/types";

const LANG_KEY = "lt-lang";

const INITIAL_FORM: FormData = {
  childName: "",
  ageGroup: "",
  slot: "",
  day: "",
  contact1Name: "",
  contact1Whatsapp: "",
  contact2Name: "",
  contact2Whatsapp: "",
  notes: "",
  paymentConsent: false,
  dataConsent: false,
  photoConsent: false,
  newsConsent: false,
};

/** Strip angle brackets only: apostrophes are part of Catalan names (d'Amat, l'ou). */
function sanitize(value: string): string {
  return value.replace(/[<>]/g, "").trim();
}

/** Spanish numbers (optionally with 34 / +34 / 0034) or any international +number */
function validatePhone(value: string): boolean {
  const v = value.replace(/[\s\-().]/g, "").replace(/^00/, "+");
  if (v.startsWith("+")) return /^\+\d{8,15}$/.test(v);
  return /^(34)?[6789]\d{8}$/.test(v);
}

function allDaysFull(groupId: string, counts: Counts): boolean {
  const group = groupById(groupId);
  return !!group && DAYS.every((d) => remainingSpots(group.id, d, counts) <= 0);
}

/** Returns dictionary keys, not text, so messages follow the language toggle. */
function validate(data: FormData, counts: Counts): FormErrors {
  const errors: FormErrors = {};
  if (!data.childName.trim()) errors.childName = "errChildName";
  if (!data.ageGroup) errors.ageGroup = "errAgeGroup";
  if (data.ageGroup && !data.slot) errors.slot = "errSlot";
  if (data.slot && !data.day) {
    errors.day = allDaysFull(data.ageGroup, counts) ? "errGroupFull" : "errDay";
  } else if (data.ageGroup && data.day && remainingSpots(data.ageGroup as "g35" | "g68", data.day as Day, counts) <= 0) {
    errors.day = "errDayFull";
  }
  if (!data.contact1Name.trim()) errors.contact1Name = "errContactName";
  if (!data.contact1Whatsapp.trim()) {
    errors.contact1Whatsapp = "errWhatsapp";
  } else if (!validatePhone(data.contact1Whatsapp)) {
    errors.contact1Whatsapp = "errWhatsappInvalid";
  }
  // The second contact is optional, but if it is started it needs both a name and a number.
  const c2Name = data.contact2Name.trim();
  const c2Phone = data.contact2Whatsapp.trim();
  if (c2Phone && !validatePhone(c2Phone)) errors.contact2Whatsapp = "errWhatsappInvalid";
  if (c2Name && !c2Phone) errors.contact2Whatsapp = "errWhatsapp";
  if (c2Phone && !c2Name) errors.contact2Name = "errContactName";
  if (!data.paymentConsent) errors.paymentConsent = "errPaymentConsent";
  if (!data.dataConsent) errors.dataConsent = "errDataConsent";
  return errors;
}

/** What gets sent: trimmed, without angle brackets. Validation runs on this. */
function cleanForm(form: FormData): FormData {
  return {
    ...form,
    childName: sanitize(form.childName),
    contact1Name: sanitize(form.contact1Name),
    contact1Whatsapp: sanitize(form.contact1Whatsapp),
    contact2Name: sanitize(form.contact2Name),
    contact2Whatsapp: sanitize(form.contact2Whatsapp),
    notes: sanitize(form.notes),
  };
}

/** Maps a 400 {error, field} from the API back onto the form. */
function apiFieldError(field: string, error: string): FormErrors {
  const invalid = error === "invalid";
  switch (field) {
    case "childName": return { childName: "errChildName" };
    case "ageGroup": return { ageGroup: "errAgeGroup" };
    case "day": return { day: "errDay" };
    case "contact1Name": return { contact1Name: "errContactName" };
    case "contact2Name": return { contact2Name: "errContactName" };
    case "contact1Whatsapp": return { contact1Whatsapp: invalid ? "errWhatsappInvalid" : "errWhatsapp" };
    case "contact2Whatsapp": return { contact2Whatsapp: invalid ? "errWhatsappInvalid" : "errWhatsapp" };
    case "paymentConsent": return { paymentConsent: "errPaymentConsent" };
    case "dataConsent": return { dataConsent: "errDataConsent" };
    default: return {};
  }
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
  const [counts, setCounts] = useState<Counts>({});
  const [website, setWebsite] = useState(""); // honeypot, stays empty for people
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Remember the visitor's language and keep <html lang> in sync.
  // The saved preference is applied after hydration on purpose (the static
  // HTML is Catalan), so this setState must live in an effect.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "ca" || saved === "en") setLang(saved);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.title;
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {}
  }, [lang, t.htmlLang, t.title]);

  // Spots already taken per session, so full days are disabled up front.
  // If the API is unreachable every day stays selectable; the server still
  // enforces the cap on submit.
  const loadCounts = useCallback(async (): Promise<Counts | null> => {
    try {
      const r = await fetch(`${SIGNUP_API}?view=availability`, { cache: "no-store" });
      if (!r.ok) return null;
      const data = (await r.json()) as { counts?: Counts };
      const fresh = data.counts ?? {};
      setCounts(fresh);
      return fresh;
    } catch {
      return null;
    }
  }, []);
  useEffect(() => {
    void loadCounts();
  }, [loadCounts]);

  useEffect(() => {
    if (showSummary) summaryRef.current?.focus();
  }, [showSummary]);
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const group = groupById(form.ageGroup);
  const err = (field: keyof FormData): string | undefined => {
    const key: ErrorKey | undefined = errors[field];
    return key ? t[key] : undefined;
  };

  // Any edit collapses the summary so the review step is a real gate.
  // The two second-contact fields validate as a pair, so clear both together.
  const handleChange = useCallback((field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) =>
      field === "contact2Name" || field === "contact2Whatsapp"
        ? { ...prev, contact2Name: undefined, contact2Whatsapp: undefined }
        : { ...prev, [field]: undefined },
    );
    setShowSummary(false);
    setSubmitState((s) => (s === "error" ? "idle" : s));
  }, []);

  // Each age group has exactly one time slot, so it is pre-selected;
  // the day is chosen afterwards.
  const handleAgeGroupChange = (value: string) => {
    setForm((prev) => ({ ...prev, ageGroup: value, slot: value ? value : "", day: "" }));
    setErrors((prev) => ({ ...prev, ageGroup: undefined, slot: undefined, day: undefined }));
    setShowSummary(false);
    setSubmitState((s) => (s === "error" ? "idle" : s));
  };

  const handleReview = () => {
    const errs = validate(cleanForm(form), counts);
    if (Object.keys(errs).length > 0) {
      flushSync(() => setErrors(errs));
      scrollToFirstError();
      return;
    }
    setErrors({});
    setSubmitState((s) => (s === "error" ? "idle" : s));
    setShowSummary(true);
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  const handleSubmit = async () => {
    if (submitState === "loading") return; // anti-double-submit
    const clean = cleanForm(form);
    const errs = validate(clean, counts);
    if (Object.keys(errs).length > 0) {
      flushSync(() => {
        setErrors(errs);
        setShowSummary(false);
      });
      scrollToFirstError();
      return;
    }
    setErrors({});
    setSubmitState("loading");

    const payload = {
      childName: clean.childName,
      ageGroup: clean.ageGroup,
      day: clean.day,
      contact1Name: clean.contact1Name,
      contact1Whatsapp: clean.contact1Whatsapp,
      contact2Name: clean.contact2Name,
      contact2Whatsapp: clean.contact2Whatsapp,
      notes: clean.notes,
      paymentConsent: clean.paymentConsent,
      dataConsent: clean.dataConsent,
      photoConsent: clean.photoConsent,
      newsConsent: clean.newsConsent,
      language: lang,
      website,
    };

    const backToForm = (fieldErrors: FormErrors) => {
      flushSync(() => {
        setErrors(fieldErrors);
        setShowSummary(false);
        setSubmitState("idle");
      });
      scrollToFirstError();
    };

    try {
      const res = await fetch(SIGNUP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 409) {
        // Someone took the last spot of that session in the meantime.
        const fresh = (await loadCounts()) ?? counts;
        backToForm({ day: allDaysFull(clean.ageGroup, fresh) ? "errGroupFull" : "errDayFull" });
        return;
      }
      if (res.status === 400) {
        const data = (await res.json().catch(() => ({}))) as { error?: string; field?: string };
        const fieldErrors = data.field ? apiFieldError(data.field, data.error ?? "") : {};
        if (Object.keys(fieldErrors).length > 0) {
          backToForm(fieldErrors);
          return;
        }
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitState("success");
      setSubmitted(true);
    } catch (err) {
      console.error("[La Tarongeta] sign-up failed:", err);
      setSubmitState("error");
    }
  };

  const logo = (
    <h1 className="flex justify-center">
      <Image
        src={asset("/logo.png")}
        alt="La Tarongeta"
        width={340}
        height={54}
        className="w-[300px] h-auto"
        priority
      />
    </h1>
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
              lang === code ? "bg-orange-700 text-white" : "text-gray-600 hover:bg-orange-50",
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
            <SuccessScreen t={t} formData={form} />
          </div>
          {footer}
        </div>
      </main>
    );
  }

  const dayOptions = group
    ? DAYS.map((d) => {
        const left = remainingSpots(group.id, d, counts);
        return {
          value: d,
          label: left <= 0 ? `${t.days[d]} · ${t.full}` : t.days[d],
          disabled: left <= 0,
        };
      })
    : [];
  const groupFull = !!group && allDaysFull(group.id, counts);

  // ── Main form ───────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-amber-50">
      <div className="max-w-lg mx-auto px-4 py-10 space-y-6">
        {/* Header */}
        <header className="text-center space-y-3">
          {logo}
          <p className="text-gray-700 text-sm italic leading-relaxed">{t.tagline}</p>
          <p className="text-gray-600 text-sm">{t.address}</p>
        </header>

        {/* Intro box */}
        <Box>
          <p className="text-sm text-gray-700 leading-relaxed">{t.intro}</p>
        </Box>

        {/* ── Child ────────────────────────────────────────────────── */}
        <Box title={t.childSection} id="child-section">
          <Field
            label={t.childName}
            id="childName"
            required
            placeholder={t.childNamePlaceholder}
            value={form.childName}
            onChange={(v) => handleChange("childName", v)}
            error={err("childName")}
            autoComplete="off"
            maxLength={120}
          />
        </Box>

        {/* ── Schedule ─────────────────────────────────────────────── */}
        <Box title={t.scheduleSection} id="schedule-section">
          <div className="space-y-4">
            <SelectField
              label={t.ageQuestion}
              id="ageGroup"
              required
              value={form.ageGroup}
              onChange={handleAgeGroupChange}
              error={err("ageGroup")}
              placeholder={t.agePlaceholder}
              options={AGE_GROUPS.map((g) => ({ value: g.id, label: t.ageGroupLabel(g) }))}
            />
            {group && (
              <SelectField
                label={t.slotQuestion}
                id="slot"
                required
                value={form.slot}
                onChange={(v) => handleChange("slot", v)}
                error={err("slot")}
                placeholder={t.slotPlaceholder}
                options={[{ value: group.id, label: t.slotLabel(group) }]}
                note={t.doorsNote(group) || undefined}
              />
            )}
            {group && form.slot && (
              <SelectField
                label={t.dayQuestion}
                id="day"
                required
                value={form.day}
                onChange={(v) => handleChange("day", v)}
                error={err("day")}
                placeholder={t.dayPlaceholder}
                options={dayOptions}
                note={groupFull && !errors.day ? t.errGroupFull : undefined}
              />
            )}
          </div>
        </Box>

        {/* ── Contacts ─────────────────────────────────────────────── */}
        <Box title={t.contactsSection} id="contacts-section">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800">{t.contact1Title}</h3>
              <Field
                label={t.contactName}
                id="contact1Name"
                required
                value={form.contact1Name}
                onChange={(v) => handleChange("contact1Name", v)}
                error={err("contact1Name")}
                autoComplete="name"
                maxLength={120}
              />
              <Field
                label={t.contactWhatsapp}
                id="contact1Whatsapp"
                required
                type="tel"
                placeholder="612 345 678"
                value={form.contact1Whatsapp}
                onChange={(v) => handleChange("contact1Whatsapp", v)}
                error={err("contact1Whatsapp")}
                autoComplete="tel"
                maxLength={40}
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800">
                {t.contact2Title} <span className="font-normal text-gray-500">{t.optional}</span>
              </h3>
              <Field
                label={t.contactName}
                id="contact2Name"
                value={form.contact2Name}
                onChange={(v) => handleChange("contact2Name", v)}
                error={err("contact2Name")}
                autoComplete="name"
                maxLength={120}
              />
              <Field
                label={t.contactWhatsapp}
                id="contact2Whatsapp"
                type="tel"
                placeholder="612 345 678"
                value={form.contact2Whatsapp}
                onChange={(v) => handleChange("contact2Whatsapp", v)}
                error={err("contact2Whatsapp")}
                autoComplete="tel"
                maxLength={40}
              />
            </div>
          </div>
        </Box>

        {/* ── Payment ──────────────────────────────────────────────── */}
        <Box title={t.paymentSection} id="payment-section">
          <PaymentInfo
            t={t}
            consent={form.paymentConsent}
            onConsentChange={(v) => handleChange("paymentConsent", v)}
            error={err("paymentConsent")}
          />
        </Box>

        {/* ── Other ────────────────────────────────────────────────── */}
        <Box title={t.otherSection} id="other-section">
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-1">
            {t.notes} <span className="text-gray-500 font-normal">{t.optional}</span>
          </label>
          <textarea
            id="notes"
            rows={3}
            maxLength={2000}
            placeholder={t.notesPlaceholder}
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-600 resize-none"
          />
        </Box>

        {/* ── Data protection + consents (small text, bottom) ─────── */}
        <section className="text-xs text-gray-600 leading-relaxed space-y-3 px-1">
          <p className="font-bold text-gray-700">{t.dpTitle}</p>
          <p>
            {t.dpBody.map(([label, text], i) => (
              <span key={label}>
                {i > 0 && " | "}
                <span className="font-bold">{label}</span> {text}
              </span>
            ))}
          </p>
          <Consent
            id="dataConsent"
            checked={form.dataConsent}
            onChange={(v) => handleChange("dataConsent", v)}
            error={err("dataConsent")}
            text={t.dataConsent}
            suffix={t.required}
            required
          />
          <Consent
            id="photoConsent"
            checked={form.photoConsent}
            onChange={(v) => handleChange("photoConsent", v)}
            text={t.photoConsent}
            suffix={t.optional}
          />
          <Consent
            id="newsConsent"
            checked={form.newsConsent}
            onChange={(v) => handleChange("newsConsent", v)}
            text={t.newsConsent}
            suffix={t.optional}
          />
        </section>

        {/* Honeypot for bots: off-screen, skipped by keyboard and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* ── CTA ──────────────────────────────────────────────────── */}
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
            <SummaryCard t={t} formData={form} />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSummary(false);
                  setSubmitState((s) => (s === "error" ? "idle" : s));
                }}
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

        {footer}
      </div>
    </main>
  );
}

// ─── Layout + field components ───────────────────────────────────────────────

function Box({ title, id, children }: { title?: string; id?: string; children: React.ReactNode }) {
  return (
    <section
      aria-labelledby={title && id ? `${id}-title` : undefined}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6"
    >
      {title && (
        <h2 id={`${id}-title`} className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function Consent({
  id, checked, onChange, error, text, suffix, required,
}: {
  id: string; checked: boolean; onChange: (v: boolean) => void; error?: string; text: string; suffix: string; required?: boolean;
}) {
  return (
    <div data-field-error={error ? true : undefined}>
      <label htmlFor={id} className="flex gap-3 items-start cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-required={required || undefined}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 flex-shrink-0 accent-orange-700"
        />
        <span>
          <span className="font-semibold text-gray-700">{text}</span>{" "}
          <span className="italic">{suffix}</span>
          {required && <span className="text-red-700"> *</span>}
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

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
  autoComplete?: string;
  maxLength?: number;
}

// 16px controls: anything smaller makes iOS Safari zoom in on focus.
const inputBase =
  "w-full rounded-xl border px-4 py-3 text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors";

function Field({ id, label, required, type = "text", placeholder, value, onChange, error, hint, autoComplete, maxLength }: FieldProps) {
  return (
    <div data-field-error={error ? true : undefined}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-700 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-600 mb-1">{hint}</p>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-required={required || undefined}
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
  /** Small helper text under the control */
  note?: string;
}

function SelectField({ id, label, required, value, onChange, error, placeholder, disabled, options, note }: SelectFieldProps) {
  return (
    <div data-field-error={error ? true : undefined}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-700 ml-0.5">*</span>}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required || undefined}
        aria-invalid={!!error}
        aria-describedby={[error ? `${id}-error` : "", note ? `${id}-note` : ""].filter(Boolean).join(" ") || undefined}
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
      {note && (
        <p id={`${id}-note`} className="mt-1 text-xs text-gray-600">
          {note}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
