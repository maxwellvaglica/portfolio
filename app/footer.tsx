"use client";

export function Footer() {
  return (
    <div className="mt-8 border-t border-zinc-800 pt-8">
      <div className="flex flex-col items-center gap-4">
        <a
          href="/Maxwell_Vaglica_Resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-6 py-3 font-medium text-zinc-100 transition-all hover:bg-zinc-700 hover:shadow-lg"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Resume
        </a>
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Maxwell Vaglica. All rights reserved.
        </p>
      </div>
    </div>
  );
}
