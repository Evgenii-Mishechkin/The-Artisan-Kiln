"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TILE_BY_ID } from "@/constants/tiles";
import type { TileProduct } from "@/types";

const SUBTITLE_TILES_LEFT: TileProduct[] = [
  TILE_BY_ID["ocean-wave"],
  TILE_BY_ID["terracotta-dot"],
  TILE_BY_ID["forest-fern"],
];

const SUBTITLE_TILES_RIGHT: TileProduct[] = [
  TILE_BY_ID["ocean-wave"],
  TILE_BY_ID["terracotta-dot"],
  TILE_BY_ID["yellow-star"],
];

const DECOR_TEMPLE = "/assets/decor/header-temple.svg";
const DECOR_KILN = "/assets/decor/header-kiln.svg";

function SubtitleTile({ tile }: { tile: TileProduct }) {
  return (
    <Image
      src={tile.patternSrc}
      alt=""
      width={40}
      height={40}
      className="size-7 shrink-0 rounded-sm border border-kiln-ink/80 sm:size-9 lg:size-10"
      unoptimized
    />
  );
}

function SubtitleTileStrip({ tiles }: { tiles: TileProduct[] }) {
  return (
    <div className="flex shrink-0 items-center gap-px sm:gap-0.5">
      {tiles.map((tile, index) => (
        <SubtitleTile key={`${tile.id}-${index}`} tile={tile} />
      ))}
    </div>
  );
}

function TitleDecor({
  src,
  maxHeight,
}: {
  src: string;
  maxHeight: number | null;
}) {
  return (
    <div className="hidden shrink-0 items-center lg:flex" aria-hidden>
      <Image
        src={src}
        alt=""
        width={56}
        height={72}
        className="w-auto object-contain"
        style={
          maxHeight != null
            ? { height: maxHeight, maxHeight, width: "auto" }
            : undefined
        }
        unoptimized
      />
    </div>
  );
}

export function PageTitle() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => {
      setContentHeight(el.getBoundingClientRect().height);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="mt-6 flex justify-center">
      <div className="inline-flex max-w-full items-center gap-3 lg:gap-5">
        <TitleDecor src={DECOR_TEMPLE} maxHeight={contentHeight} />

        <div
          ref={contentRef}
          className="w-full max-w-full min-w-0 px-1 text-center"
        >
          <h1 className="mx-auto max-w-full text-[2.5rem] font-black uppercase leading-none tracking-wide text-kiln-ink sm:text-[3.125rem]">
            Ceramic Tile Order Form
          </h1>

          <div className="mt-1.5 flex flex-nowrap items-center justify-center gap-x-1 sm:gap-x-1.5">
            <SubtitleTileStrip tiles={SUBTITLE_TILES_LEFT} />
            <p className="shrink-0 text-[1.125rem] font-bold uppercase leading-none tracking-wide text-kiln-ink sm:text-[1.625rem] lg:text-[1.875rem]">
              The Artisan Kiln
            </p>
            <SubtitleTileStrip tiles={SUBTITLE_TILES_RIGHT} />
          </div>
        </div>

        <TitleDecor src={DECOR_KILN} maxHeight={contentHeight} />
      </div>
    </div>
  );
}
