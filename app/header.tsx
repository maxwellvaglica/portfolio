"use client";
import Link from "next/link";

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-bold text-zinc-100">
          Maxwell Vaglica
        </Link>
        <p className="text-zinc-400">Data Engineer & Software Engineer</p>
      </div>
    </header>
  );
}
