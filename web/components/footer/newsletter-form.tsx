"use client";

import { useState } from "react";
import { ButtonContent, pillTone } from "@/components/ui/swap-button";

type NewsletterLabels = {
  title: string;
  lede: string;
  placeholder: string;
  submit: string;
  success: string;
};

export function NewsletterForm({ labels }: { labels: NewsletterLabels }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const body = new URLSearchParams();
      data.forEach((value, key) => {
        if (typeof value === "string") body.append(key, value);
      });

      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } finally {
      form.reset();
      setStatus("done");
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/15 bg-white/[0.06] p-8 backdrop-blur-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
        {labels.title}
      </p>
      <p className="mt-3 text-base leading-relaxed text-white/75">{labels.lede}</p>

      <form
        name="newsletter"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        className="mt-6 flex flex-col gap-3"
      >
        <input type="hidden" name="form-name" value="newsletter" />
        <p className="hidden">
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>

        <input
          type="email"
          name="email"
          required
          placeholder={labels.placeholder}
          autoComplete="email"
          className="w-full rounded-full border border-white/20 bg-white/5 px-5 py-3 text-white placeholder-white/40 outline-none ring-[var(--teal)] focus:ring-2"
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className={`group inline-flex cursor-pointer items-center justify-center gap-3 self-start rounded-full py-2 pl-6 pr-2 text-base font-semibold transition-colors duration-200 disabled:opacity-60 ${pillTone.solid}`}
        >
          <ButtonContent
            label={status === "done" ? labels.success : labels.submit}
            variant="solid"
          />
        </button>
      </form>
    </div>
  );
}
