"use client";

import { isProduction, getSiteDomain } from "../utils/env";

export default function Analytics() {
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
