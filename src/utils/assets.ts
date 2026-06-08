const base = import.meta.env.BASE_URL;

export function assetUrl(path: string): string {
  // Skip data URLs, blob URLs, http(s) URLs, and already-prefixed paths
  if (!path || path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http')) return path;
  if (base !== '/' && path.startsWith(base)) return path;
  // Remove leading slash to avoid double slash
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}

const PROJECT_COVER_THUMBNAILS = new Set([
  'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9',
  'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19',
]);

const TIMELINE_THUMBNAILS = new Set(['c1', 'c2', 'c3', 'c4']);

export function projectCoverAsset(project: { id: string; coverImage: string }): string {
  if (PROJECT_COVER_THUMBNAILS.has(project.id)) {
    return assetUrl(`/projects/cover-thumbnails/${project.id}.webp`);
  }

  return assetUrl(project.coverImage);
}

export function timelineImageAsset(stage: { id: string; image: string }): string {
  if (TIMELINE_THUMBNAILS.has(stage.id)) {
    return assetUrl(`/projects/cover-thumbnails/${stage.id}.webp`);
  }

  return assetUrl(stage.image);
}
