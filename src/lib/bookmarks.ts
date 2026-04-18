const KEY = "exoatlas:bookmarks";

export type BookmarkedPlanet = {
  id: string;
  name: string;
  host_star: string;
  planet_type: string | null;
  habitability_pct: number | null;
  radius_earth: number | null;
  discovery_year: number | null;
  savedAt: string;
};

export function getBookmarks(): BookmarkedPlanet[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().some((b) => b.id === id);
}

export function addBookmark(planet: Omit<BookmarkedPlanet, "savedAt">) {
  const list = getBookmarks().filter((b) => b.id !== planet.id);
  list.unshift({ ...planet, savedAt: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function removeBookmark(id: string) {
  const list = getBookmarks().filter((b) => b.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function toggleBookmark(
  planet: Omit<BookmarkedPlanet, "savedAt">,
): boolean {
  if (isBookmarked(planet.id)) {
    removeBookmark(planet.id);
    return false;
  } else {
    addBookmark(planet);
    return true;
  }
}
