"use client";

import { isProduction, getRootUrl } from "../utils/env";

export default function Analytics() {
  if (!isProduction()) return null;

  let siteDomain = null;
  try {
    siteDomain = new URL(getRootUrl()).hostname;
  } catch {
    return null;
  }

  return (
    <script
      defer
      data-domain={siteDomain}
      src="/js/script.js"
    ></script>
  );
}
