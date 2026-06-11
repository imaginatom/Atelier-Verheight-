import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { Matiere } from "@/components/matiere";
import { SavoirFaire } from "@/components/savoir-faire";
import { Oeuvres } from "@/components/oeuvres";
import { Commande } from "@/components/commande";
import { Motion } from "@/components/motion";
import { header, footer } from "@/lib/content";

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-stone-50 mix-blend-difference">
        <Container className="py-6">
          <div className="col-span-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <a href="#" className="text-meta font-medium">
              {header.wordmark}
            </a>
            <nav className="flex gap-4 text-meta lg:gap-8">
              {header.nav.map((item) => (
                <a key={item.href} href={item.href} className="link-fill">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </Container>
      </header>

      <Motion>
        <Hero />
        <Matiere />
        <SavoirFaire />
        <Oeuvres />
        <Commande />
      </Motion>

      <footer className="border-t border-stone-50/10 bg-stone-950 text-stone-300">
        <Container className="py-8">
          <div className="col-span-12 flex flex-wrap justify-between gap-x-8 gap-y-2 text-meta">
            <span>{footer.atelier}</span>
            <span>{footer.location}</span>
            <a href={`mailto:${footer.contact}`} className="link-fill">
              {footer.contact}
            </a>
            <span>{footer.year}</span>
          </div>
        </Container>
      </footer>
    </>
  );
}
