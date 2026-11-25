import { useSeo } from "../hooks/useSeo";
import { story } from "../config/site";
import Img from "../components/Img";
import Reveal from "../components/Reveal";

export default function About() {
  useSeo("About Us", "The story behind GLYVORRA – elegant, timeless and accessible jewellery from India.");
  const values = [
    ["Timeless", "Designs that outlast trends."],
    ["Anti-tarnish", "Gold plated stainless steel made for everyday wear."],
    ["Accessible", "Luxury aesthetics, within reach."],
  ];
  return (
    <div className="container-x py-14">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-3">About GLYVORRA</p>
        <h1 className="text-5xl leading-tight sm:text-6xl">{story.heading}</h1>
      </Reveal>
      <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
        <Reveal><div className="aspect-video overflow-hidden shadow-soft"><Img src="/products/banners/our_story.webp" alt="GLYVORRA – Our Story" width={1200} /></div></Reveal>
        <Reveal delay={0.15}>
          {story.body.map((t) => <p key={t} className="mb-5 text-lg leading-relaxed text-muted">{t}</p>)}
        </Reveal>
      </div>
      <div className="mt-20 grid gap-px bg-champagne sm:grid-cols-3">
        {values.map(([t, d]) => (
          <div key={t} className="bg-ivory p-8 text-center">
            <h3 className="text-2xl text-gold">{t}</h3>
            <p className="mt-2 text-sm text-muted">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
