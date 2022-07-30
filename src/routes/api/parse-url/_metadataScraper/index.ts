import { load } from "cheerio";
import { primaryFields, ogFields, twitterFields } from "./types";
import type { MetadataObject } from "./types";

const extractMetaTags = (html: string) => {
  const metaObject: MetadataObject = {};
  const $ = load(html);

  const t = $("title").first().text();
  if (t) {
    metaObject.title = t;
  }

  $("meta").each((index, meta) => {
    if (!meta.attribs || (!meta.attribs.property && !meta.attribs.name)) return;
    const property = meta.attribs.property || meta.attribs.name;
    const content = meta.attribs.content || meta.attribs.value;

    [...primaryFields, ...ogFields, ...twitterFields].forEach((item) => {
      if (property.toLowerCase() === item.toLowerCase()) {
        metaObject[item] = content;
      }
    });
  });

  return metaObject;
};

export const getMetadataFromDomain = async (domain: string): Promise<MetadataObject> =>
  fetch(domain)
    .then(async (response) => extractMetaTags(await response.text()))
    .catch((error) => {
      if (error instanceof Error) throw error;
      throw new Error(error);
    });
