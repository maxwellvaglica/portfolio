"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { EMAIL } from "@/app/data";

const INITIAL_STATE: ContactState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContact,
    INITIAL_STATE,
  );

  return (
    <form action={formAction} className="mx-auto w-full max-w-lg space-y-3">
      <div style={{ position: "absolute", left: "-10000px" }} aria-hidden>
        <label>
          If you can see this field, leave it blank:
          <input
            type="text"
            name="company-website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-700 focus:outline-none"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-700 focus:outline-none"
        />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Role, team, what you'd like to chat about — short notes welcome."
        className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-emerald-700 focus:outline-none"
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
        >
          {isPending ? "Sending…" : "Send message"}
        </button>
        <a
          className="text-xs text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline"
          href={`mailto:${EMAIL}`}
        >
          or email {EMAIL} directly
        </a>
      </div>
      {state.status !== "idle" && (
        <p
          role="status"
          className={`text-sm ${
            state.status === "success" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
