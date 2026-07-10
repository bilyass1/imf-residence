import Link from "next/link";
import Image from "next/image";
import content from "@/data/content.json";

export default function Footer() {
  return (
    <footer className="bg-surface py-16 border-t border-accent/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/images/logo.png" 
                alt="IMF Tunisie" 
                width={150} 
                height={60} 
                className="object-contain"
                unoptimized
              />
            </Link>
            <p className="text-muted max-w-sm mt-4">
              L&apos;excellence de l&apos;immobilier de luxe. Une adresse prestigieuse pour un art de vivre incomparable.
            </p>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-accent mb-6 font-semibold text-sm">Contact</h4>
            <ul className="space-y-3 text-muted">
              <li className="flex items-center gap-2">📍 {content.contact.address}</li>
              <li className="flex items-center gap-2">📲 {content.contact.phone}</li>
              <li className="flex items-center gap-2">📧 {content.contact.email}</li>
              <li className="flex items-center gap-2">🌐 {content.contact.website}</li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-accent mb-6 font-semibold text-sm">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted hover:text-accent transition-colors uppercase text-sm tracking-wider">
                Instagram
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors uppercase text-sm tracking-wider">
                Facebook
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors uppercase text-sm tracking-wider">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-accent/20 flex flex-col md:flex-row items-center justify-between text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} IMF Tunisie. Tous droits réservés.</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-accent transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-accent transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
