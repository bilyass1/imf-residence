
import content from "@/data/content.json";
import apartments from "@/data/apartments.json";
import ButtonCTA from "@/components/ButtonCTA";
import ApartmentCard from "@/components/ApartmentCard";
import ScrollFrameSequence from "@/components/ScrollFrameSequence";

export default function Home() {
  return (
    <div>
      {/* Scroll-Scrubbed Hero with Frame Sequence */}
      <div className="relative">
        <ScrollFrameSequence />

        {/* Hero text overlay — pinned over the first 100vh of the scroll section */}
        <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-30 pointer-events-none">
          <div className="text-center px-6 pointer-events-auto">
            <h2 className="text-accent tracking-[0.2em] uppercase text-sm md:text-base font-semibold mb-6">
              {content.hero.subtitle}
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 max-w-5xl mx-auto leading-tight text-white drop-shadow-2xl">
              {content.hero.title}
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-lg mb-12 drop-shadow-lg">
              {content.hero.description}
            </p>
            <ButtonCTA href="/appartements">Découvrir les appartements</ButtonCTA>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-32 bg-background relative z-20">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
              {content.about.title}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              {content.about.content}
            </p>
            <ButtonCTA href="/residence">Explorer la résidence</ButtonCTA>
          </div>
          <div className="relative h-[600px] w-full border border-accent/20 p-4 group">
            <div className="w-full h-full relative overflow-hidden bg-surface">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
                alt="Architecture de luxe" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="py-32 bg-surface">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-accent tracking-[0.2em] uppercase text-sm font-semibold mb-4">
                Sélection
              </h2>
              <h3 className="font-serif text-4xl md:text-5xl">
                Nos Typologies
              </h3>
            </div>
            <ButtonCTA href="/appartements">Voir tout</ButtonCTA>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.slice(0, 3).map((apt) => (
              <ApartmentCard key={apt.id} apartment={apt} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
