export default function GaleriePage() {
  const items = [
    { id: 1, title: "Façade Extérieure", span: "md:col-span-2 md:row-span-2", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" },
    { id: 2, title: "Lobby", span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
    { id: 3, title: "Espace Bien-être", span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1200&q=80" },
    { id: 4, title: "Salon Premium", span: "md:col-span-1 md:row-span-2", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" },
    { id: 5, title: "Cuisine Équipée", span: "md:col-span-2 md:row-span-1", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80" },
    { id: 6, title: "Vue Panoramique", span: "md:col-span-1 md:row-span-1", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12">
        <header className="mb-16">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Galerie</h1>
          <p className="text-muted text-lg max-w-2xl">
            Aperçu des finitions et des espaces communs de la résidence.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative bg-surface border border-accent/10 group overflow-hidden ${item.span}`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
              
              <div className="absolute bottom-6 left-6 z-10 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="font-serif text-xl text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
