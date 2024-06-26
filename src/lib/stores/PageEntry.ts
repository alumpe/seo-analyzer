import type { ParseResult } from "$routes/api/parse-url/_metadataScraper/types";

export class PageEntry extends URL {
  constructor(url: string) {
    super(url);
  }

  static comparePageEntries(a: PageEntry, b: PageEntry) {
    return a.uniqueKey.localeCompare(b.uniqueKey);
  }

  get pathAsArray() {
    // trim slashes from the beginning and end of the path
    return this.pathname.split("/").filter((e) => e);
  }

  get uniqueKey() {
    // trim slashes from the beginning and end of the path
    return (this.hostname + this.pathname).replace(/\/$/, "");
  }
}

export class ParsedPageEntry extends PageEntry {
  statusCode: number;
  internalLinks;
  metaTags;
  siteTitle;

  constructor(
    url: string,
    statusCode: number,
    internalLinks: ParseResult["internalLinks"],
    metaTags: ParseResult["metaTags"],
    siteTitle: ParseResult["siteTitle"]
  ) {
    super(url);
    this.statusCode = statusCode;
    this.internalLinks = internalLinks
      .map((link) => new PageEntry(link))
      .filter((entry) => this.uniqueKey !== entry.uniqueKey); // filter out self-links
    this.metaTags = metaTags;
    this.siteTitle = siteTitle;
  }
}
