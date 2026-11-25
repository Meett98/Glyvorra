import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, children, center = true }: { eyebrow?: string; title: string; children?: ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-4xl leading-tight sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-muted">{children}</p>}
    </Reveal>
  );
}
