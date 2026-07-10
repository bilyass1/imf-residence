export type GalleryImage = {
  id: string;
  src: string;
  category: string;
  label: string;
  width: number;
  height: number;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "facade-principale",
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    category: "Extérieur",
    label: "Façade Principale",
    width: 1600,
    height: 1067,
  },
  {
    id: "salon-3b",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    category: "Salon",
    label: "Salon — Appartement 3B",
    width: 1600,
    height: 1067,
  },
  {
    id: "chambre-master",
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85",
    category: "Chambres",
    label: "Suite Parentale — Appartement 4A",
    width: 1600,
    height: 1200,
  },
  {
    id: "cuisine-premium",
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=85",
    category: "Cuisine",
    label: "Cuisine Équipée — Appartement 2C",
    width: 1600,
    height: 1067,
  },
  {
    id: "salle-bain-marbre",
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85",
    category: "Salle de bain",
    label: "Salle de Bain en Marbre — Appartement 5B",
    width: 1600,
    height: 2400,
  },
  {
    id: "jardin-paysager",
    src: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1600&q=85",
    category: "Extérieur",
    label: "Jardin Paysager",
    width: 1600,
    height: 1067,
  },
  {
    id: "salon-vue-panoramique",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    category: "Salon",
    label: "Salon Vue Panoramique — Appartement 7C",
    width: 1600,
    height: 1200,
  },
  {
    id: "chambre-enfant",
    src: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1600&q=85",
    category: "Chambres",
    label: "Chambre Enfant — Appartement 3B",
    width: 1600,
    height: 1067,
  },
  {
    id: "terrasse-rooftop",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    category: "Extérieur",
    label: "Terrasse Rooftop — Duplex B 0-2",
    width: 1600,
    height: 1067,
  },
  {
    id: "cuisine-ilot",
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=85",
    category: "Cuisine",
    label: "Cuisine avec Îlot Central — Appartement 6A",
    width: 1600,
    height: 1200,
  },
  {
    id: "lobby-entree",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    category: "Extérieur",
    label: "Hall d'Entrée — Résidence IMF",
    width: 1600,
    height: 1067,
  },
  {
    id: "sdb-double-vasque",
    src: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1600&q=85",
    category: "Salle de bain",
    label: "Salle de Bain Double Vasque — Appartement 4A",
    width: 1600,
    height: 1200,
  },
];

export const galleryCategories = [
  "Tout",
  "Extérieur",
  "Salon",
  "Chambres",
  "Cuisine",
  "Salle de bain",
];
