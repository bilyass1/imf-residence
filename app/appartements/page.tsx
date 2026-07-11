"use client";

import { useState } from "react";
import apartmentsData from "@/data/apartments.json";
import ApartmentCard from "@/components/ApartmentCard";

export default function AppartementsPage() {
  const [filter, setFilter] = useState("all");

  const filteredApartments = apartmentsData.filter((apt) => {
    if (filter === "all") return true;
    return apt.type === filter;
  });

  const uniqueTypes = ["all", ...Array.from(new Set(apartmentsData.map(a => a.type)))];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-ink">
      <div className="container mx-auto px-6 lg:px-12">
        <header className="mb-16">
          <div className="w-10 h-0.5 bg-bronze mb-5" />
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-ivory">Les Appartements</h1>
          <p className="text-ivory-muted text-lg max-w-2xl">
            Du studio au duplex de prestige, découvrez nos espaces de vie conçus pour l&apos;excellence.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-hairline/20 pb-6">
          {uniqueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 border text-sm uppercase tracking-wider transition-all ${
                filter === type
                  ? "border-bronze bg-ink-surface text-bronze"
                  : "border-hairline/30 text-ivory-muted hover:border-bronze/50 hover:text-bronze-light"
              }`}
            >
              {type === "all" ? "Tous" : type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApartments.map((apt) => (
            <ApartmentCard key={apt.id} apartment={apt} />
          ))}
        </div>

        {filteredApartments.length === 0 && (
          <div className="text-center py-20 text-ivory-muted">
            Aucun appartement ne correspond à ce filtre.
          </div>
        )}
      </div>
    </div>
  );
}
