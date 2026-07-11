import content from "@/data/content.json";
import Image from "next/image";

export default function ResidencePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-ink">
      <div className="container mx-auto px-6 lg:px-12">
        <header className="mb-16 text-center max-w-4xl mx-auto">
          <div className="w-10 h-0.5 bg-bronze mb-5 mx-auto" />
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-ivory">La Résidence</h1>
          <p className="text-ivory-muted text-lg">
            Plongez dans l&apos;univers d&apos;IMF Residence, où chaque détail architectural 
            a été pensé pour offrir une expérience de vie exceptionnelle.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 md:order-1 relative h-[500px] bg-ink-surface border border-hairline/30 p-3 group">
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                alt="Intérieur raffiné"
                fill
                className="object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl mb-6 text-ivory">{content.about.title}</h2>
            <p className="text-ivory-muted leading-relaxed mb-6">
              {content.about.content}
            </p>
            <p className="text-ivory-muted leading-relaxed">
              Des matériaux nobles tels que le marbre, le bois massif et des métaux patinés
              viennent sublimer des espaces de vie généreux, baignés de lumière naturelle.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-ink-surface p-8 border border-hairline/20 hover:border-bronze/20 transition-colors">
            <h3 className="font-serif text-2xl mb-4 text-bronze">Localisation</h3>
            <p className="text-ivory-muted">Idéalement située au cœur de la ville, à proximité immédiate des commerces de prestige et des pôles culturels.</p>
          </div>
          <div className="bg-ink-surface p-8 border border-hairline/20 hover:border-bronze/20 transition-colors">
            <h3 className="font-serif text-2xl mb-4 text-bronze">Prestations</h3>
            <p className="text-ivory-muted">Conciergerie 24/7, espace bien-être privatif, parking sécurisé et domotique intégrée.</p>
          </div>
          <div className="bg-ink-surface p-8 border border-hairline/20 hover:border-bronze/20 transition-colors">
            <h3 className="font-serif text-2xl mb-4 text-bronze">Architecture</h3>
            <p className="text-ivory-muted">Une signature visuelle unique mêlant lignes épurées contemporaines et élégance intemporelle.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
