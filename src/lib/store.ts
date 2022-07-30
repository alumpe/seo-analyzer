import type { MetadataObject } from "src/routes/api/parse-url/_metadataScraper/types";
import { derived, writable } from "svelte/store";

const rawData = writable<MetadataObject>({});

export const googleSnippetData = derived(rawData, (data) => {
  const title = data.title || data["og:title"] || data["twitter:title"];
  const description = data.description || data["og:description"] || data["twitter:description"];
  const imgUrl = data.image || data["og:image"] || data["twitter:image"];

  return { title, description, imgUrl };
});

export const facebookData = derived(rawData, (data) => {
  const title = data.title || data["og:title"] || data["twitter:title"];
  const description = data.description || data["og:description"] || data["twitter:description"];
  const imgUrl = data.image || data["og:image"] || data["twitter:image"];

  let domain: string | undefined;
  if (imgUrl) {
    try {
      domain = new URL(imgUrl).hostname;
    } catch {
      null;
    }
  }

  return { title, description, imgUrl, domain };
});

export const fetchMetaData = async (siteUrl: string) => {
  const response = await fetch(`/api/parse-url?url=${encodeURIComponent(siteUrl)}`);
  const data = await (response.json() as Promise<MetadataObject>);
  rawData.set(data);
};
