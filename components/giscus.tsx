"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

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

    script.setAttribute("data-repo", "rjrahul007/blog-website");
    script.setAttribute("data-repo-id", "R_kgDOQ5NwtA");
    script.setAttribute("data-category", "Blog Comments");
    script.setAttribute("data-category-id", "DIC_kwDOQ5NwtM4C09R0");
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
  return <div ref={containerRef} className="mt-16" />;
}

// {
//   /* <script
//   src="https://giscus.app/client.js"
//   data-repo="rjrahul007/blog-website"
//   data-repo-id="R_kgDOQ5NwtA"
//   data-category="Blog Comments"
//   data-category-id="DIC_kwDOQ5NwtM4C09R0"
//   data-mapping="pathname"
//   data-strict="0"
//   data-reactions-enabled="1"
//   data-emit-metadata="0"
//   data-input-position="bottom"
//   data-theme="preferred_color_scheme"
//   data-lang="en"
//   crossorigin="anonymous"
//   async
// ></script>; */
// }

// "use client";

// import { useEffect } from "react";

// export default function Giscus() {
//   useEffect(() => {
//     // Load the web component once
//     if (!customElements.get("giscus-widget")) {
//       const script = document.createElement("script");
//       script.src = "https://giscus.app/client.js";
//       script.async = true;
//       script.crossOrigin = "anonymous";
//       document.body.appendChild(script);
//     }
//   }, []);

//   return (
//     <script
//       src="https://giscus.app/client.js"
//       data-repo="rjrahul007/blog-website"
//       data-repo-id="R_kgDOQ5NwtA"
//       data-category="Blog Comments"
//       data-category-id="DIC_kwDOQ5NwtM4C09R0"
//       data-mapping="pathname"
//       data-strict="0"
//       data-reactions-enabled="1"
//       data-emit-metadata="0"
//       data-input-position="bottom"
//       data-theme="preferred_color_scheme"
//       data-lang="en"
//       async
//     ></script>
//   );
// }
