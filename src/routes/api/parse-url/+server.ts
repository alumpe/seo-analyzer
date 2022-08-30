import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { analyzeUrl } from "./_metadataScraper";

export const GET: RequestHandler = async ({ url }) => {
  let passedUrl = url.searchParams.get("url");

  if (!passedUrl) {
    throw error(400);
  }

  // Add missing protocol to the passed URL
  if (!passedUrl.startsWith("http")) {
    passedUrl = `http://${passedUrl}`;
  }

  let validUrl: URL;
  try {
    validUrl = new URL(passedUrl);
  } catch {
    throw error(400);
  }

  const getResponse = await analyzeUrl(validUrl);

  return json(getResponse);
};
