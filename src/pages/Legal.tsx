import type { ReactNode } from "react";
import { useSeo } from "../hooks/useSeo";
import privacyMd from "../content/privacy-policy.md?raw";
import termsMd from "../content/terms.md?raw";

const content = {
  privacy: { title: "Privacy Policy", md: privacyMd },
  terms: { title: "Terms & Conditions", md: termsMd },
};

type Block = { type: "meta" | "h2" | "p"; text: string };

function parseMarkdown(md: string): Block[] {
  return md
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      if (chunk.startsWith("## ")) return { type: "h2", text: chunk.slice(3) };
      if (chunk.startsWith("Version:")) return { type: "meta", text: chunk.replace(/\n/g, " · ") };
      return { type: "p", text: chunk };
    });
}

// Supports **bold** and bare email addresses inside a paragraph.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|[^\s@]+@[^\s@]+\.[^\s@.]+)/).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i} className="font-medium text-ink">{part.slice(2, -2)}</strong>;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(part)) return <a key={i} href={`mailto:${part}`} className="text-gold underline">{part}</a>;
    return part;
  });
}

export default function Legal({ kind }: { kind: "privacy" | "terms" }) {
  const c = content[kind];
  useSeo(c.title);
  return (
    <div className="container-x max-w-3xl py-14">
      <h1 className="text-5xl">{c.title}</h1>
      <div className="mt-8 space-y-5 text-muted">
        {parseMarkdown(c.md).map((b) =>
          b.type === "h2" ? (
            <h2 key={b.text} className="pt-4 font-sans text-sm font-medium uppercase tracking-[0.18em] text-ink">{b.text}</h2>
          ) : b.type === "meta" ? (
            <p key={b.text} className="text-xs uppercase tracking-widest">{b.text}</p>
          ) : (
            <p key={b.text}>{inline(b.text)}</p>
          ),
        )}
      </div>
    </div>
  );
}
