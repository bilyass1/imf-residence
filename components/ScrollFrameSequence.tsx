"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 226;
const DURATION_MS = 7500; // 7.5 seconds
const padFrame = (num: number) => num.toString().padStart(3, "0");

// Module-level image cache — survives React StrictMode double-mounts
const imageCache: HTMLImageElement[] = [];
let cacheReady = false;

export default function ScrollFrameSequence() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(cacheReady);
  const [animDone, setAnimDone] = useState(false);
  const rafRef = useRef<number>(0);

  // --- STEP 1: Preload all images ---
  useEffect(() => {
    if (cacheReady) {
      setIsReady(true);
      setLoadedCount(TOTAL_FRAMES);
      return;
    }

    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/residence/frame_${padFrame(i)}.webp`;

      const onSettle = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          cacheReady = true;
          setIsReady(true);
        }
      };

      img.onload = onSettle;
      img.onerror = onSettle;
      imageCache[i - 1] = img;
    }
  }, []);

  // --- STEP 2: Run animation once ready ---
  useEffect(() => {
    if (!isReady) return;

    // Lock scroll during animation
    document.body.style.overflow = "hidden";

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / DURATION_MS, 1);

      // Ease in-out (quadratic)
      const ease =
        rawProgress < 0.5
          ? 2 * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      const idx = Math.round(ease * (TOTAL_FRAMES - 1));
      setFrameIndex(idx);

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        document.body.style.overflow = "";
        setAnimDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, [isReady]);

  const progressPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  const currentSrc = `/frames/residence/frame_${padFrame(frameIndex + 1)}.webp`;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Loading overlay — shown until all frames are ready */}
      <div
        className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
          isReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(/images/residence-poster.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
          <span className="uppercase tracking-[0.3em] text-sm mb-6">
            Chargement
          </span>
          <div className="w-64 h-px bg-white/20 relative">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-white/40 mt-4 tracking-widest font-light">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* The actual animation: a simple <img> whose src changes every rAF tick */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt=""
        className="w-full h-full object-cover"
        style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.8s" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

      {/* Debug frame counter (top-right, discreet) */}
      <div className="absolute top-3 right-4 z-50 font-mono text-[10px] text-white/30">
        {frameIndex + 1} / {TOTAL_FRAMES}
      </div>

      {/* Scroll hint — appears after animation completes */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 transition-all duration-700 ${
          animDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="uppercase tracking-widest text-[11px]">
          Découvrir
        </span>
        <div className="w-px h-10 bg-white/40 animate-pulse" />
      </div>
    </div>
  );
}
