"use client";

import { isProduction, isAnalyticsEnabled, getSiteDomain } from "../utils/env";

export default function Analytics() {
  if (!isAnalyticsEnabled()) return null;
  if (!isProduction()) return null;

  const siteDomain = getSiteDomain();
  if (!siteDomain) return null;

  return (
    <script
      defer
      data-domain={siteDomain}
      src="/js/script.js"
    ></script>
  );
}
