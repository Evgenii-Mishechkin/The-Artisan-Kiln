"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cartRadius } from "@/components/cart/cartTableLayout";
import { TILE_CATALOG } from "@/constants/tiles";
import { addTileFromCatalog } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import type { TileId } from "@/types";

export function AddTileDropdown() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const pick = (id: TileId) => {
    dispatch(addTileFromCatalog(id));
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative w-fit">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-fit items-center justify-start gap-1.5 ${cartRadius} border-2 border-solid border-kiln-ink bg-kiln-cream px-[7px] py-[3px] text-left text-base font-bold uppercase tracking-wide text-kiln-navy transition hover:opacity-90`}
      >
        <Image src="/assets/icons/add.svg" alt="" width={16} height={16} />
        <Image
          src="/assets/decor/geo-tile-terra.svg"
          alt=""
          width={14}
          height={14}
          className={`${cartRadius} border border-kiln-ink/40`}
          unoptimized
        />
        <span className="max-w-[8.5rem] whitespace-normal leading-none">
          Add New Tile to Cart
        </span>
        <Image
          src="/assets/icons/chevron-down.svg"
          alt=""
          width={14}
          height={14}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 right-0 z-20 mt-2 overflow-hidden ${cartRadius} border-2 border-solid border-kiln-ink/20 bg-kiln-paper shadow-lg`}
          >
            {TILE_CATALOG.map((tile) => (
              <li key={tile.id}>
                <button
                  type="button"
                  onClick={() => pick(tile.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-kiln-cream"
                >
                  <Image
                    src={tile.patternSrc}
                    alt=""
                    width={40}
                    height={40}
                    className={`${cartRadius} border-2 border-solid border-kiln-ink/15`}
                    unoptimized
                  />
                  <span className="font-medium text-kiln-navy">{tile.name}</span>
                  <span className="ml-auto text-sm text-kiln-navy/60">
                    ${tile.unitPrice.toFixed(2)}/sq. ft.
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
