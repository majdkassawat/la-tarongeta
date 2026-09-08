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

- `app/src/config/schedule.ts` — franges d'edat (3–5 i 6–8), horari de cada
  franja, dies de la setmana i capacitat per sessió (`CAPACITY`). Les places
  ocupades les diu l'API (vegeu *Inscripcions*).
- `app/src/config/site.ts` — `basePath` i l'adreça de l'API d'inscripcions
  (`NEXT_PUBLIC_SIGNUP_API`, per defecte `/api/la-tarongeta`).
- `app/src/config/contact.ts` — telèfon de contacte i número de WhatsApp.
- `app/src/i18n.ts` — tots els textos en català i anglès (inclosos el
  calendari de pagaments PayGold i el text de protecció de dades).

## Inscripcions

El formulari envia cada inscripció a `POST /api/la-tarongeta`, una funció de
Vercel que viu a `yaqtin-website/api/la-tarongeta.js` (la capçalera del
fitxer ho explica amb detall):

1. **Vercel Blob** és el registre i l'única font de veritat per a les places:
   cada inscripció és un fitxer JSON `la-tarongeta/signups/<grup>-<dia>/<n>-<etiqueta>.json`
   amb l'identificador `<grup>-<dia>-<n>`. El número `n` es reserva de manera
   atòmica, així dues famílies no poden quedar-se l'última plaça alhora.
   Les inscripcions contenen noms i telèfons: cal un magatzem Blob **privat**
   connectat al projecte de Vercel amb el prefix de variables `LA_TARONGETA`
   (injecta `LA_TARONGETA_READ_WRITE_TOKEN`). Mentre no existeixi, la funció
   fa servir el magatzem públic del lloc (`BLOB_READ_WRITE_TOKEN`) amb noms de
   fitxer que porten una etiqueta derivada del token i no es poden endevinar.
2. **Full de càlcul de Google** *La Tarongeta · Inscripcions*: quan el compte
   de servei està configurat a Vercel (`GOOGLE_SERVICE_ACCOUNT_EMAIL`,
   `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`; opcionalment `LA_TARONGETA_SHEET_ID`
   i `LA_TARONGETA_SHEET_TAB`), cada inscripció s'hi afegeix com a fila. Si
   l'afegit falla, la inscripció compta igualment i `?view=sync` la copia
   després. Una fila amb l'*Estat* «cancel·lada» allibera la plaça (es llegeix
   com a molt un cop per minut).

Cada sessió (franja d'edat + dia) admet 10 criatures: el formulari demana les
places ocupades a `GET /api/la-tarongeta?view=availability` i desactiva els
dies plens, i el servidor rebutja (409) una inscripció en una sessió plena.

**Pàgina d'administració:** [yaqtin.net/la-tarongeta/admin](https://yaqtin.net/la-tarongeta/admin)
(fitxers a `yaqtin-website/la-tarongeta/admin/`, que `npm run export:site`
conserva). Amb la clau `LA_TARONGETA_ADMIN_KEY` mostra les places per sessió i
totes les inscripcions, permet cancel·lar-ne una (allibera la plaça),
restaurar-la o esborrar-la, i descarrega el CSV.

Vistes de l'API que fa servir (cal la mateixa clau, sempre com a capçalera
`Authorization: Bearer …`, mai a l'URL):

- `GET /api/la-tarongeta?view=export` — totes les inscripcions en CSV.
- `GET /api/la-tarongeta?view=sync` — copia al full les inscripcions que hi
  falten (útil just després d'activar el compte de servei).
- `GET /api/la-tarongeta?view=json` — totes les inscripcions i el recompte de
  places, per a la pàgina d'administració.
- `PATCH /api/la-tarongeta?id=<grup>-<dia>-<n>&status=cancelled|active` —
  cancel·la (allibera la plaça) o restaura una inscripció; la cancel·lació és
  un fitxer marcador `la-tarongeta/cancelled/<id>-<etiqueta>.json`.
- `DELETE /api/la-tarongeta?id=<grup>-<dia>-<n>` — esborra el fitxer d'una
  inscripció (una prova, un duplicat) i allibera la plaça; no es pot desfer.
  La fila del full, si n'hi ha, s'esborra o es marca a mà.

Per provar-ho en local, des d'un checkout de `yaqtin-website` amb l'export ja
publicat: `node scripts/dev-la-tarongeta.cjs` serveix el formulari i la funció
al mateix origen (http://localhost:3299/la-tarongeta) amb un Blob en memòria.

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
