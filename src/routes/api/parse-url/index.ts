import { analyzeUrl } from "./_metadataScraper";
import type { ParseResult } from "./_metadataScraper/types";
import type { RequestHandler } from "./__types/index";

export const GET: RequestHandler<ParseResult> = async ({ url }) => {
  let passedUrl = url.searchParams.get("url");

  if (!passedUrl) {
    return { status: 400 };
  }

  // Add missing protocol to the passed URL
  if (!passedUrl.startsWith("http")) {
    passedUrl = `http://${passedUrl}`;
  }

  let validUrl: URL;
  try {
    validUrl = new URL(passedUrl);
  } catch {
    return { status: 400 };
  }

  const getResponse = await analyzeUrl(validUrl);

  return {
    status: 200,
    body: getResponse,
  };
};
