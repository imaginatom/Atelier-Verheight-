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

      {/* Le pic typographique — one full-viewport frame, severe and centered */}
      <Container className="min-h-svh content-center gap-y-0 py-32">
        <p className="col-span-12 text-center text-meta text-stone-600" data-anim="fade">
          {matiere.deepTime.lead}
        </p>
        <p className="col-span-12 mt-10 text-center text-display" data-anim="lines">
          {matiere.deepTime.figure}
        </p>
      </Container>

      <Container className="gap-y-0 pb-32 lg:pb-48">
        <p
          className="col-span-12 text-body lg:col-span-4 lg:col-start-8"
          data-anim="fade"
        >
          {matiere.deepTime.close}
        </p>
      </Container>
    </section>
  );
}
