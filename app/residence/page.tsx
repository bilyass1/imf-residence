import content from "@/data/content.json";

export default function ResidencePage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12">
        <header className="mb-16 text-center max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">La Résidence</h1>
          <p className="text-muted text-lg">
            Plongez dans l&apos;univers d&apos;IMF Residence, où chaque détail architectural 
            a été pensé pour offrir une expérience de vie exceptionnelle.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 md:order-1 relative h-[500px] bg-surface border border-accent/20 p-3 group">
            <div className="w-full h-full relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" 
                alt="Intérieur raffiné" 
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl mb-6">{content.about.title}</h2>
            <p className="text-muted leading-relaxed mb-6">
              {content.about.content}
            </p>
            <p className="text-muted leading-relaxed">
              Des matériaux nobles tels que le marbre, le bois massif et des métaux patinés
              viennent sublimer des espaces de vie généreux, baignés de lumière naturelle.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface p-8 border border-accent/10 hover:border-accent/30 transition-colors">
            <h3 className="font-serif text-2xl mb-4 text-accent">Localisation</h3>
            <p className="text-muted">Idéalement située au cœur de la ville, à proximité immédiate des commerces de prestige et des pôles culturels.</p>
          </div>
          <div className="bg-surface p-8 border border-accent/10 hover:border-accent/30 transition-colors">
            <h3 className="font-serif text-2xl mb-4 text-accent">Prestations</h3>
            <p className="text-muted">Conciergerie 24/7, espace bien-être privatif, parking sécurisé et domotique intégrée.</p>
          </div>
          <div className="bg-surface p-8 border border-accent/10 hover:border-accent/30 transition-colors">
            <h3 className="font-serif text-2xl mb-4 text-accent">Architecture</h3>
            <p className="text-muted">Une signature visuelle unique mêlant lignes épurées contemporaines et élégance intemporelle.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
