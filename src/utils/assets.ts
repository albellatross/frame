const base = import.meta.env.BASE_URL;

export function assetUrl(path: string): string {
  // Skip data URLs, blob URLs, http(s) URLs, and already-prefixed paths
  if (!path || path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http')) return path;
  if (base !== '/' && path.startsWith(base)) return path;
  // Remove leading slash to avoid double slash
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}
