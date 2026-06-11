import { Container } from "@/components/container";
import { commande } from "@/lib/content";

export function Commande() {
  return (
    <section
      id={commande.id}
      className="bg-stone-950 text-stone-50"
      data-register="concrete"
    >
      <Container className="gap-y-0 pb-32 pt-32 lg:pb-48 lg:pt-56">
        <p className="col-span-12 text-meta text-stone-300">
          {commande.index} — {commande.title}
        </p>

        <h2 className="col-span-12 mt-8 text-display lg:col-span-11" data-anim="lines">
          {commande.heading}
        </h2>

        <p
          className="col-span-12 mt-16 text-body font-medium lg:col-span-5 lg:col-start-7 lg:mt-32"
          data-anim="fade"
        >
          {commande.statement}
        </p>
        <p
          className="col-span-12 mt-8 text-body text-stone-300 lg:col-span-5 lg:col-start-7"
          data-anim="fade"
        >
          {commande.body}
        </p>

        <div className="col-span-12 mt-24 self-end lg:col-span-6 lg:mt-40">
          <a
            href={`mailto:${commande.contact.email}`}
            className="link-fill text-body font-medium"
          >
            {commande.contact.email}
          </a>
          <p className="mt-8 text-meta text-stone-300">
            {commande.contact.phone}
            <br />
            {commande.contact.address}
          </p>
        </div>

        <p className="col-span-12 mt-16 self-end text-meta text-stone-300 lg:col-span-4 lg:col-start-9 lg:mt-40 lg:text-right">
          {commande.note}
        </p>
      </Container>
    </section>
  );
}
