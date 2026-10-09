"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services/web-development", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold text-gold">
          Riyadvi
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/book-consultation"
          className="hidden rounded-full bg-gold px-5 py-2 text-sm font-semibold text-black transition hover:bg-gold-light md:block"
        >
          Book a Free Consultation
        </Link>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-white/10 bg-black px-6 py-6 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-muted hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/book-consultation"
              onClick={() => setOpen(false)}
              className="inline-block rounded-full bg-gold px-5 py-2 text-sm font-semibold text-black"
            >
              Book a Free Consultation
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
