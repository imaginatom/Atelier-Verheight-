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
    // Lock viewport height once — mobile URL bar show/hide won't resize heroes.
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };
    setVh();
    window.addEventListener("orientationchange", setVh);

    // One clock: Lenis runs on gsap's ticker, ScrollTrigger reads Lenis.
    let lenis: Lenis | undefined;
    let raf: ((time: number) => void) | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const l = (lenis = new Lenis({ anchors: true, wheelMultiplier: 0.9 }));
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

      // gsap.matchMedia only invokes the handler when a condition MATCHES, so
      // mobile needs its own query — without it nothing runs below 1024px and
      // the only animations a phone can ever see are desktop ones reverting
      // mid-flight at the breakpoint (the hero "scale snap").
      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduce) return; // everything visible, nothing moves

          const root = scope.current!;
          const seams = (name: string) =>
            Array.from(root.querySelectorAll<HTMLElement>(`[data-anim='${name}']`)).filter(
              (el) => !el.closest("[data-works]") // the pinned sequence owns its children
            );

          if (ctx.conditions?.mobile) {
            // Mobile: no pins, no splits, no parallax — simple fades only. The
            // hero carries no data-anim hooks, so it never animates here.
            // Elements already on screen are skipped: hiding them when late JS
            // lands would blank the view and re-register LCP.
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

            // Work 01 uncovers as the section approaches — once, outside the
            // scrub — so the pin engages with it fully present and it never
            // re-hides on scroll-up.
            const first = panels[0]?.querySelector("[data-anim]");
            if (first) {
              gsap.fromTo(
                first,
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 1.4,
                  ease: "power2.inOut",
                  scrollTrigger: { trigger: works, start: "top 75%", once: true },
                }
              );
            }

            // 1.5 viewports of scroll per work.
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: works,
                start: "top top",
                end: () => `+=${panels.length * window.innerHeight * 1.2}`,
                pin: true,
                pinType: "fixed", // Lenis drives native scroll, so fixed pinning stays in sync
                anticipatePin: 1,
                scrub: 1,
              },
            });

            panels.forEach((panel, i) => {
              // 1 unit of timeline per work — the gap before each cut is the hold.
              if (i > 0) {
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
                  const frame = panel.querySelector("[data-anim]");
                  if (frame) {
                    tl.fromTo(
                      frame,
                      { scale: 1.08 },
                      { scale: 1, duration: 0.45, ease: "power2.out" },
                      i + 0.08
                    );
                  }
                }
              }
            });

            // tl.to({}, { duration: 0.7, ease: "none" }); // last work holds before release
          }

          // — Hero entrance: the page arrives. Lines mask up, the scrim settles,
          // meta items land in sequence. ~1.5s, once on load.
          const heroTitle = root.querySelector<HTMLElement>("[data-hero='title']");
          const heroScrim = root.querySelector<HTMLElement>("[data-hero='scrim']");
          const heroFade = root.querySelectorAll<HTMLElement>("[data-hero='fade']");
          if (heroScrim) {
            gsap.from(heroScrim, { opacity: 0, duration: 1.2, ease: "power2.inOut" });
          }
          if (heroTitle) {
            SplitText.create(heroTitle, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 1.1,
                  stagger: 0.14,
                  ease: "power3.out",
                  delay: 0.1,
                }),
            });
          }
          if (heroFade.length) {
            gsap.from(heroFade, {
              opacity: 0,
              y: 16,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              delay: 0.7,
            });
          }
          // Hero image: held at 1.1, drifting inside its frame as the page leaves.
          const heroImg = root.querySelector<HTMLElement>("[data-hero='image']");
          if (heroImg) {
            gsap.fromTo(
              heroImg,
              { yPercent: 0 },
              {
                yPercent: 14,
                ease: "none",
                scrollTrigger: {
                  trigger: heroImg.parentElement,
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                  
                },
              }
            );
          }

          // — Matière: le calcaire est piloté par le scroll, pas lu en continu.
          // Rythme fixe — 3 s de vidéo consommées tous les 100vh. Desktop seul ;
          // mobile et reduce gardent l'image fixe (poster).
          const backdrop = root.querySelector<HTMLElement>("[data-scrub-video]");
          const video = backdrop?.querySelector("video");
          if (backdrop && video) {
            video.pause();
            let built = false;
            const build = () => {
              // Certains mp4 annoncent une durée Infinity tant qu'ils ne sont pas
              // bufferisés — sans durée finie, le seek est invalide et rien ne bouge.
              if (built || !Number.isFinite(video.duration) || video.duration === 0)
                return;
              built = true;
              const SECONDS_PER_VH = 3; // 3 s de vidéo par 100vh de scroll
              ScrollTrigger.create({
                trigger: backdrop,
                start: "top bottom",
                end: () =>
                  `+=${(video.duration / SECONDS_PER_VH) * window.innerHeight}`,
                scrub: true,
                onUpdate: (self) => {
                  video.currentTime = self.progress * video.duration;
                },
              });
              ScrollTrigger.refresh();
            };
            build();
            video.addEventListener("loadedmetadata", build);
            video.addEventListener("durationchange", build);
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

          // — Image life: every clipped frame holds its image at 1.1, drifting
          // slowly inside the mask on scroll. Moves within the frame, never out.
          for (const frame of [...seams("clip"), ...seams("settle")]) {
            const img = frame.querySelector("img");
            if (!img) continue;
            gsap.set(img, { scale: 1.1 });
            gsap.fromTo(
              img,
              { yPercent: -3 },
              {
                yPercent: 3,
                ease: "none",
                scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
              }
            );
          }

          // — The process cluster: three depths, three speeds. Far barely moves,
          // near presses forward. The one multi-speed parallax on the site.
          const cluster = root.querySelector<HTMLElement>("[data-cluster]");
          if (cluster) {
            const speed = { far: -40, mid: -100, near: -180 };
            for (const el of cluster.querySelectorAll<HTMLElement>("[data-depth]")) {
              gsap.to(el, {
                y: speed[el.dataset.depth as keyof typeof speed],
                ease: "none",
                scrollTrigger: {
                  trigger: cluster,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              });
            }
          }
        }
      );
    });

    return () => {
      cancelled = true;
      window.removeEventListener("orientationchange", setVh);
      mm.revert();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return <main ref={scope}>{children}</main>;
}
