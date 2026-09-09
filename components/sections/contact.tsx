"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONTACT, SOCIAL_LINKS, UI } from "@/lib/content";
import { useLang } from "@/lib/lang-context";

const INPUT_CLASSES =
  "rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-accent";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { lang } = useLang();
  const CONTACT_T = CONTACT[lang];
  const ui = UI[lang];
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const email = SOCIAL_LINKS.email.replace("mailto:", "");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the email is still visible to copy manually.
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-xs text-muted">{CONTACT_T.eyebrow}</p>
      <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">{CONTACT_T.heading}</h2>
      <p className="max-w-2xl text-base text-muted sm:text-lg">{CONTACT_T.description}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="[perspective:1200px]">
          <motion.div
            className="relative [transform-style:preserve-3d]"
            animate={{ rotateY: status === "success" ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Card className="[backface-visibility:hidden]">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    {CONTACT_T.form.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    required
                    placeholder={CONTACT_T.form.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={INPUT_CLASSES}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-sm font-medium">
                    {CONTACT_T.form.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder={CONTACT_T.form.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={INPUT_CLASSES}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium">
                    {CONTACT_T.form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder={CONTACT_T.form.messagePlaceholder}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`resize-none ${INPUT_CLASSES}`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">{CONTACT_T.form.errorText}</p>
                )}

                <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
                  {status === "sending" ? CONTACT_T.form.sendingLabel : CONTACT_T.form.submitLabel}
                </Button>
              </form>
            </Card>

            <Card
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <p className="font-heading text-lg font-medium">{CONTACT_T.form.successHeading}</p>
              <p className="text-sm text-muted">{CONTACT_T.form.successText}</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-1 text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
              >
                {CONTACT_T.form.successReset}
              </button>
            </Card>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-3">
            <p className="font-mono text-xs text-muted">{CONTACT_T.direct.label}</p>
            <Button href={SOCIAL_LINKS.email} className="w-full justify-center">
              {CONTACT_T.direct.emailButtonLabel}
            </Button>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center justify-between gap-2 rounded-lg border border-border px-3.5 py-2.5 text-left text-sm text-muted transition-colors hover:text-foreground"
            >
              <span className="truncate">{email}</span>
              <span className="shrink-0 text-xs">{copied ? ui.copied : ui.copy}</span>
            </button>
          </Card>

          <Card className="flex flex-col gap-2">
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {CONTACT_T.availability.label}
            </p>
            <p className="text-sm text-muted">{CONTACT_T.availability.text}</p>
          </Card>

          <div className="flex items-center gap-4 border-t border-border pt-4 text-sm">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              GitHub ↗
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
