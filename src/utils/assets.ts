const base = import.meta.env.BASE_URL;

export function assetUrl(path: string): string {
  // Remove leading slash to avoid double slash
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}
