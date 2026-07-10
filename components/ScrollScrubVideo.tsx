"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollScrubVideoProps {
  src: string;
  poster?: string;
}

export default function ScrollScrubVideo({ src, poster }: ScrollScrubVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load metadata before setting up scrub so we know the duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => setIsLoaded(true);
    video.addEventListener("loadedmetadata", handleLoaded);

    // Already loaded (e.g. cached)
    if (video.readyState >= 1) setIsLoaded(true);

    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  // Set up GSAP ScrollTrigger once the video duration is known
  useEffect(() => {
    if (!isLoaded || !wrapperRef.current || !videoRef.current) return;

    const video = videoRef.current;
    const duration = video.duration || 9;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        video.currentTime = self.progress * duration;
      },
    });

    return () => {
      st.kill();
    };
  }, [isLoaded]);

  return (
    // Tall wrapper gives scroll room (400vh)
    <div ref={wrapperRef} style={{ height: "400vh" }} className="relative w-full">
      {/* Sticky viewport-height container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Poster shown until video metadata loads */}
        {!isLoaded && poster && (
          <div
            className="absolute inset-0 z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})` }}
          />
        )}

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s" }}
        />

        {/* Scroll hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/70">
          <span className="uppercase tracking-widest text-xs">Défiler pour explorer</span>
          <div className="w-px h-12 bg-white/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
