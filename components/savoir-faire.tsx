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

      {/* Tailler — name pulled left across the image's dark lower edge */}
      <Container className="mt-24 gap-y-8 lg:mt-40" data-register={tailler.register}>
        <div
          className="relative col-span-12 aspect-[4/3] overflow-hidden lg:col-start-1 lg:col-span-7 lg:row-start-1"
          data-anim="clip"
        >
          <Image
            src={tailler.image.src}
            alt={tailler.image.alt}
            fill
            sizes="(min-width: 1440px) 755px, (min-width: 1024px) 53vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover object-[50%_62%]"
          />
        </div>
        <div className="col-span-12 self-end lg:col-span-4 lg:col-start-7 lg:row-start-1">
          <h3 className="relative z-10 text-h2 text-stone-50 mix-blend-difference font-bold lg:-ml-24" data-anim="lines">
            {tailler.name}
          </h3>
          {/* Body hangs just clear of the image edge — only the name crosses it */}
          <p className="mt-6 max-w-[34ch] text-body text-stone-300 lg:ml-32" data-anim="fade">
            {tailler.body}
          </p>
        </div>
      </Container>

      {/* Couler — mirrored: name crosses into the image's dark upper-left */}
      <Container className="mt-24 gap-y-8 lg:mt-48" data-register={couler.register}>
        <div
          className="relative order-1 col-span-12 aspect-[3/2] overflow-hidden lg:order-2 lg:col-span-8 lg:col-start-5 lg:row-start-1"
          data-anim="settle"
        >
          <Image
            src={couler.image.src}
            alt={couler.image.alt}
            fill
            sizes="(min-width: 1440px) 865px, (min-width: 1024px) 61vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </div>
        <div className="order-2 col-span-12 lg:order-1  lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:mt-24">
          <h3 className="relative z-10 text-h2 text-stone-50 font-bold mix-blend-difference lg:-mr-24 lg:text-right" data-anim="lines">
            {couler.name}
          </h3>
          <p className="mt-6 max-w-[34ch] text-body s text-stone-300" data-anim="fade">
            {couler.body}
          </p>
        </div>
      </Container>

      {/* Le chantier — three crops at three depths. The site's only
          multi-speed parallax: justified once, here, where process is depth. */}
      <Container className="mt-32 gap-y-0 pb-32 lg:mt-56 lg:pb-48" data-cluster>
        <figure className="col-span-7 lg:col-span-3 lg:col-start-2" data-depth="far">
          <div className="relative aspect-square overflow-hidden" data-anim="clip">
            <Image
              src={savoirFaire.cluster[0].image.src}
              alt={savoirFaire.cluster[0].image.alt}
              fill
              sizes="(min-width: 1024px) 320px, 58vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover object-[50%_30%]"
            />
          </div>
          <figcaption className="mt-2 text-meta text-stone-300">
            {savoirFaire.cluster[0].caption}
          </figcaption>
        </figure>

        <figure
          className="col-span-9 col-start-4 mt-8 lg:col-span-4 lg:col-start-7 lg:mt-40"
          data-depth="mid"
        >
          <div className="relative aspect-[4/5] overflow-hidden" data-anim="clip">
            <Image
              src={savoirFaire.cluster[1].image.src}
              alt={savoirFaire.cluster[1].image.alt}
              fill
              sizes="(min-width: 1024px) 430px, 75vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover object-[50%_70%]"
            />
          </div>
          {/* Right-aligned so the near crop's overlap never covers it */}
          <figcaption className="mt-2 text-right text-meta text-stone-300">
            {savoirFaire.cluster[1].caption}
          </figcaption>
        </figure>

        <figure
          className="relative z-10 col-span-10 col-start-2 mt-8 lg:col-span-5 lg:col-start-4 lg:-mt-24"
          data-depth="near"
        >
          <div className="relative aspect-[4/5] overflow-hidden" data-anim="clip">
            <Image
              src={savoirFaire.cluster[2].image.src}
              alt={savoirFaire.cluster[2].image.alt}
              fill
              sizes="(min-width: 1024px) 540px, 83vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-meta text-stone-300">
            {savoirFaire.cluster[2].caption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
