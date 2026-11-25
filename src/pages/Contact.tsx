import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { useSeo } from "../hooks/useSeo";
import { contact, social } from "../config/site";
import { whatsappGeneral } from "../lib/utils";
import Reveal from "../components/Reveal";

export default function Contact() {
  useSeo("Contact", "Get in touch with GLYVORRA on WhatsApp, Instagram or email.");
  const rows = [
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: whatsappGeneral() },
    { icon: Instagram, label: "Instagram", value: social.instagramHandle, href: social.instagramUrl },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  ];
  return (
    <div className="container-x py-14">
      <Reveal className="text-center">
        <p className="eyebrow mb-3">We'd love to hear from you</p>
        <h1 className="text-5xl sm:text-6xl">Contact</h1>
        <p className="mt-4 text-muted">{contact.hours}</p>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
        {rows.map((r, i) => (
          <Reveal key={r.label} delay={i * 0.07}>
            <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 border border-champagne bg-white p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-soft">
              <r.icon className="text-gold" strokeWidth={1.3} />
              <div>
                <p className="eyebrow">{r.label}</p>
                <p className="mt-1">{r.value}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
