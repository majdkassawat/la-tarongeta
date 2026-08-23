"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { SCHEDULE_SLOTS } from "@/config/schedule";
import SlotSelector from "@/components/SlotSelector";
import BizumInfo from "@/components/BizumInfo";
import SummaryCard from "@/components/SummaryCard";
import SuccessScreen from "@/components/SuccessScreen";
import { FormData, FormErrors, SubmitState } from "@/types";

const INITIAL_FORM: FormData = {
  parentName: "",
  childName: "",
  childAge: "",
  phone: "",
  whatsapp: "",
  selectedSlotId: "",
  notes: "",
  gdprConsent: false,
};

function sanitize(value: string): string {
  return value.replace(/[<>"']/g, "").trim();
}

function validatePhone(value: string): boolean {
  return /^[6789]\d{8}$/.test(value.replace(/\s|-/g, ""));
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.parentName.trim()) errors.parentName = "Por favor, indica tu nombre completo.";
  if (!data.childName.trim()) errors.childName = "Por favor, indica el nombre del niño/a.";
  if (
    !data.childAge ||
    isNaN(Number(data.childAge)) ||
    Number(data.childAge) < 1 ||
    Number(data.childAge) > 17
  ) {
    errors.childAge = "Por favor, indica una edad válida (1–17 años).";
  }
  if (!data.phone.trim()) {
    errors.phone = "Por favor, indica un teléfono de contacto.";
  } else if (!validatePhone(data.phone)) {
    errors.phone = "El número de teléfono no parece válido (ej: 612 345 678).";
  }
  if (!data.whatsapp.trim()) {
    errors.whatsapp = "Por favor, indica tu número de WhatsApp.";
  } else if (!validatePhone(data.whatsapp)) {
    errors.whatsapp = "El número de WhatsApp no parece válido (ej: 612 345 678).";
  }
  if (!data.selectedSlotId) errors.selectedSlotId = "Por favor, selecciona un horario.";
  if (!data.gdprConsent)
    errors.gdprConsent = "Debes aceptar la política de privacidad para continuar.";

  return errors;
}

export default function ReservaPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [showSummary, setShowSummary] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedSlot = SCHEDULE_SLOTS.find((s) => s.id === form.selectedSlotId) ?? null;

  const handleChange = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleReview = () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrorEl = document.querySelector("[data-field-error]");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setShowSummary(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (submitState === "loading") return; // anti-double-submit
    setSubmitState("loading");

    const payload = {
      parentName: sanitize(form.parentName),
      childName: sanitize(form.childName),
      childAge: form.childAge,
      phone: sanitize(form.phone),
      whatsapp: sanitize(form.whatsapp),
      selectedSlotId: form.selectedSlotId,
      slotLabel: selectedSlot
        ? `${selectedSlot.day} ${selectedSlot.startTime}–${selectedSlot.endTime}`
        : "",
      notes: sanitize(form.notes),
      submittedAt: new Date().toISOString(),
    };

    // TODO: Replace with real API call
    // await fetch("/api/reservations", { method: "POST", body: JSON.stringify(payload) });
    console.log("[La Tarongeta] Reservation submitted:", payload);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setSubmitState("success");
    setSubmitted(true);
  };

  // ── Success screen ──────────────────────────────────────────────────────
  if (submitted && submitState === "success") {
    return (
      <main className="min-h-screen bg-amber-50">
        <div className="max-w-lg mx-auto px-4 py-10">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.jpg"
              alt="La Tarongeta"
              width={320}
              height={96}
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <SuccessScreen formData={form} selectedSlot={selectedSlot} />
          </div>
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
          <div className="text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              ← Volver a la portada
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="/logo.jpg"
              alt="La Tarongeta"
              width={340}
              height={100}
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1 mt-1">
            <span>📍</span> Sant Andreu, Barcelona
          </p>
          <p className="text-gray-700 text-base font-medium">
            Reserva una plaza para tu peque
          </p>
        </header>

        {/* Info banner */}
        <div className="rounded-2xl bg-white border border-orange-100 shadow-sm p-4 text-sm text-gray-600 leading-relaxed">
          Rellena el formulario, elige tu horario y envía el Bizum para asegurar
          la plaza. Te confirmaremos la reserva por WhatsApp en cuanto recibamos
          el pago. 🧡
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 space-y-6">

            {/* ── Parent ─────────────────────────────────────────────── */}
            <section aria-labelledby="parent-section">
              <h2
                id="parent-section"
                className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4"
              >
                Datos del padre / madre
              </h2>
              <Field
                label="Nombre completo"
                id="parentName"
                required
                placeholder="María García López"
                value={form.parentName}
                onChange={(v) => handleChange("parentName", v)}
                error={errors.parentName}
              />
            </section>

            <hr className="border-gray-100" />

            {/* ── Child ──────────────────────────────────────────────── */}
            <section aria-labelledby="child-section">
              <h2
                id="child-section"
                className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4"
              >
                Datos del niño / niña
              </h2>
              <div className="space-y-4">
                <Field
                  label="Nombre completo"
                  id="childName"
                  required
                  placeholder="Pablo García López"
                  value={form.childName}
                  onChange={(v) => handleChange("childName", v)}
                  error={errors.childName}
                />
                <Field
                  label="Edad"
                  id="childAge"
                  required
                  type="number"
                  placeholder="7"
                  min="1"
                  max="17"
                  value={form.childAge}
                  onChange={(v) => handleChange("childAge", v)}
                  error={errors.childAge}
                  hint="Entre 1 y 17 años"
                />
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* ── Contact ────────────────────────────────────────────── */}
            <section aria-labelledby="contact-section">
              <h2
                id="contact-section"
                className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4"
              >
                Contacto
              </h2>
              <div className="space-y-4">
                <Field
                  label="Teléfono"
                  id="phone"
                  required
                  type="tel"
                  placeholder="612 345 678"
                  value={form.phone}
                  onChange={(v) => handleChange("phone", v)}
                  error={errors.phone}
                />
                <Field
                  label="WhatsApp"
                  id="whatsapp"
                  required
                  type="tel"
                  placeholder="612 345 678"
                  value={form.whatsapp}
                  onChange={(v) => handleChange("whatsapp", v)}
                  error={errors.whatsapp}
                  hint="Si es el mismo número, repítelo aquí"
                />
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* ── Schedule ───────────────────────────────────────────── */}
            <section aria-labelledby="schedule-section">
              <h2
                id="schedule-section"
                className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4"
              >
                Horario semanal
              </h2>
              <SlotSelector
                slots={SCHEDULE_SLOTS}
                selectedSlotId={form.selectedSlotId}
                onSelect={(id) => handleChange("selectedSlotId", id)}
                error={errors.selectedSlotId}
              />
            </section>

            <hr className="border-gray-100" />

            {/* ── Bizum ──────────────────────────────────────────────── */}
            <section aria-labelledby="bizum-section">
              <h2
                id="bizum-section"
                className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4"
              >
                Pago con Bizum
              </h2>
              <BizumInfo selectedSlot={selectedSlot} parentName={form.parentName} />
            </section>

            <hr className="border-gray-100" />

            {/* ── Notes ──────────────────────────────────────────────── */}
            <section>
              <label
                htmlFor="notes"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Comentarios{" "}
                <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder="Alergias, necesidades especiales, preguntas…"
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none"
              />
            </section>

            {/* ── GDPR ───────────────────────────────────────────────── */}
            <section data-field-error={errors.gdprConsent ? true : undefined}>
              <label className="flex gap-3 items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.gdprConsent}
                  onChange={(e) => handleChange("gdprConsent", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400 flex-shrink-0"
                />
                <span className="text-xs text-gray-500 leading-relaxed">
                  He leído y acepto la{" "}
                  <a
                    href="#"
                    className="text-orange-500 underline hover:text-orange-600"
                  >
                    política de privacidad
                  </a>
                  . Los datos facilitados se utilizarán únicamente para gestionar
                  esta reserva.{" "}
                  <span className="text-red-500">*</span>
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
                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl transition-all shadow-md"
              >
                Revisar mi reserva →
              </button>
            ) : (
              <div className="space-y-4">
                <SummaryCard formData={form} selectedSlot={selectedSlot} />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSummary(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl text-sm transition-colors"
                  >
                    ← Editar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitState === "loading"}
                    className="flex-[2] bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitState === "loading" ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                          />
                        </svg>
                        Enviando…
                      </>
                    ) : (
                      "Confirmar solicitud ✓"
                    )}
                  </button>
                </div>

                {submitState === "error" && (
                  <p role="alert" className="text-sm text-red-600 text-center">
                    Ha ocurrido un error. Por favor, inténtalo de nuevo.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <footer className="text-center text-xs text-gray-400 pb-4 space-y-1">
          <p>La Tarongeta · Sant Andreu, Barcelona</p>
          <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
        </footer>
      </div>
    </main>
  );
}

// ─── Reusable Field component ────────────────────────────────────────────────

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
  min?: string;
  max?: string;
}

function Field({
  id,
  label,
  required,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  hint,
  min,
  max,
}: FieldProps) {
  return (
    <div data-field-error={error ? true : undefined}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors",
          error
            ? "border-red-300 focus:ring-red-300 bg-red-50"
            : "border-gray-200 focus:ring-orange-300",
        ].join(" ")}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
