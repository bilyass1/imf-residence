import { notFound } from "next/navigation";
import apartmentsData from "@/data/apartments.json";
import ButtonCTA from "@/components/ButtonCTA";
import InteractivePlanSection from "@/components/InteractivePlanSection";
import { Maximize, Home, Euro, Info } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return apartmentsData.map((apt) => ({
    slug: apt.slug,
  }));
}

export default function ApartmentDetailPage({ params }: PageProps) {
  const apartment = apartmentsData.find((a) => a.slug === params.slug);

  if (!apartment) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <Link href="/appartements" className="text-muted hover:text-accent transition-colors uppercase tracking-widest text-sm">
            &larr; Retour aux appartements
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Infos */}
          <div>
            <div className="mb-4">
              <span className={`px-3 py-1 text-xs uppercase tracking-wider inline-block ${apartment.status === 'available' ? 'bg-accent text-background' : 'bg-surface border border-accent/20 text-muted'}`}>
                {apartment.status === "available" ? "Disponible" : "Réservé"}
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl mb-6">{apartment.title}</h1>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              {apartment.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="border border-accent/20 p-4 bg-surface">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Home size={18} /> <span className="font-semibold uppercase tracking-wider text-xs">Type</span>
                </div>
                <div className="text-xl">{apartment.type}</div>
              </div>
              
              <div className="border border-accent/20 p-4 bg-surface">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Maximize size={18} /> <span className="font-semibold uppercase tracking-wider text-xs">Surface</span>
                </div>
                <div className="text-xl">{apartment.surface} m²</div>
              </div>

              <div className="border border-accent/20 p-4 bg-surface">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Info size={18} /> <span className="font-semibold uppercase tracking-wider text-xs">Étage</span>
                </div>
                <div className="text-xl">{apartment.floor}</div>
              </div>

              <div className="border border-accent/20 p-4 bg-surface">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Euro size={18} /> <span className="font-semibold uppercase tracking-wider text-xs">Prix</span>
                </div>
                <div className="text-xl font-medium">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(apartment.price)}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="uppercase tracking-widest text-sm font-semibold mb-4 text-accent border-b border-accent/20 pb-2">Prestations</h3>
              <ul className="list-disc list-inside text-muted space-y-2">
                {apartment.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            {apartment.status === "available" && (
              <ButtonCTA href="/contact">Demander des informations</ButtonCTA>
            )}
          </div>

          <InteractivePlanSection 
            floorPlanImage={apartment.floorPlanImage} 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            hotspots={apartment.hotspots as any}
          />
        </div>
      </div>
    </div>
  );
}
