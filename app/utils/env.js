import { parse } from "tldts";

export function isNetlify() {
  return Boolean(process.env.CONTEXT);
}

export function isProduction() {
  return process.env.CONTEXT === "production";
}

export function isDev() {
  return process.env.CONTEXT === "dev";
}

export function getRootUrl() {
  const context = process.env.CONTEXT;

  if (context === "production") {
    return process.env.URL;
  } else if (context === "deploy-preview" || context === "branch-deploy") {
    return process.env.DEPLOY_URL;
  } else {
    return "http://localhost:3000";
  }
}

export function getSiteDomain() {
  const rootUrl = getRootUrl();
  if (rootUrl === 'http://localhost:3000') return 'localhost';
  const parsed = parse(rootUrl);
  return parsed.domain || null;
}
