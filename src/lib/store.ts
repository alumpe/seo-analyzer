import type { ParseResult } from "src/routes/api/parse-url/_metadataScraper/types";
import { derived, writable } from "svelte/store";

const rawData = writable<ParseResult | undefined>(undefined);

export const googleSnippetData = derived(rawData, (data) => {
  if (!data) return undefined;
  const { parsedUrl, siteTitle, metaTags } = data;

  const title = siteTitle || metaTags["og:title"] || metaTags["twitter:title"];
  const description =
    metaTags.description || metaTags["og:description"] || metaTags["twitter:description"];

  return { title, description, url: parsedUrl };
});

export const facebookData = derived(rawData, (data) => {
  if (!data) return undefined;
  const { parsedUrl, siteTitle, metaTags } = data;

  const title = siteTitle || metaTags["og:title"] || metaTags["twitter:title"];
  const description =
    metaTags.description || metaTags["og:description"] || metaTags["twitter:description"];
  const imgUrl = metaTags.image || metaTags["og:image"] || metaTags["twitter:image"];

  let domain: string | undefined;

  try {
    domain = new URL(parsedUrl).hostname;
  } catch {
    null;
  }

  return { title, description, imgUrl, domain };
});

export const fetchMetaData = async (siteUrl: string) => {
  const response = await fetch(`/api/parse-url?url=${encodeURIComponent(siteUrl)}`);
  const data = await (response.json() as Promise<ParseResult>);
  rawData.set(data);
};
