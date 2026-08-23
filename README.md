# La Tarongeta

Sitio web de **La Tarongeta**, extraescolares creativas en inglés en Sant
Andreu (Barcelona): un espacio de talleres basado en el proceso donde
niños y niñas curiosos de 3 a 10 años exploran el arte y el lenguaje en un
ambiente relajado, natural y de habla inglesa. El diseño de la portada
recrea el cartel de cartón hecho a mano (inglés/catalán) que anuncia la
apertura en el local.

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
npm run dev    # http://localhost:3000/la-tarongeta
npm run build  # export estático en app/out/
npm run lint
```

## Publicación

El sitio se sirve como export estático bajo
**[yaqtin.net/la-tarongeta](https://yaqtin.net/la-tarongeta)** (mismo patrón
que `ai-readiness` en yaqtin-website). Con un checkout de `yaqtin-website`
al lado de este repositorio:

```bash
cd app
npm run export:site   # build + copia el export a ../yaqtin-website/la-tarongeta
```

Después, commit y push en `yaqtin-website` para desplegar (Vercel sirve ese
repositorio tal cual, sin build).

## Configuración

- `app/src/config/schedule.ts` — horarios semanales y plazas disponibles.
- `app/src/config/bizum.ts` — teléfono de Bizum, precio mensual y número
  de WhatsApp (contiene *placeholders* que hay que sustituir antes de
  publicar).
