"use client";

import { CAL_COM_URL } from "@/lib/constants";

export function Footer() {
  return (
    <div className="mt-8 border-t border-zinc-800 pt-8">
      <div className="flex flex-col items-center gap-3">
        <a
          href={CAL_COM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Book a 15-min call
        </a>
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Maxwell Vaglica. All rights reserved.
        </p>
      </div>
    </div>
  );
}
