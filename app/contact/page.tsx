import content from "@/data/content.json";
import ButtonCTA from "@/components/ButtonCTA";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-ink">
      <div className="container mx-auto px-6 lg:px-12">
        <header className="mb-16">
          <div className="w-10 h-0.5 bg-bronze mb-5" />
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-ivory">Contact</h1>
          <p className="text-ivory-muted text-lg max-w-2xl">
            Notre équipe se tient à votre entière disposition pour vous accompagner dans votre projet d&apos;acquisition.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="bg-ink-surface p-8 md:p-12 border border-hairline/30">
            <h2 className="font-serif text-3xl mb-8 text-ivory">Demande d&apos;informations</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm uppercase tracking-widest text-bronze mb-2">Prénom</label>
                  <input type="text" id="firstName" className="w-full bg-ink border border-hairline/30 px-4 py-3 text-ivory placeholder-ivory-muted/40 focus:outline-none focus:border-bronze transition-colors" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm uppercase tracking-widest text-bronze mb-2">Nom</label>
                  <input type="text" id="lastName" className="w-full bg-ink border border-hairline/30 px-4 py-3 text-ivory placeholder-ivory-muted/40 focus:outline-none focus:border-bronze transition-colors" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm uppercase tracking-widest text-bronze mb-2">Email</label>
                <input type="email" id="email" className="w-full bg-ink border border-hairline/30 px-4 py-3 text-ivory placeholder-ivory-muted/40 focus:outline-none focus:border-bronze transition-colors" />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm uppercase tracking-widest text-bronze mb-2">Vous êtes intéressé par</label>
                <select id="interest" className="w-full bg-ink border border-hairline/30 px-4 py-3 text-ivory focus:outline-none focus:border-bronze transition-colors appearance-none rounded-none">
                  <option value="studio">Studio Premium</option>
                  <option value="f2">Appartement F2</option>
                  <option value="duplex">Duplex Signature</option>
                  <option value="other">Autre demande</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-widest text-bronze mb-2">Message</label>
                <textarea id="message" rows={5} className="w-full bg-ink border border-hairline/30 px-4 py-3 text-ivory placeholder-ivory-muted/40 focus:outline-none focus:border-bronze transition-colors"></textarea>
              </div>

              <div className="pt-4">
                <ButtonCTA className="w-full" type="submit">Envoyer la demande</ButtonCTA>
              </div>
            </form>
          </div>

          {/* Map & Info */}
          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-2xl mb-6 text-ivory">Bureau des Ventes</h3>
              <div className="space-y-4 text-ivory-muted">
                <p>{content.contact.address}</p>
                <p>Tél : {content.contact.phone}</p>
                <p>Email : {content.contact.email}</p>
              </div>
            </div>

            <div className="relative h-[400px] bg-ink-surface border border-hairline/30 p-2 group overflow-hidden">
              <div className="w-full h-full relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                  alt="Vue aérienne localisation"
                  fill
                  className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/10 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <p className="text-ivory uppercase tracking-widest text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">Découvrir le quartier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
