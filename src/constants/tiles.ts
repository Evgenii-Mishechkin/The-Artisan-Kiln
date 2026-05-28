import type { TileProduct } from "@/types";

export const TILE_CATALOG: TileProduct[] = [
  {
    id: "ocean-wave",
    name: "Ocean Wave",
    unitPrice: 28,
    patternSrc: "/assets/tiles/ocean-wave.svg",
  },
  {
    id: "forest-fern",
    name: "Forest Fern",
    unitPrice: 32,
    patternSrc: "/assets/tiles/forest-fern.svg",
  },
  {
    id: "terracotta-dot",
    name: "Terracotta Dot",
    unitPrice: 24,
    patternSrc: "/assets/tiles/terracotta-dot.svg",
  },
  {
    id: "yellow-star",
    name: "Yellow Star",
    unitPrice: 30,
    patternSrc: "/assets/tiles/yellow-star.svg",
  },
];

export const TILE_BY_ID = Object.fromEntries(
  TILE_CATALOG.map((t) => [t.id, t]),
) as Record<TileProduct["id"], TileProduct>;

export const SHIPPING_FLAT_RATE = 25;
export const FREE_SHIPPING_THRESHOLD = 500;
