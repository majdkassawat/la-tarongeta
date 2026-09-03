/**
 * Must match `basePath` in next.config.ts. next/image does not apply the
 * basePath to unoptimized static srcs, so public/ assets are referenced
 * through asset().
 */
export const BASE_PATH = "/la-tarongeta";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
