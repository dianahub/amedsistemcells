"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/videos", label: "Videos" },
  { href: "/topics", label: "Topics" },
  { href: "/consultation", label: "Free Consultation" },
  { href: "https://amedsi.com/#about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
      {/* Top bar — phone numbers */}
      <div className="bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap gap-y-1 justify-between">
          {[
            { label: "+1 786 523 0113", tel: "+17865230113" },
            { label: "+49 32 2122 49284", tel: "+493221224928" },
            { label: "+420 723 850 509", tel: "+420723850509" },
          ].map(({ label, tel }) => (
            <a
              key={tel}
              href={`tel:${tel}`}
              className="text-xs font-medium text-white hover:text-stone-300 transition-colors flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
              </svg>
              {label}
            </a>
          ))}
        </div>
      </div>

      <nav
        className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo — links to main Amedsi site */}
        <a
          href="https://amedsi.com/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded"
        >
          <Image
            src="/amedsi_icon.png"
            alt="Amedsi icon"
            width={36}
            height={44}
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-xl tracking-widest text-stone-800 uppercase">
              AMEDSI
            </span>
            <span className="text-[10px] tracking-wider text-stone-500 uppercase">
              Aspen Med Services Intl.
            </span>
          </div>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex gap-1" role="list">
          {links.map(({ href, label }) => {
            const external = href.startsWith("http");
            const className = `px-3 py-2 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
              !external && pathname === href
                ? "bg-brand-50 text-brand-600"
                : "text-stone-600 hover:text-brand-600 hover:bg-stone-50"
            } ${
              href === "/consultation"
                ? "bg-brand-600 text-white hover:bg-brand-700 hover:text-white ml-2"
                : ""
            }`;
            return (
              <li key={href}>
                {external ? (
                  <a href={href} className={className}>{label}</a>
                ) : (
                  <Link href={href} aria-current={pathname === href ? "page" : undefined} className={className}>
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded text-stone-600 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-stone-100 bg-white px-4 pb-4"
        >
          <ul className="flex flex-col gap-1 pt-2" role="list">
            {links.map(({ href, label }) => {
              const external = href.startsWith("http");
              const className = `block px-3 py-2 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                !external && pathname === href
                  ? "bg-brand-50 text-brand-600"
                  : "text-stone-600 hover:text-brand-600 hover:bg-stone-50"
              }`;
              return (
                <li key={href}>
                  {external ? (
                    <a href={href} className={className} onClick={() => setOpen(false)}>{label}</a>
                  ) : (
                    <Link href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)} className={className}>
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
