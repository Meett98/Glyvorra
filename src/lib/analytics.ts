import { analytics } from "../config/site";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let enabled = false;

/** Loads Google Analytics once, only in production builds with a measurement ID set. */
export function initAnalytics() {
  const id = analytics.gaMeasurementId;
  if (!id || !import.meta.env.PROD || enabled) return;
  enabled = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js reads the pushed `arguments` object, so this must be a regular function.
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  // Page views are sent manually on each route change, since this is a single-page app.
  window.gtag("config", id, { send_page_view: false });
}

export function trackPageView(path: string) {
  if (!enabled) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
  });
}
