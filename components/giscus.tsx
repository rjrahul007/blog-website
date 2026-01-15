"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { SITE_CONFIG } from "@/lib/config";

export default function Giscus() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent duplicate loading
    if (containerRef.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.id = "giscus-script";
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", SITE_CONFIG.giscus.repo);
    script.setAttribute("data-repo-id", SITE_CONFIG.giscus.repoId);
    script.setAttribute("data-category", SITE_CONFIG.giscus.category);
    script.setAttribute("data-category-id", SITE_CONFIG.giscus.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute(
      "data-theme",
      resolvedTheme === "dark" ? "dark" : "light"
    );
    script.setAttribute("data-lang", "en");

    containerRef.current.appendChild(script);

    // ✅ CLEANUP on unmount (THIS IS THE KEY)
    return () => {
      containerRef.current?.replaceChildren();
    };
  }, []);
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );

    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: resolvedTheme === "dark" ? "dark" : "light",
          },
        },
      },
      "https://giscus.app"
    );
  }, [resolvedTheme]);

  return <div ref={containerRef} />;
}
