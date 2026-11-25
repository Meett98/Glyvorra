import { useEffect } from "react";
import { site } from "../config/site";
import { imageUrl, siteOrigin } from "../lib/utils";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

const absoluteImage = (image: string) => {
  const src = imageUrl(image, 1200);
  return /^(https?:|data:)/.test(src) ? src : `${siteOrigin()}${encodeURI(src)}`;
};

interface SeoOptions {
  jsonLd?: object;
  noindex?: boolean;
}

export function useSeo(title: string, description: string = site.description, image: string = site.ogImage, options: SeoOptions = {}) {
  const jsonLdText = options.jsonLd ? JSON.stringify(options.jsonLd) : "";
  const noindex = options.noindex ?? false;

  useEffect(() => {
    const full = !title ? `${site.name} | ${site.tagline}` : title.includes(site.name) ? title : `${title} | ${site.name}`;
    const canonical = `${siteOrigin()}${window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/$/, "")}`;
    const ogImage = absoluteImage(image);
    document.title = full;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setCanonical(canonical);
    setMeta("property", "og:site_name", site.name);
    setMeta("property", "og:locale", "en_IN");
    setMeta("property", "og:title", full);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", ogImage);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", full);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    document.head.querySelectorAll("script[data-seo-jsonld]").forEach((el) => el.remove());
    if (jsonLdText) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonld = "true";
      script.text = jsonLdText;
      document.head.appendChild(script);
    }
    return () => document.head.querySelectorAll("script[data-seo-jsonld]").forEach((el) => el.remove());
  }, [title, description, image, jsonLdText, noindex]);
}
