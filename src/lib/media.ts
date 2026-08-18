import { useQuery } from "@tanstack/react-query";

const WIKI_ENDPOINT = "https://en.wikipedia.org/w/api.php";
const CACHE_PREFIX = "dravik:img:";

/**
 * Resolves a real, freely licensed photo for an arbitrary place / search term
 * using Wikipedia's page-image index. Returns null when nothing matches.
 */
export const fetchPlaceImage = async (query: string): Promise<string | null> => {
  const cacheKey = `${CACHE_PREFIX}${query.toLowerCase()}`;
  const cached = typeof window !== "undefined" ? window.localStorage.getItem(cacheKey) : null;
  if (cached !== null) return cached === "none" ? null : cached;

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrlimit: "1",
    prop: "pageimages",
    piprop: "thumbnail",
    pithumbsize: "1400",
    format: "json",
    origin: "*",
  });

  try {
    const response = await fetch(`${WIKI_ENDPOINT}?${params.toString()}`);
    if (!response.ok) return null;
    const payload = await response.json();
    const pages = payload?.query?.pages as Record<string, { thumbnail?: { source?: string } }> | undefined;
    const source = pages ? Object.values(pages).find((page) => page.thumbnail?.source)?.thumbnail?.source ?? null : null;
    window.localStorage.setItem(cacheKey, source ?? "none");
    return source;
  } catch {
    return null;
  }
};

export const usePlaceImage = (query?: string | null, enabled = true) =>
  useQuery({
    queryKey: ["place-image", query],
    queryFn: () => fetchPlaceImage(query as string),
    enabled: Boolean(query) && enabled,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 1,
  });

/** Builds the most descriptive search phrase available for a destination row. */
export const buildPlaceQuery = (destination: {
  title?: string | null;
  location?: string | null;
  country?: string | null;
}) => [destination.title, destination.location ?? destination.country].filter(Boolean).join(" ");
