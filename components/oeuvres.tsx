import Image from "next/image";
import { Container } from "@/components/container";
import { oeuvres, BLUR_DATA_URL } from "@/lib/content";

const total = String(oeuvres.works.length).padStart(2, "0");

export function Oeuvres() {
  return (
    <section id={oeuvres.id} className="bg-stone-50 text-stone-900" data-register="stone">
      <Container className="pb-16 pt-32 lg:pb-24 lg:pt-48">
        <p className="col-span-6 text-meta text-stone-600">
          {oeuvres.index} — {oeuvres.title}
        </p>
        <p className="col-span-6 text-right text-meta text-stone-600">{oeuvres.meta}</p>
      </Container>

      {/* Desktop: sticky hard-cut stack — the static seam for the pinned clip-reveal pass */}
      <div className="hidden lg:block" data-works>
        {oeuvres.works.map((work, i) => {
          const left = i % 2 === 0;
          return (
            <article
              key={work.title}
              className="sticky top-0 h-svh bg-stone-50"
              data-work
              data-register={work.register}
            >
              <Container className="h-full grid-rows-[auto_1fr_auto] gap-y-8 py-16">
                <p
                  className={`text-meta text-stone-600 ${
                    left ? "col-span-2 col-start-11 text-right" : "col-span-2"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} / {total}
                </p>

                <div
                  className={`relative row-start-2 col-span-8 overflow-hidden   ${
                    left ? "col-start-1" : "col-start-5"
                  }`}
                  data-anim={work.register === "stone" ? "clip" : "settle"}
                >
                  <Image
                    src={work.image.src}
                    alt={work.image.alt}
                    fill
                    sizes="(min-width: 1440px) 870px, 61vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className={`object-cover ${work.crop ?? ""}`}
                  />
                </div>

                <h3 className="row-start-3 col-span-6 self-end text-h2" data-work-title>
                  {work.title}
                </h3>
                <p
                  className="row-start-3 col-span-6 self-end text-right text-meta text-stone-600"
                  data-work-meta
                >
                  {work.material} — {work.project} — {work.year}
                </p>
              </Container>
            </article>
          );
        })}
      </div>

      {/* Mobile: swipeable scroll-snap carousel — no pin. Focusable so keyboards
          can scroll it; overscroll contained so a swipe at the edge never
          triggers browser back-navigation. */}
      <div
        role="region"
        aria-label={`${oeuvres.title} — ${oeuvres.meta}`}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[clamp(16px,4vw,64px)] pb-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
        data-works-carousel
      >
        {oeuvres.works.map((work, i) => (
          <article key={work.title} className="w-[82vw] shrink-0 snap-center" data-work>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={work.image.src}
                alt={work.image.alt}
                fill
                sizes="82vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className={`object-cover ${work.crop ?? ""}`}
              />
            </div>
            <p className="mt-4 text-meta text-stone-600">
              {String(i + 1).padStart(2, "0")} / {total}
            </p>
            <h3 className="mt-2 text-h2">{work.title}</h3>
            <p className="mt-2 text-meta text-stone-600">
              {work.material} — {work.project} — {work.year}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
