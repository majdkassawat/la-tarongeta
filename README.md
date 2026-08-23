# La Tarongeta

Sitio web de **La Tarongeta**, un espacio creativo sin pantallas en Sant
Andreu (Barcelona) donde los peques exploran el arte y el inglés en un
ambiente relajado y natural. El diseño de la portada recrea el cartel de
cartón hecho a mano que anuncia la apertura en el local.

## Estructura

- `/` — portada estilo "cartel de cartón": qué es La Tarongeta,
  actividades, horarios, cómo reservar y contacto.
- `/reserva` — formulario de reserva de plaza (Bizum + confirmación por
  WhatsApp).

La aplicación vive en [`app/`](app) (Next.js + TypeScript + Tailwind CSS).

## Desarrollo

```bash
cd app
npm install
npm run dev    # http://localhost:3000
npm run build  # build de producción
npm run lint
```

## Configuración

- `app/src/config/schedule.ts` — horarios semanales y plazas disponibles.
- `app/src/config/bizum.ts` — teléfono de Bizum, precio mensual y número
  de WhatsApp (contiene *placeholders* que hay que sustituir antes de
  publicar).
