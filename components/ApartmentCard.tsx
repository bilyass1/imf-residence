
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
    <div className="group relative block w-full overflow-hidden bg-surface border border-accent/10 hover:border-accent/30 transition-all duration-500">
      <div className="relative h-[300px] w-full overflow-hidden bg-background">

        {/* Real apartment image */}
        <Image
          src={apartment.image}
          alt={apartment.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

        <div className="absolute top-4 right-4 z-10">
          <span className={`px-3 py-1 text-xs uppercase tracking-wider ${isAvailable ? 'bg-accent text-background' : 'bg-surface/80 text-muted backdrop-blur-sm'}`}>
            {isAvailable ? "Disponible" : "Réservé"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl mb-2 group-hover:text-accent transition-colors">{apartment.title}</h3>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted mb-6">
          <div className="flex items-center gap-2">
            <Home size={16} />
            <span>{apartment.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={16} />
            <span>{apartment.surface} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-accent/10">
          <div className="text-xl font-medium">
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(apartment.price)}
          </div>
          
          <Link 
            href={`/appartements/${apartment.slug}`}
            className="flex items-center gap-2 text-accent text-sm uppercase tracking-widest hover:gap-4 transition-all"
          >
            Voir le plan <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
