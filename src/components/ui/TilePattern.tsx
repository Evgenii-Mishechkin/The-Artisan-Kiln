import Image from "next/image";
import { TILE_BY_ID } from "@/constants/tiles";
import type { TileId } from "@/types";

interface TilePatternProps {
  tileId: TileId;
  size?: number;
  className?: string;
}

export function TilePattern({
  tileId,
  size = 48,
  className = "",
}: TilePatternProps) {
  const tile = TILE_BY_ID[tileId];
  return (
    <Image
      src={tile.patternSrc}
      alt={tile.name}
      width={size}
      height={size}
      className={`rounded-sm border border-kiln-navy/20 object-cover ${className}`}
      unoptimized
    />
  );
}
