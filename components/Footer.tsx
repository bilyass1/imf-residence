import Link from "next/link";
import content from "@/data/content.json";

export default function Footer() {
  return (
    <footer className="bg-ink-surface py-16 border-t border-hairline/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold tracking-wider text-bronze">
                IMF
              </span>
            </Link>
            <p className="text-ivory-muted max-w-sm mt-4">
              L&apos;excellence de l&apos;immobilier de luxe. Une adresse prestigieuse pour un art de vivre incomparable.
            </p>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-bronze mb-6 font-semibold text-xs">Contact</h4>
            <ul className="space-y-3 text-ivory-muted">
              <li>{content.contact.address}</li>
              <li>{content.contact.phone}</li>
              <li>{content.contact.email}</li>
              <li>{content.contact.website}</li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-bronze mb-6 font-semibold text-xs">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-ivory-muted hover:text-bronze-light transition-colors uppercase text-sm tracking-wider">
                Instagram
              </a>
              <a href="#" className="text-ivory-muted hover:text-bronze-light transition-colors uppercase text-sm tracking-wider">
                Facebook
              </a>
              <a href="#" className="text-ivory-muted hover:text-bronze-light transition-colors uppercase text-sm tracking-wider">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-hairline/10 flex flex-col md:flex-row items-center justify-between text-sm text-ivory-muted">
          <p>&copy; {new Date().getFullYear()} IMF Tunisie. Tous droits réservés.</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-bronze-light transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-bronze-light transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
