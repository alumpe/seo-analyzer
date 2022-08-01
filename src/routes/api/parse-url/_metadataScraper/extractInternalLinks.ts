import type { CheerioAPI } from "cheerio";

export const extractInternalLinks = ($: CheerioAPI): string[] => {
  const allInternalLinks: string[] = [];

  $("a[href^='/']").each((index, link) => {
    if (link.attribs?.href) allInternalLinks.push(link.attribs.href);
  });

  // Removes anchor tag
  allInternalLinks.forEach((link, index, array) => {
    array[index] = link.split("#")[0];
  });

  // Removes trailing slash
  allInternalLinks.forEach((link, index, array) => {
    if (link !== "/") array[index] = link.replace(/\/+$/, "");
  });

  // Remove duplicates from the array
  const uniqueArray = [...new Set(allInternalLinks)];

  return uniqueArray;
};
