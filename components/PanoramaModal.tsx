"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Hotspot } from "./FloorPlanViewer";

interface PanoramaModalProps {
  hotspot: Hotspot | null;
  onClose: () => void;
}

export default function PanoramaModal({ hotspot, onClose }: PanoramaModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showHelper, setShowHelper] = useState(true);

  // Keyboard / body-scroll management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (hotspot) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [hotspot, onClose]);

  // Dynamic import of PhotoSphereViewer (client-only)
  useEffect(() => {
    if (!hotspot || !containerRef.current) return;

    setIsLoading(true);
    setShowHelper(true);

    let cancelled = false;

    const initViewer = async () => {
      // Dynamically import to avoid SSR issues
      const { Viewer } = await import("@photo-sphere-viewer/core");

      if (cancelled || !containerRef.current) return;

      viewerRef.current = new Viewer({
        container: containerRef.current,
        panorama: hotspot.panoramaImage,
        navbar: ["zoom", "fullscreen"],
        defaultZoomLvl: 0,
        mousewheel: true,
        touchmoveTwoFingers: false,
      });

      viewerRef.current.addEventListener("ready", () => {
        if (cancelled) return;
        setIsLoading(false);
        setTimeout(() => setShowHelper(false), 3000);
      });
    };

    initViewer();

    return () => {
      cancelled = true;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [hotspot]);

  return (
    <AnimatePresence>
      {hotspot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
            <div>
              <h3 className="font-serif text-2xl text-white">{hotspot.label}</h3>
              <p className="text-white/60 text-sm uppercase tracking-widest mt-1">Visite 360°</p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent text-white hover:text-background transition-colors focus:outline-none"
              aria-label="Fermer la vue 360"
            >
              <X size={24} />
            </button>
          </div>

          {/* Loader */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-accent">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="uppercase tracking-widest text-sm">Chargement du panorama...</p>
            </div>
          )}

          {/* Helper hint */}
          <AnimatePresence>
            {!isLoading && showHelper && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white px-6 py-3 rounded-full uppercase tracking-widest text-xs pointer-events-none"
              >
                Glissez pour explorer
              </motion.div>
            )}
          </AnimatePresence>

          {/* Viewer container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full h-full"
            ref={containerRef}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
