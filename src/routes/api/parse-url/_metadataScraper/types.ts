export const primaryFields = ["title", "image", "description"] as const;
export type DefaultProperty = typeof primaryFields[number];

export const ogFields = ["og:title", "og:type", "og:image", "og:description"] as const;
export type OpenGraphProperty = typeof ogFields[number];

export const twitterFields = [
  "twitter:title",
  "twitter:card",
  "twitter:image",
  "twitter:description",
] as const;
export type TwitterProperty = typeof twitterFields[number];

export type MetadataObject = Partial<{
  [key in "title" | DefaultProperty | OpenGraphProperty | TwitterProperty]: string;
}>;

export type ParseResult = {
  parsedUrl: string;
  siteTitle?: string;
  internalLinks: string[];
  metaTags: MetadataObject;
};
