import { load } from "cheerio";
import { extractInternalLinks } from "./extractInternalLinks";
import { ogFields, primaryFields, twitterFields, type ParseResult } from "./types";

const extractMetaTags = (parseResult: ParseResult, html: string) => {
  const url = new URL(parseResult.parsedUrl);
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

export const analyzeUrl = async (url: URL) => {
  const fileRegex = /(?!\.html$)\.\w+$/;
  if (fileRegex.test(url.pathname)) {
    throw new Error("Requested page is likely a file");
  }

  return fetch(url)
    .then(async (response) => {
      if (!response.headers.get("content-type")?.includes("text/html")) {
        throw new Error("Not a HTML page");
      }

      const parseResult: ParseResult = {
        parsedUrl: response.url,
        statusCode: response.status,
        internalLinks: [],
        metaTags: {},
      };

      return extractMetaTags(parseResult, await response.text());
    })
    .catch((error) => {
      if (error instanceof Error) throw error;
      throw new Error(error);
    });
};
