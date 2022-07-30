import { getMetadataFromDomain } from "./_metadataScraper";
import type { MetadataObject } from "./_metadataScraper/types";
import type { RequestHandler } from "./__types/index";

export const GET: RequestHandler<MetadataObject> = async ({ url }) => {
  const passedUrl = url.searchParams.get("url");

  if (!passedUrl) {
    return { status: 400 };
  }

  let validUrl: URL;
  try {
    validUrl = new URL(passedUrl);
  } catch {
    return { status: 400 };
  }

  const getResponse = await getMetadataFromDomain(validUrl.href);

  console.log(getResponse);

  return {
    status: 200,
    body: getResponse,
  };
};
