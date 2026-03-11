"use client";

import { BIZUM_CONFIG } from "@/config/bizum";
import { FormData, ScheduleSlot } from "@/types";

interface SuccessScreenProps {
  formData: FormData;
  selectedSlot: ScheduleSlot | null;
}

export default function SuccessScreen({ formData, selectedSlot }: SuccessScreenProps) {
  const slotLabel = selectedSlot
    ? `${selectedSlot.day} de ${selectedSlot.startTime} a ${selectedSlot.endTime}`
    : "el horario seleccionado";

  const waMessage = encodeURIComponent(
    BIZUM_CONFIG.whatsappMessage(formData.parentName, slotLabel)
  );
  const waLink = `https://wa.me/${BIZUM_CONFIG.WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className="text-center space-y-6 py-8 px-4">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl shadow-inner">
          🎉
        </div>
      </div>

      {/* Headline */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-gray-800">
          ¡Solicitud recibida!
        </h2>
        <p className="text-gray-500 text-sm">
          Hemos recibido tu solicitud para{" "}
          <strong className="text-gray-700">{formData.childName}</strong> en el
          horario de{" "}
          <strong className="text-orange-600">{slotLabel}</strong>.
        </p>
      </div>

      {/* Steps */}
      <div className="rounded-2xl bg-orange-50 border border-orange-200 p-5 text-left space-y-3">
        <p className="text-sm font-bold text-orange-800">Próximos pasos:</p>
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-lg">💛</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Envía el Bizum ahora
              </p>
              <p className="text-xs text-gray-500">
                {BIZUM_CONFIG.BIZUM_AMOUNT} al {BIZUM_CONFIG.BIZUM_PHONE} ({BIZUM_CONFIG.BIZUM_ALIAS})
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-lg">💬</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Espera nuestra confirmación por WhatsApp
              </p>
              <p className="text-xs text-gray-500">
                Te escribiremos al {formData.whatsapp} para confirmar la plaza.
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="flex-shrink-0 text-lg">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                La plaza se confirma solo tras el Bizum
              </p>
              <p className="text-xs text-gray-500">
                Hasta recibir el pago y confirmarte, la plaza no está garantizada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 px-4 transition-colors text-sm"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Avisar por WhatsApp que he enviado el Bizum
      </a>

      <p className="text-xs text-gray-400">
        ¿Dudas? Escríbenos al WhatsApp o consulta con nosotros directamente.
      </p>
    </div>
  );
}
