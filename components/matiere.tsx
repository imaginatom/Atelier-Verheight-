import Image from "next/image";
import { Container } from "@/components/container";
import { matiere, BLUR_DATA_URL } from "@/lib/content";

export function Matiere() {
  return (
    <section id={matiere.id} className="bg-stone-50 text-stone-900" data-register="stone">
      <Container className="gap-y-0 pt-32 lg:pt-48">
        <p className="col-span-12 text-meta text-stone-50 mix-blend-difference">
          {matiere.index} — {matiere.title}
        </p>

        {/* Statement set over the image's top edge — spread, not stack */}
        <h2
          className="relative z-10 col-span-12 mt-8 text-h2 lg:col-span-10 lg:-mb-[0.45em]"
          data-anim="lines"
        >
          {matiere.statement}
        </h2>

        {/* Body hung low-left of the image, narrow measure — diagonal reading line */}
        <div className="col-span-12 mt-16 space-y-8 lg:col-span-3 lg:col-start-1 lg:mt-0 lg:self-start lg:pt-48">
          {matiere.paragraphs.map((p) => (
            <p key={p} className="text-body" data-anim="fade">
              {p}
            </p>
          ))}
        </div>

        <figure className="col-span-12 mt-16 lg:col-span-6 lg:col-start-5 lg:mt-0">
          <div className="relative aspect-[4/5] overflow-hidden" data-anim="clip">
            <Image
              src={matiere.image.src}
              alt={matiere.image.alt}
              fill
              sizes="(min-width: 1440px) 645px, (min-width: 1024px) 46vw, 100vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-meta text-stone-600 lg:hidden">
            {matiere.imageCaption}
          </figcaption>
        </figure>

        {/* Hung caption — alone in the right margin, aligned to the image's base */}
        <p className="hidden text-meta text-stone-600 lg:col-span-2 lg:col-start-11 lg:block lg:self-end">
          {matiere.imageCaption}
        </p>
      </Container>

      {/* Le pic typographique — full-bleed backdrop, content in grid */}
      <div
        className="relative mt-32 min-h-[84svh] overflow-hidden lg:mt-56 lg:min-h-[88svh]"
        data-scrub-video
      >
        <div className="pointer-events-none absolute inset-0">
          {/* Desktop : le calcaire défile au scroll. Mobile : le bloc reste fixe. */}
          <video
            src="/videos/limestone.mp4"
            poster={matiere.backdrop.src}
            muted
            playsInline
            preload="auto"
            className="hidden h-full w-full object-cover object-center lg:block"
          />
          <Image
            src={matiere.backdrop.src}
            alt={matiere.backdrop.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover object-center lg:hidden"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/99 via-stone-50/72 to-stone-50/38" />
        </div>
        <Container className="relative z-10 content-center gap-y-0 py-32 lg:py-48">
          <div className="col-span-12">
            <p className="text-center text-meta text-stone-700" data-anim="fade">
              {matiere.deepTime.lead}
            </p>
            <p className="mt-10 text-center text-display" data-anim="lines">
              {matiere.deepTime.figure}
            </p>
            <p
              className="mx-auto mt-12 max-w-[38ch] text-center text-body text-stone-800"
              data-anim="fade"
            >
              {matiere.deepTime.close}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
