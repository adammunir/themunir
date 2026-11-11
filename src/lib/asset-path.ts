/** Public assets need the same mount path as the GitHub Pages preview. */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!base || !path.startsWith("/") || path.startsWith("//") || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}

/** Rebase image/video paths at the content boundary, including nested scenes. */
export function withAssetBase<T>(value: T): T {
  if (Array.isArray(value)) return value.map(withAssetBase) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [
      key,
      (key === "src" || key === "poster") && typeof entry === "string"
        ? assetPath(entry)
        : withAssetBase(entry),
    ])) as T;
  }
  return value;
}
