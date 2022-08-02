import { load } from "cheerio";
import { extractInternalLinks } from "./extractInternalLinks";
import { ogFields, primaryFields, twitterFields, type ParseResult } from "./types";

const extractMetaTags = (url: URL, html: string) => {
  const parseResult: ParseResult = { parsedUrl: url.href, internalLinks: [], metaTags: {} };
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

  parseResult.internalLinks = extractInternalLinks($, url);

  return parseResult;
};

export const getMetadataFromUrl = async (url: URL) =>
  fetch(url)
    .then(async (response) => {
      if (response.headers.get("content-type")?.includes("text/html")) {
        return extractMetaTags(new URL(response.url), await response.text());
      }

      throw new Error("Not a HTML page");
    })
    .catch((error) => {
      if (error instanceof Error) throw error;
      throw new Error(error);
    });
