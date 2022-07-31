import { load } from "cheerio";
import { primaryFields, ogFields, twitterFields, type ParseResult } from "./types";

const extractMetaTags = (url: string, html: string) => {
  const parseResult: ParseResult = { parsedUrl: url, metaTags: {} };
  const $ = load(html);

  const t = $("title").first().text();
  if (t) {
    parseResult.siteTitle = t;
  }

  $("meta").each((index, meta) => {
    if (!meta.attribs || (!meta.attribs.property && !meta.attribs.name)) return;
    const property = meta.attribs.property || meta.attribs.name;
    const content = meta.attribs.content || meta.attribs.value;

    [...primaryFields, ...ogFields, ...twitterFields].forEach((item) => {
      if (property.toLowerCase() === item.toLowerCase()) {
        parseResult.metaTags[item] = content;
      }
    });
  });

  return parseResult;
};

export const getMetadataFromDomain = async (domain: string) =>
  fetch(domain)
    .then(async (response) => extractMetaTags(domain, await response.text()))
    .catch((error) => {
      if (error instanceof Error) throw error;
      throw new Error(error);
    });
