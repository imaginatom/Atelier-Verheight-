import Image from "next/image";
import { Container } from "@/components/container";
import { matiere, BLUR_DATA_URL } from "@/lib/content";

export function Matiere() {
  return (
    <section id={matiere.id} className="bg-stone-50 text-stone-900" data-register="stone">
      <Container className="gap-y-0 py-32 lg:py-48">
        <p className="col-span-12 text-meta text-stone-600">
          {matiere.index} — {matiere.title}
        </p>

        <h2 className="col-span-12 mt-8 text-h2 lg:col-span-9" data-anim="lines">
          {matiere.statement}
        </h2>

        {/* Image low-left, text pushed further down on the right — diagonal reading line */}
        <figure className="col-span-12 mt-16 lg:col-span-5 lg:mt-40">
          <div className="relative aspect-[4/5]" data-anim="clip">
            <Image
              src={matiere.image.src}
              alt={matiere.image.alt}
              fill
              sizes="(min-width: 1440px) 535px, (min-width: 1024px) 38vw, 100vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-meta text-stone-600">
            {matiere.imageCaption}
          </figcaption>
        </figure>

        <div className="col-span-12 mt-16 space-y-8 lg:col-span-5 lg:col-start-8 lg:mt-64">
          {matiere.paragraphs.map((p) => (
            <p key={p} className="text-body" data-anim="fade">
              {p}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
