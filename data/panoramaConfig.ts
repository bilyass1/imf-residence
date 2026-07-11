/**
 * Panorama variants and viewpoints per room.
 *
 * variants: 4 combinations of day/night × furnished/empty.
 *   If a variant image is null, that combination is unavailable and its toggle
 *   option is hidden in the UI.
 *
 * viewpoints: named camera angles reachable via the preset buttons at the
 *   bottom of the modal. Add or remove keys freely — the UI renders only those
 *   present for the current room.
 */

export interface RoomVariants {
  dayFurnished: string | null;
  nightFurnished: string | null;
  dayEmpty: string | null;
  nightEmpty: string | null;
}

export interface RoomViewpoint {
  label: string;
  yaw: number;
  pitch: number;
}

export interface RoomPanoramaConfig {
  variants: RoomVariants;
  viewpoints?: Record<string, RoomViewpoint>;
}

const panoramaConfig: Record<string, RoomPanoramaConfig> = {
  // ── Duplex C401 ────────────────────────────────────────────────────────────
  "C401-salon": {
    variants: {
      dayFurnished:   "/panoramas/studio-a101-salon.jpg",
      nightFurnished: "/panoramas/studio-a101-salon-nuit.png",
      dayEmpty:       "/panoramas/studio-a101-salon-jour-vide.png",
      nightEmpty:     "/panoramas/studio-a101-salon-nuit-vide.png",
    },
    viewpoints: {
      sofaView:   { label: "Vue Salon",          yaw: 0,     pitch: -0.05 },
      tvView:     { label: "Vue TV",             yaw: -1.4,  pitch: 0.0  },
      windowView: { label: "Vue Fenêtre",        yaw: 0.3,   pitch: 0.1  },
      diningView: { label: "Vue Salle à manger", yaw: 2.2,   pitch: -0.02 },
      barView:    { label: "Vue Bar",            yaw: 2.6,   pitch: 0.0  },
    },
  },
  "C401-jardin": {
    variants: {
      dayFurnished:   "/panoramas/jardin-c401.png",
      nightFurnished: "/panoramas/jardin-c401-nuit.png",
      dayEmpty:       null,
      nightEmpty:     null,
    },
    viewpoints: {
      windowView: { label: "Vue Ville",  yaw: 0.3,  pitch: 0.1  },
      sofaView:   { label: "Vue Jardin", yaw: 1.8,  pitch: -0.05 },
    },
  },

  // ── Studio A101 ────────────────────────────────────────────────────────────
  "A101-salon": {
    variants: {
      dayFurnished:   "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg",
      nightFurnished: null,
      dayEmpty:       null,
      nightEmpty:     null,
    },
    viewpoints: {
      sofaView:   { label: "Vue Salon",   yaw: 0,    pitch: -0.05 },
      windowView: { label: "Vue Fenêtre", yaw: 0.3,  pitch: 0.1  },
    },
  },
  "A101-sdb": {
    variants: {
      dayFurnished:   "https://photo-sphere-viewer-data.netlify.app/assets/sphere-test.jpg",
      nightFurnished: null,
      dayEmpty:       null,
      nightEmpty:     null,
    },
  },

  // ── F2 B204 ────────────────────────────────────────────────────────────────
  "B204-salon": {
    variants: {
      dayFurnished:   "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg",
      nightFurnished: null,
      dayEmpty:       null,
      nightEmpty:     null,
    },
    viewpoints: {
      sofaView:   { label: "Vue Salon",   yaw: 0,    pitch: -0.05 },
      windowView: { label: "Vue Fenêtre", yaw: 0.3,  pitch: 0.1  },
    },
  },
  "B204-chambre1": {
    variants: {
      dayFurnished:   "https://photo-sphere-viewer-data.netlify.app/assets/sphere-test.jpg",
      nightFurnished: null,
      dayEmpty:       null,
      nightEmpty:     null,
    },
  },
  "B204-cuisine": {
    variants: {
      dayFurnished:   "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg",
      nightFurnished: null,
      dayEmpty:       null,
      nightEmpty:     null,
    },
  },
};

export default panoramaConfig;
