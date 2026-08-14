"use client";

import { useState } from "react";
import { ButtonContent, pillTone } from "@/components/ui/swap-button";
import type { Dictionary } from "@/messages";

type FormLabels = Dictionary["contact"]["form"];

export function ContactForm({ labels }: { labels: FormLabels }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle",
  );

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

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setStatus("done");
    } catch {
      setStatus("done");
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border border-[var(--line)] bg-white p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={labels.name} name="name" required autoComplete="name" />
        <Field
          label={labels.email}
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <Field label={labels.company} name="company" autoComplete="organization" />
      <label className="block">
        <span className="text-sm font-medium text-[var(--ink)]">
          {labels.message}
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-[var(--ink)] outline-none ring-[var(--teal)] focus:ring-2"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full py-2 pl-6 pr-2 text-base font-semibold transition-colors duration-200 disabled:opacity-60 sm:w-auto ${pillTone.dark}`}
      >
        <ButtonContent
          label={status === "submitting" ? labels.sending : labels.send}
          variant="dark"
        />
      </button>

      {status === "done" ? (
        <p className="text-sm text-[var(--teal-deep)]" role="status">
          {labels.success}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          {labels.error}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[var(--ink)]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-[var(--ink)] outline-none ring-[var(--teal)] focus:ring-2"
      />
    </label>
  );
}
