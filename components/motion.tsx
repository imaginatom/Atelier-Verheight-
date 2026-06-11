"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Nearest data-register decides pacing: stone uncovers slower, concrete arrives heavier.
const isStone = (el: Element) =>
  el.closest("[data-register]")?.getAttribute("data-register") !== "concrete";

export function Motion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // One clock: Lenis runs on gsap's ticker, ScrollTrigger reads Lenis.
    let lenis: Lenis | undefined;
    let raf: ((time: number) => void) | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const l = (lenis = new Lenis({ anchors: true }));
      l.on("scroll", ScrollTrigger.update);
      raf = (time) => l.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // matchMedia is a gsap context — scoped to the ref, fully reverted on cleanup.
    const mm = gsap.matchMedia(scope);
    let cancelled = false;

    // Split and measure only once fonts have settled, so line breaks are final.
    document.fonts.ready.then(() => {
      if (cancelled) return;

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduce) return; // everything visible, nothing moves

          const root = scope.current!;
          const seams = (name: string) =>
            Array.from(root.querySelectorAll<HTMLElement>(`[data-anim='${name}']`)).filter(
              (el) => !el.closest("[data-works]") // the pinned sequence owns its children
            );

          if (!ctx.conditions?.desktop) {
            // Mobile: no pins, no splits — simple fades only. Elements already
            // on screen are skipped: hiding them when late JS lands would blank
            // the hero and re-register LCP at the end of the fade.
            for (const name of ["lines", "clip", "settle", "fade"]) {
              for (const el of seams(name)) {
                if (el.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
                gsap.from(el, {
                  opacity: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  scrollTrigger: { trigger: el, start: "top 90%", once: true },
                });
              }
            }
            return;
          }

          // — Œuvres: pinned, scrubbed hard-cut sequence. Created first so its pin
          // spacer is in the layout before the on-enter triggers below measure.
          const works = root.querySelector<HTMLElement>("[data-works]");
          if (works) {
            const panels = Array.from(works.querySelectorAll<HTMLElement>("[data-work]"));

            // Collapse the sticky stack into one pinned viewport of layered panels.
            // svh + hidden: Safari's dynamic toolbar makes 100vh overflow the visible
            // viewport, and Safari <16 ignores overflow:clip (concrete panels would
            // paint over the next section while sliding in).
            gsap.set(works, { position: "relative", height: "100svh", overflow: "hidden" });
            gsap.set(panels, {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: (i: number) => i + 1,
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: works,
                start: "top top",
                end: () => `+=${panels.length * window.innerHeight}`,
                pin: true,
                pinType: "fixed", // Lenis drives native scroll, so fixed pinning stays in sync
                anticipatePin: 1,
                scrub: 1,
              },
            });

            // Work 01 is carved out of the empty panel as the pin engages.
            const first = panels[0]?.querySelector("[data-anim]");
            if (first) {
              tl.fromTo(
                first,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.inOut" },
                0
              );
            }

            panels.forEach((panel, i) => {
              if (i === 0) return;
              // 1 unit of timeline per work — the gap before each cut is the hold.
              if (panel.dataset.register === "stone") {
                // Subtraction: the full panel is uncovered from the bottom, slow.
                tl.fromTo(
                  panel,
                  { clipPath: "inset(100% 0% 0% 0%)" },
                  { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.inOut" },
                  i
                );
              } else {
                // Addition: the panel arrives as mass — faster, heavier, then settles.
                tl.fromTo(
                  panel,
                  { yPercent: 100 },
                  { yPercent: 0, duration: 0.32, ease: "power3.out" },
                  i
                );
                const img = panel.querySelector("[data-anim]");
                if (img) {
                  tl.fromTo(
                    img,
                    { scale: 1.08 },
                    { scale: 1, duration: 0.45, ease: "power2.out" },
                    i + 0.08
                  );
                }
              }
            });

            tl.to({}, { duration: 0.7, ease: "none" }); // last work holds before release
          }

          // — Masked line reveals, split after fonts, once on enter.
          for (const el of seams("lines")) {
            const slow = isStone(el);
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: slow ? 1.1 : 0.9,
                  stagger: slow ? 0.12 : 0.09,
                  ease: "power3.out",
                  scrollTrigger: { trigger: el, start: "top 85%", once: true },
                }),
            });
          }

          // — Stone uncovers: clip-path from the bottom, subtraction made visible.
          for (const el of seams("clip")) {
            gsap.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: isStone(el) ? 1.4 : 1.1,
                ease: "power2.inOut",
                scrollTrigger: { trigger: el, start: "top 80%", once: true },
              }
            );
          }

          // — Concrete arrivals: scale-only settle, mass pressing into place. No fade.
          for (const el of seams("settle")) {
            gsap.from(el, {
              scale: isStone(el) ? 1.04 : 1.08,
              duration: isStone(el) ? 1.5 : 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
          }

          // — Quiet fades for body copy.
          for (const el of seams("fade")) {
            gsap.from(el, {
              opacity: 0,
              y: 24,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          }
        }
      );
    });

    return () => {
      cancelled = true;
      mm.revert();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return <main ref={scope}>{children}</main>;
}
