"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { galleryImages, galleryCategories, type GalleryImage } from "@/data/gallery";

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/[0.92] backdrop-blur-xl" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-ivory-muted hover:text-bronze-light transition-colors"
        aria-label="Fermer"
      >
        <X size={28} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 z-10 text-ivory-muted hover:text-bronze-light transition-colors p-2"
        aria-label="Précédent"
      >
        <ChevronLeft size={40} />
      </button>

      {/* Image */}
      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-[82vh] max-w-[90vw]" style={{ aspectRatio: `${img.width} / ${img.height}`, height: "82vh", width: "auto" }}>
          <Image
            src={img.src}
            alt={img.label}
            fill
            className="object-contain"
            sizes="90vw"
            style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8)" }}
          />
        </div>
        <p className="text-bronze-light text-sm tracking-widest uppercase font-light">
          {img.label}
        </p>
        <p className="text-ivory-muted text-xs tracking-[0.3em]">
          {index + 1} / {images.length}
        </p>
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 z-10 text-ivory-muted hover:text-bronze-light transition-colors p-2"
        aria-label="Suivant"
      >
        <ChevronRight size={40} />
      </button>
    </motion.div>
  );
}

// ── Gallery Image Card ────────────────────────────────────────────────────────
function GalleryCard({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="relative break-inside-avoid mb-4 group cursor-pointer overflow-hidden border border-transparent hover:border-bronze/20 transition-colors duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.label}
        width={image.width}
        height={image.height}
        className="w-full h-auto object-cover transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08] group-hover:brightness-105 group-hover:saturate-110"
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Bronze tint overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(169,134,90,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Label on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-xs text-bronze-light uppercase tracking-widest font-light">
          {image.category}
        </p>
        <p className="text-ivory text-sm font-light mt-1 leading-tight">
          {image.label}
        </p>
      </div>
    </motion.div>
  );
}

// ── Filter Tabs ───────────────────────────────────────────────────────────────
function FilterTabs({
  activeCategory,
  onChange,
}: {
  activeCategory: string;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-12">
      {galleryCategories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="relative px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-300 overflow-hidden"
          >
            {isActive && (
              <motion.span
                layoutId="filter-bg"
                className="absolute inset-0 border border-bronze"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className={isActive ? "text-bronze" : "text-ivory-muted hover:text-ivory"}>
              {cat}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "Tout"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length)),
  [filtered.length]);
  const goNext = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % filtered.length)),
  [filtered.length]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-ink">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.header
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Bronze accent bar */}
          <div className="w-10 h-0.5 bg-bronze mb-5" />
          <h1 className="font-serif text-5xl md:text-6xl mb-4 text-ivory">Galerie</h1>
          <p className="text-ivory-muted text-lg max-w-2xl">
            Découvrez chaque espace à travers notre collection d&apos;images, reflet du soin apporté à chaque détail.
          </p>
        </motion.header>

        {/* Filter Tabs */}
        <FilterTabs activeCategory={activeCategory} onChange={setActiveCategory} />

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((image, idx) => (
              <GalleryCard
                key={image.id}
                image={image}
                index={idx}
                onClick={() => openLightbox(idx)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
