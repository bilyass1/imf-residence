"use client";

import { useState } from "react";
import FloorPlanViewer, { Hotspot } from "@/components/FloorPlanViewer";
import PanoramaModal from "@/components/PanoramaModal";

interface InteractivePlanSectionProps {
  floorPlanImage?: string;
  hotspots?: Hotspot[];
}

export default function InteractivePlanSection({ floorPlanImage, hotspots = [] }: InteractivePlanSectionProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  if (!floorPlanImage) return null;

  return (
    <>
      <div className="relative">
        <div className="sticky top-32 w-full">
          <div className="mb-6 flex justify-between items-end">
            <h3 className="font-serif text-2xl">Plan Interactif</h3>
            <p className="text-xs text-muted uppercase tracking-widest hidden sm:block">Cliquez sur un point pour visiter</p>
          </div>
          
          <FloorPlanViewer 
            floorPlanImage={floorPlanImage} 
            hotspots={hotspots} 
            onHotspotClick={(hotspot) => setActiveHotspot(hotspot)} 
          />
        </div>
      </div>
      
      <PanoramaModal 
        hotspot={activeHotspot} 
        onClose={() => setActiveHotspot(null)} 
      />
    </>
  );
}
