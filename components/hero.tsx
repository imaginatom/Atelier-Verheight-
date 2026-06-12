import Image from "next/image";
import { Container } from "@/components/container";
import { hero, BLUR_DATA_URL } from "@/lib/content";

// Hero animation is its own choreography (data-hero hooks, desktop only) —
// it never enters the generic data-anim passes, so mobile leaves it untouched.
export function Hero() {
  return (
    <section
      className="relative h-svh overflow-hidden bg-stone-950 text-stone-50"
      data-register="concrete"
    >
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        preload
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover"
        data-hero="image"
      />
      {/* Flat scrim — keeps type legible without a gradient */}
      <div aria-hidden className="absolute inset-0 bg-stone-950/45" data-hero="scrim" />

      <Container className="relative h-full grid-rows-[auto_auto_1fr] gap-y-8 pt-32 pb-8 lg:pb-16">
        <p className="col-span-10 max-w-[36ch] text-body lg:col-span-4" data-hero="fade">
          {hero.concept}
        </p>

        <ul className="col-span-12 text-meta text-stone-300 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:text-right">
          {hero.meta.map((line, i) => (
            <li key={line} className="flex gap-4 lg:justify-end" data-hero="fade">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className="text-stone-50">{line}</span>
            </li>
          ))}
        </ul>

        <h1
          className="col-span-12 row-start-3 self-end text-display font-semibold [font-size:clamp(3rem,9vw,10rem)]"
          data-hero="title"
        >
          {hero.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
      </Container>
    </section>
  );
}
