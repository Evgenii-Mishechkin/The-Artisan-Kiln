import Image from "next/image";
import { TILE_CATALOG } from "@/constants/tiles";
import type { TileProduct } from "@/types";

const SUBTITLE_TILES_LEFT = TILE_CATALOG.slice(0, 3);
const SUBTITLE_TILES_RIGHT = TILE_CATALOG.slice(1, 4);

const DECOR_TEMPLE = "/assets/decor/header-temple.svg";
const DECOR_KILN = "/assets/decor/header-kiln.svg";

function SubtitleTile({ tile }: { tile: TileProduct }) {
  return (
    <Image
      src={tile.patternSrc}
      alt=""
      width={28}
      height={28}
      className="h-[22px] w-[22px] rounded-sm border border-kiln-navy/15 sm:h-7 sm:w-7"
      unoptimized
    />
  );
}

function SubtitleTileStrip({ tiles }: { tiles: TileProduct[] }) {
  return (
    <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
      {tiles.map((tile) => (
        <SubtitleTile key={tile.id} tile={tile} />
      ))}
    </div>
  );
}

function TitleDecor({ src }: { src: string }) {
  return (
    <div className="hidden h-full shrink-0 sm:block" aria-hidden>
      <Image
        src={src}
        alt=""
        width={56}
        height={72}
        className="h-full w-auto object-contain"
        unoptimized
      />
    </div>
  );
}

export function PageTitle() {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="mx-auto flex max-w-full items-stretch justify-center gap-3 sm:gap-5 lg:gap-8">
        <TitleDecor src={DECOR_TEMPLE} />

        <div className="min-w-0 text-center">
          <h1 className="text-xl font-black uppercase leading-tight tracking-wide text-kiln-navy sm:text-2xl lg:text-3xl">
            Ceramic Tile
            <br className="sm:hidden" /> Order Form
          </h1>

          <div className="mt-[0.325rem] flex items-center justify-center gap-1.5 sm:gap-3">
            <SubtitleTileStrip tiles={SUBTITLE_TILES_LEFT} />
            <p className="shrink-0 text-[1.5rem] font-bold uppercase leading-none tracking-normal text-kiln-navy">
              The Artisan Kiln
            </p>
            <SubtitleTileStrip tiles={SUBTITLE_TILES_RIGHT} />
          </div>
        </div>

        <TitleDecor src={DECOR_KILN} />
      </div>
    </div>
  );
}
