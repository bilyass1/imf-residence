import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Maximize, Home } from "lucide-react";

interface ApartmentCardProps {
  apartment: {
    id: string;
    slug: string;
    title: string;
    type: string;
    surface: number;
    price: number;
    status: string;
    image: string;
  };
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const isAvailable = apartment.status === "available";

  return (
    <div className="group relative block w-full overflow-hidden bg-ink-surface border border-hairline/30 hover:border-bronze/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_60px_rgba(0,0,0,0.4)]">
      <div className="relative h-[300px] w-full overflow-hidden bg-ink">

        <Image
          src={apartment.image}
          alt={apartment.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />

        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors duration-500" />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute top-4 right-4 z-10">
          <span className={`px-3 py-1 text-xs uppercase tracking-wider ${isAvailable ? 'bg-forest text-ivory-muted border border-forest' : 'bg-ink-surface/80 text-ivory-muted backdrop-blur-sm border border-hairline/30'}`}>
            {isAvailable ? "Disponible" : "Réservé"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl mb-2 text-ivory group-hover:text-bronze-light transition-colors">{apartment.title}</h3>

        <div className="flex flex-wrap gap-4 text-sm text-ivory-muted mb-6">
          <div className="flex items-center gap-2">
            <Home size={16} />
            <span>{apartment.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={16} />
            <span>{apartment.surface} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-hairline/30">
          <div className="text-xl font-medium text-ivory">
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(apartment.price)}
          </div>

          <Link
            href={`/appartements/${apartment.slug}`}
            className="flex items-center gap-2 text-bronze text-sm uppercase tracking-widest hover:gap-4 transition-all group/link"
          >
            <span className="border-b border-bronze/0 group-hover/link:border-bronze/50 transition-all duration-300">Voir le plan</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
