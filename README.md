# La Tarongeta

Formulari de reserva de plaça de **La Tarongeta**, extraescolars creatives
en anglès a Sant Andreu (Barcelona) — Carrer de Castellbell, 12, 08030.
El lloc és en català amb un commutador CAT / ENG al peu de pàgina.

L'aplicació viu a [`app/`](app) (Next.js + TypeScript + Tailwind CSS).

## Desenvolupament

```bash
cd app
npm install
npm run dev    # http://localhost:3000/la-tarongeta
npm run build  # export estàtic a app/out/
npm run lint
```

## Configuració

- `app/src/config/schedule.ts` — sessions per franja d'edat (3–4, 5–6, 7–8),
  horaris i places disponibles.
- `app/src/config/bizum.ts` — telèfon del Bizum, import i número de WhatsApp.
- `app/src/i18n.ts` — tots els textos en català i anglès.

## Publicació

El lloc es serveix com a export estàtic sota
**[yaqtin.net/la-tarongeta](https://yaqtin.net/la-tarongeta)** (mateix patró
que `ai-readiness` a yaqtin-website). Amb un checkout de `yaqtin-website`
al costat d'aquest repositori:

```bash
cd app
npm run export:site   # build + copia l'export a ../yaqtin-website/la-tarongeta
```

Després, commit i push a `yaqtin-website` per desplegar (Vercel serveix
aquell repositori tal qual, sense build).
