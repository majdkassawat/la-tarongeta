/**
 * Must match `basePath` in next.config.ts. next/image does not apply the
 * basePath to unoptimized static srcs, so public/ assets are referenced
 * through asset().
 */
export const BASE_PATH = "/la-tarongeta";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

/**
 * Sign-up API (yaqtin-website/api/la-tarongeta.js), always same-origin: the
 * export is served from yaqtin.net next to the function. For local work run
 * `node scripts/dev-la-tarongeta.cjs` in yaqtin-website, which serves the
 * published export and the function together.
 */
export const SIGNUP_API = "/api/la-tarongeta";
