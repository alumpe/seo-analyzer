import type { CheerioAPI } from "cheerio";

export const extractInternalLinks = ($: CheerioAPI, parsedUrl: URL): string[] => {
  const allInternalLinks: URL[] = [];

  $("a[href^='/']").each((index, link) => {
    if (link.attribs?.href) allInternalLinks.push(new URL(link.attribs.href, parsedUrl));
  });

  const pageMap = new Map<string, URL>();
  allInternalLinks.forEach((link) => pageMap.set(link.hostname + link.pathname, link));

  const uniqueArray = Array.from(pageMap.values()).map((url) => url.href);

  return uniqueArray;
};
