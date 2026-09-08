"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SocialLinks } from "@/components/ui/social-links";
import { CONTACT, SOCIAL_LINKS } from "@/lib/content";

const INPUT_CLASSES =
  "rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-accent";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // TODO: next iteration — submit to a real backend (Resend/Nodemailer) instead of mailto
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const to = SOCIAL_LINKS.email.replace("mailto:", "");
    const subject = encodeURIComponent(`Contacto de ${form.name || "portfolio"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  return (
    <Card className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          {CONTACT.heading}
        </h2>
        <p className="max-w-md text-base text-muted sm:text-lg">{CONTACT.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 text-left">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="contact-name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={INPUT_CLASSES}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={INPUT_CLASSES}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className="text-sm font-medium">
            Mensaje
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className={`resize-none ${INPUT_CLASSES}`}
          />
        </div>

        <div className="flex flex-col items-center gap-4 pt-2">
          <Button type="submit" className="w-full sm:w-auto">
            Enviar
          </Button>
          <SocialLinks />
        </div>
      </form>
    </Card>
  );
}
