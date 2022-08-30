import { browser } from "$app/environment";
import type { ParseResult } from "$routes/api/parse-url/_metadataScraper/types";
import { derived, writable } from "svelte/store";
import { addPageEntry } from "./sitemap";

let localStorageResult: ParseResult | undefined;
if (browser) {
  const storedResult = localStorage.getItem("parseResult");

  if (storedResult) {
    localStorageResult = JSON.parse(storedResult);
  }
}

const rawData = writable<ParseResult | undefined>(localStorageResult);

rawData.subscribe((data) => {
  if (!browser) return;
  if (!data) {
    localStorage.removeItem("parseResult");
    return;
  }

  localStorage.setItem("parseResult", JSON.stringify(data));
});

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
  addPageEntry(data);

  return data.parsedUrl;
};
