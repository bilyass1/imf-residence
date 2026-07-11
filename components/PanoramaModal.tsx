"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Moon, Sofa, Square } from "lucide-react";

import { Hotspot } from "./FloorPlanViewer";
import panoramaConfig, { RoomPanoramaConfig } from "@/data/panoramaConfig";

// ── Types ──────────────────────────────────────────────────────────────────────

type TimeOfDay = "day" | "night";
type FurnishState = "furnished" | "empty";

interface PanoramaModalProps {
  hotspot: Hotspot | null;
  onClose: () => void;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function getVariantUrl(
  config: RoomPanoramaConfig,
  time: TimeOfDay,
  furnish: FurnishState
): string | null {
  const key =
    time === "day"
      ? furnish === "furnished" ? "dayFurnished" : "dayEmpty"
      : furnish === "furnished" ? "nightFurnished" : "nightEmpty";
  return config.variants[key];
}

/** Returns true if ANY night variant exists for this room */
function hasNightVariant(config: RoomPanoramaConfig): boolean {
  return !!(config.variants.nightFurnished || config.variants.nightEmpty);
}

/** Returns true if ANY empty variant exists for this room */
function hasEmptyVariant(config: RoomPanoramaConfig): boolean {
  return !!(config.variants.dayEmpty || config.variants.nightEmpty);
}

// ── Bronze progress ring ───────────────────────────────────────────────────────

function ProgressRing({ size = 48, stroke = 3 }: { size?: number; stroke?: number }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="animate-[spin_1.4s_linear_infinite]" style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(169,134,90,0.2)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="#A9865A"
        strokeWidth={stroke}
        strokeDasharray={`${circ * 0.72} ${circ * 0.28}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Mode button (day/night, furnished/empty) ──────────────────────────────────

function ModeButton({
  active,
  onClick,
  icon,
  label,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        "flex flex-col items-center justify-center gap-1.5 w-16 h-16 rounded-2xl border-2 transition-all duration-300 select-none",
        active
          ? "bg-bronze border-bronze text-ink shadow-[0_0_20px_rgba(169,134,90,0.45)]"
          : "bg-ink-elevated/80 backdrop-blur-md border-hairline/40 text-ivory-muted hover:border-bronze/60 hover:text-bronze",
        disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[10px] uppercase tracking-widest font-medium leading-none">{label}</span>
    </button>
  );
}

// ── Preset viewpoint button ────────────────────────────────────────────────────

function ViewpointButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1 text-[11px] uppercase tracking-widest rounded-full border transition-all duration-200",
        active
          ? "bg-bronze-dark border-bronze-dark text-ivory"
          : "bg-ink-surface/80 backdrop-blur-md border-hairline/40 text-bronze hover:border-bronze-light hover:text-bronze-light",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function PanoramaModal({ hotspot, onClose }: PanoramaModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);

  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [furnishState, setFurnishState] = useState<FurnishState>("furnished");
  const [activeViewpoint, setActiveViewpoint] = useState<string | null>(null);

  // Derive room config from hotspot.configKey
  const roomConfig: RoomPanoramaConfig | null =
    hotspot?.configKey ? (panoramaConfig[hotspot.configKey] ?? null) : null;

  const canToggleNight = roomConfig ? hasNightVariant(roomConfig) : false;
  const canToggleEmpty = roomConfig ? hasEmptyVariant(roomConfig) : false;

  // ── Keyboard / scroll lock ─────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (hotspot) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [hotspot, onClose]);

  // ── Reset state on hotspot change ─────────────────────────────────────────
  useEffect(() => {
    if (hotspot) {
      setTimeOfDay("day");
      setFurnishState("furnished");
      setActiveViewpoint(null);
    }
  }, [hotspot?.id]);

  // ── Init / destroy viewer ──────────────────────────────────────────────────
  useEffect(() => {
    if (!hotspot || !containerRef.current) return;

    setIsLoading(true);
    let cancelled = false;

    const initViewer = async () => {
      const { Viewer } = await import("@photo-sphere-viewer/core");
      if (cancelled || !containerRef.current) return;

      // Resolve initial panorama URL
      const initialUrl = roomConfig
        ? (getVariantUrl(roomConfig, "day", "furnished") ?? hotspot.panoramaImage)
        : hotspot.panoramaImage;

      viewerRef.current = new Viewer({
        container: containerRef.current,
        panorama: initialUrl,
        navbar: false,
        defaultZoomLvl: 0,
        defaultYaw: hotspot.viewpoint?.yaw ?? 0,
        defaultPitch: hotspot.viewpoint?.pitch ?? 0,
        mousewheel: true,
        touchmoveTwoFingers: false,
        loadingTxt: "",
      });

      viewerRef.current.addEventListener("ready", () => {
        if (cancelled) return;
        setIsLoading(false);
        scheduleBackgroundPreload();
      });
    };

    initViewer();

    return () => {
      cancelled = true;
      if (viewerRef.current) { viewerRef.current.destroy(); viewerRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotspot?.id]);

  // ── Background preload after 2s ────────────────────────────────────────────
  const scheduleBackgroundPreload = useCallback(() => {
    if (!roomConfig) return;
    setTimeout(() => {
      const variants = roomConfig.variants;
      const urls = [
        variants.dayFurnished,
        variants.nightFurnished,
        variants.dayEmpty,
        variants.nightEmpty,
      ].filter((u): u is string => !!u);

      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    }, 2000);
  }, [roomConfig]);

  // ── Switch panorama on state change ───────────────────────────────────────
  const switchPanorama = useCallback(
    async (newTime: TimeOfDay, newFurnish: FurnishState) => {
      if (!viewerRef.current || !roomConfig) return;

      const url = getVariantUrl(roomConfig, newTime, newFurnish);
      if (!url) return;

      setIsSwitching(true);

      try {
        await viewerRef.current.setPanorama(url, {
          transition: true,
          showLoader: false,
        });

        // Cinematic full-turn after switch
        const pos = viewerRef.current.getPosition();
        await viewerRef.current.animate({
          yaw: pos.yaw + Math.PI * 2,
          pitch: pos.pitch,
          speed: "8rpm",
        });
      } catch {
        // animate() may throw if interrupted — that's fine
      } finally {
        setIsSwitching(false);
      }
    },
    [roomConfig]
  );

  // ── Preset viewpoint animation ─────────────────────────────────────────────
  const goToViewpoint = useCallback(
    async (key: string, vp: { yaw: number; pitch: number }) => {
      if (!viewerRef.current) return;
      setActiveViewpoint(key);
      try {
        await viewerRef.current.animate({
          yaw: vp.yaw,
          pitch: vp.pitch,
          speed: "2rpm",
        });
      } catch {
        // interrupted
      }
    },
    []
  );

  const viewpoints = roomConfig?.viewpoints ?? {};
  const viewpointEntries = Object.entries(viewpoints);

  return (
    <AnimatePresence>
      {hotspot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/[0.92] backdrop-blur-xl"
        >
          {/* ── Top bar ───────────────────────────────────────────────────── */}
          <div className="absolute top-0 left-0 w-full z-20 bg-gradient-to-b from-ink/90 via-ink/60 to-transparent pointer-events-none">
            <div className="flex items-start justify-between p-4 md:p-6">
              {/* Left spacer */}
              <div className="w-10" />

              {/* Center: title + buttons directly below */}
              <div className="flex flex-col items-center gap-3 pointer-events-auto">
                <div className="text-center">
                  <h3 className="font-serif text-xl md:text-2xl text-ivory">{hotspot.label}</h3>
                  <p className="text-ivory-muted text-xs uppercase tracking-widest mt-0.5">Visite 360°</p>
                </div>

                {/* Mode buttons — only shown after load */}
                {!isLoading && (
                  <div className="flex items-center gap-2">
                    <ModeButton
                      active={timeOfDay === "day"}
                      onClick={() => { setTimeOfDay("day"); switchPanorama("day", furnishState); }}
                      icon={<Sun size={18} />}
                      label="Jour"
                      disabled={isSwitching}
                    />
                    <ModeButton
                      active={timeOfDay === "night"}
                      onClick={() => { setTimeOfDay("night"); switchPanorama("night", furnishState); }}
                      icon={<Moon size={18} />}
                      label="Nuit"
                      disabled={!canToggleNight || isSwitching}
                    />
                    <div className="w-px h-8 bg-hairline/40" />
                    <ModeButton
                      active={furnishState === "furnished"}
                      onClick={() => { setFurnishState("furnished"); switchPanorama(timeOfDay, "furnished"); }}
                      icon={<Sofa size={18} />}
                      label="Meublé"
                      disabled={isSwitching}
                    />
                    <ModeButton
                      active={furnishState === "empty"}
                      onClick={() => { setFurnishState("empty"); switchPanorama(timeOfDay, "empty"); }}
                      icon={<Square size={18} />}
                      label="Vide"
                      disabled={!canToggleEmpty || isSwitching}
                    />
                  </div>
                )}
              </div>

              {/* Right: close */}
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ivory/10 hover:bg-bronze text-ivory hover:text-ink transition-colors focus:outline-none pointer-events-auto"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* ── Initial loading overlay ────────────────────────────────────── */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-ink"
              >
                <ProgressRing size={52} stroke={3} />
                <p className="uppercase tracking-widest text-xs text-ivory-muted mt-5">
                  Chargement du panorama…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Switching overlay (between variants) ──────────────────────── */}
          <AnimatePresence>
            {isSwitching && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                <ProgressRing size={40} stroke={2} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bottom: viewpoint preset pills ───────────────────────────── */}
          {!isLoading && viewpointEntries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute bottom-0 left-0 w-full z-20 pb-6 pt-10 bg-gradient-to-t from-ink/80 to-transparent flex justify-center"
            >
              <div className="flex flex-wrap justify-center gap-2 px-4">
                {viewpointEntries.map(([key, vp]) => (
                  <ViewpointButton
                    key={key}
                    label={vp.label}
                    active={activeViewpoint === key}
                    onClick={() => goToViewpoint(key, vp)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PSV container ─────────────────────────────────────────────── */}
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
