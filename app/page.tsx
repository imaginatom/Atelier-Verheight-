import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Matiere } from "@/components/matiere";
import { SavoirFaire } from "@/components/savoir-faire";
import { Oeuvres } from "@/components/oeuvres";
import { Commande } from "@/components/commande";
import { Motion } from "@/components/motion";
import { footer } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />

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
