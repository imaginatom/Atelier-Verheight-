"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Container } from "@/components/container";
import { header } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open || !overlay.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // The overlay itself hard-cuts in (concrete register); only the links move.
      gsap.from("[data-menu-link]", {
        yPercent: 110,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.05,
      });
    }, overlay);
    return () => ctx.revert();
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-stone-50 mix-blend-difference">
        <Container className="py-6">
          <div className="col-span-12 flex items-baseline justify-between">
            <a href="#" className="text-meta font-medium">
              {header.wordmark}
            </a>
            <nav className="hidden gap-8 text-meta lg:flex">
              {header.nav.map((item) => (
                <a key={item.href} href={item.href} className="link-fill">
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="text-meta lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? "Fermer" : "Menu"}
            </button>
          </div>
        </Container>
      </header>

      {open && (
        // touch-none: a finger on the overlay must not scroll the page beneath.
        <div
          ref={overlay}
          className="fixed inset-0 z-40 touch-none bg-stone-950 text-stone-50 lg:hidden"
        >
          <nav className="flex h-full flex-col justify-end gap-6 px-[clamp(16px,4vw,64px)] pb-28">
            {header.nav.map((item, i) => (
              <div key={item.href} className="overflow-hidden">
                <a
                  href={item.href}
                  className="block text-h2"
                  data-menu-link
                  onClick={() => setOpen(false)}
                >
                  <span className="mr-4 align-middle font-sans text-meta text-stone-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
