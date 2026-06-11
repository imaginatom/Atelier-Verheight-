import Image from "next/image";
import { Container } from "@/components/container";
import { savoirFaire, BLUR_DATA_URL } from "@/lib/content";

export function SavoirFaire() {
  const [tailler, couler] = savoirFaire.crafts;

  return (
    <section
      id={savoirFaire.id}
      className="bg-stone-950 text-stone-50"
      data-register="concrete"
    >
      <Container className="pt-32 lg:pt-48">
        <p className="col-span-12 text-meta text-stone-300">
          {savoirFaire.index} — {savoirFaire.title}
        </p>
        {/* Statement pushed right — opposite of Matière's left anchor */}
        <h2
          className="col-span-12 mt-8 text-h2 lg:col-span-8 lg:col-start-5"
          data-anim="lines"
        >
          {savoirFaire.statement}
        </h2>
      </Container>

      {/* Tailler — stone register: image left, name hung off its lower edge */}
      <Container className="mt-24 gap-y-8 lg:mt-40" data-register={tailler.register}>
        <div className="relative col-span-12 aspect-[4/3] lg:col-span-6" data-anim="clip">
          <Image
            src={tailler.image.src}
            alt={tailler.image.alt}
            fill
            sizes="(min-width: 1440px) 645px, (min-width: 1024px) 46vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
        <div className="col-span-12 self-end lg:col-span-4 lg:col-start-8">
          <h3 className="text-h2" data-anim="lines">
            {tailler.name}
          </h3>
          <p className="mt-6 text-body text-stone-300" data-anim="fade">
            {tailler.body}
          </p>
        </div>
      </Container>

      {/* Couler — concrete register: mirrored, lower, heavier image */}
      <Container className="mt-24 gap-y-8 lg:mt-48" data-register={couler.register}>
        <div
          className="relative order-1 col-span-12 aspect-[3/2] lg:order-2 lg:col-span-7 lg:col-start-6"
          data-anim="settle"
        >
          <Image
            src={couler.image.src}
            alt={couler.image.alt}
            fill
            sizes="(min-width: 1440px) 760px, (min-width: 1024px) 53vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
        <div className="order-2 col-span-12 self-end lg:order-1 lg:col-span-4">
          <h3 className="text-h2" data-anim="lines">
            {couler.name}
          </h3>
          <p className="mt-6 text-body text-stone-300" data-anim="fade">
            {couler.body}
          </p>
        </div>
      </Container>

      {/* The piece emerging from the block — full-bleed, the section's single image moment */}
      <div className="relative mt-24 h-[60vh] lg:mt-48 lg:h-[90vh]" data-anim="clip">
        <Image
          src={savoirFaire.process.image.src}
          alt={savoirFaire.process.image.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
      </div>
      <Container className="py-8">
        <p className="col-span-12 text-meta text-stone-300 lg:col-span-5 lg:col-start-8 lg:text-right">
          {savoirFaire.process.caption}
        </p>
      </Container>
    </section>
  );
}
