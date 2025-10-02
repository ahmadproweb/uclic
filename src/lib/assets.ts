export const ASSETS_BASE_URL: string =
  process.env.NEXT_PUBLIC_ASSETS_BASE_URL ?? 'https://static.uclic.fr';

export function getAssetUrl(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (!ASSETS_BASE_URL) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${ASSETS_BASE_URL}${normalized}`;
}

// Frequently used assets
export const backgroundEffectUrl: string = getAssetUrl('/backgroundeffect.png');
export const logoPngUrl: string = getAssetUrl('/logo.png');
export const heroImageUrl: string = getAssetUrl('/heroo.png');


