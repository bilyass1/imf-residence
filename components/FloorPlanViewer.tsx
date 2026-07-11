"use client";

export interface Hotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  panoramaImage: string;
  viewpoint?: { yaw: number; pitch: number };
  /** Used to look up panoramaConfig — format: "{apartmentId}-{hotspotId}" */
  configKey?: string;
}

interface FloorPlanViewerProps {
  floorPlanImage: string;
  hotspots: Hotspot[];
  onHotspotClick: (hotspot: Hotspot) => void;
}

export default function FloorPlanViewer({ floorPlanImage, hotspots, onHotspotClick }: FloorPlanViewerProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] bg-ink-surface border border-hairline/20 overflow-hidden group">
      {/* Fallback image (if actual next/image is failing to load) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
        style={{ backgroundImage: `url(${floorPlanImage}), linear-gradient(45deg, #16151A, #1E1C21)` }}
      />
      
      {hotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group/hotspot"
          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
        >
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-ink-elevated text-ivory text-xs uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 group-hover/hotspot:-translate-y-1 transition-all duration-300 pointer-events-none border border-hairline/30">
            {hotspot.label}
          </div>
          
          {/* Pulse Button */}
          <button
            onClick={() => onHotspotClick(hotspot)}
            className="relative flex items-center justify-center w-6 h-6 rounded-full bg-bronze text-ivory shadow-[0_0_12px_rgba(169,134,90,0.3)] hover:scale-125 transition-transform cursor-pointer focus:outline-none"
            aria-label={`Voir ${hotspot.label} en 360`}
          >
            <div className="absolute inset-0 rounded-full bg-bronze animate-ping opacity-40" />
            <div className="relative w-2 h-2 rounded-full bg-ivory" />
          </button>
        </div>
      ))}
      
      {hotspots.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-ivory-muted uppercase tracking-widest text-sm">
          Plan détaillé bientôt disponible
        </div>
      )}
    </div>
  );
}
