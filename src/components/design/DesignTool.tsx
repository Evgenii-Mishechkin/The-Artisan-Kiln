"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { TILE_BY_ID } from "@/constants/tiles";
import { clearCell, placeTile } from "@/store/slices/designGridSlice";
import { selectDesignCells, selectPaletteTileIds } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { TileId } from "@/types";
import { GRID_SIZE } from "@/types";
import { TilePattern } from "@/components/ui/TilePattern";

function PaletteTile({ tileId }: { tileId: TileId }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${tileId}`,
    data: { tileId, source: "palette" as const },
  });
  const tile = TILE_BY_ID[tileId];

  return (
    <button
      ref={setNodeRef}
      type="button"
      {...listeners}
      {...attributes}
      className={`flex flex-col items-center gap-1 rounded border border-kiln-navy/20 bg-kiln-paper p-2 transition ${isDragging ? "opacity-40" : "hover:border-kiln-terracotta"}`}
      aria-label={`Drag ${tile.name} to grid`}
    >
      <TilePattern tileId={tileId} size={48} />
      <span className="text-[10px] font-medium uppercase text-kiln-navy">
        {tile.name}
      </span>
    </button>
  );
}

function TrashZone() {
  const { setNodeRef, isOver } = useDroppable({
    id: "design-trash",
    data: { trash: true },
  });

  return (
    <div
      ref={setNodeRef}
      className={`mt-3 rounded border-2 border-dashed px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-wide transition ${
        isOver
          ? "border-kiln-terracotta bg-kiln-terracotta/10 text-kiln-terracotta"
          : "border-kiln-navy/25 text-kiln-navy/50"
      }`}
    >
      Drop here to remove from board
    </div>
  );
}

function GridCell({ index, tileId }: { index: number; tileId: TileId | null }) {
  const dispatch = useAppDispatch();
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `cell-${index}`,
    data: { index },
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: `grid-${index}`,
    data: { tileId, source: "grid" as const, index },
    disabled: !tileId,
  });

  const removeFromBoard = () => {
    if (tileId) dispatch(clearCell(index));
  };

  return (
    <div
      ref={setDropRef}
      className={`relative aspect-square border-b-2 border-r-2 border-solid border-kiln-ink bg-kiln-cream/50 transition [&:nth-child(6n)]:border-r-0 [&:nth-last-child(-n+6)]:border-b-0 ${isOver ? "ring-2 ring-inset ring-kiln-terracotta" : ""}`}
    >
      {tileId && (
        <motion.div
          key={tileId}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className={`group/cell relative h-full w-full overflow-hidden ${isDragging ? "opacity-30" : ""}`}
        >
          <div
            ref={setDragRef}
            {...listeners}
            {...attributes}
            className="h-full w-full cursor-grab active:cursor-grabbing"
          >
            <TilePattern
              tileId={tileId}
              size={64}
              className="!h-full !w-full !max-h-none !max-w-none"
            />
          </div>
          <button
            type="button"
            onClick={removeFromBoard}
            className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-kiln-navy/80 text-xs font-bold leading-none text-kiln-cream opacity-0 transition-opacity hover:bg-kiln-terracotta focus-visible:opacity-100 group-hover/cell:opacity-100 group-focus-within/cell:opacity-100"
            aria-label="Remove tile from design board"
            title="Remove from board"
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  );
}

export function DesignTool() {
  const dispatch = useAppDispatch();
  const cells = useAppSelector(selectDesignCells);
  const paletteIds = useAppSelector(selectPaletteTileIds);
  const [activeTileId, setActiveTileId] = useState<TileId | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const onDragStart = (event: DragStartEvent) => {
    const tileId = event.active.data.current?.tileId as TileId | undefined;
    if (tileId) setActiveTileId(tileId);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const active = event.active.data.current;
    const tileId = active?.tileId as TileId | undefined;
    if (!tileId) {
      setActiveTileId(null);
      return;
    }

    const over = event.over;
    const source = active?.source as "palette" | "grid" | undefined;
    const fromIndex = active?.index as number | undefined;

    if (over?.id === "design-trash" && source === "grid") {
      if (typeof fromIndex === "number") dispatch(clearCell(fromIndex));
      setActiveTileId(null);
      return;
    }

    const toIndex = over?.data.current?.index as number | undefined;
    if (typeof toIndex !== "number") {
      if (source === "grid" && typeof fromIndex === "number") {
        dispatch(clearCell(fromIndex));
      }
      setActiveTileId(null);
      return;
    }

    dispatch(placeTile({ index: toIndex, tileId }));
    if (source === "grid" && typeof fromIndex === "number" && fromIndex !== toIndex) {
      dispatch(clearCell(fromIndex));
    }
    setActiveTileId(null);
  };

  return (
    <section className="hidden flex-col gap-4 lg:flex">
      <div className="text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-kiln-navy">
          Visualize Your Order
        </h2>
        <p className="mt-1 text-[10px] uppercase tracking-wide text-kiln-navy/50">
          Drag tiles from the palette onto the board
        </p>
      </div>

      {paletteIds.length === 0 ? (
        <p className="rounded border border-dashed border-kiln-navy/30 p-6 text-center text-sm text-kiln-navy/50">
          Add tiles to your cart to unlock the design palette.
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col">
              <div
                className="grid gap-0 border-2 border-solid border-kiln-ink"
                style={{
                  gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                }}
              >
                {cells.map((cellTileId, index) => (
                  <GridCell key={index} index={index} tileId={cellTileId} />
                ))}
              </div>
              <TrashZone />
            </div>

            <aside className="flex max-h-[420px] w-24 flex-col gap-2 overflow-y-auto">
              <p className="text-[10px] font-bold uppercase tracking-wider text-kiln-navy/60">
                Design Palette
              </p>
              {paletteIds.map((id) => (
                <PaletteTile key={id} tileId={id} />
              ))}
            </aside>
          </div>

          <DragOverlay dropAnimation={null}>
            {activeTileId ? (
              <TilePattern
                tileId={activeTileId}
                size={64}
                className="cursor-grabbing shadow-lg ring-2 ring-kiln-terracotta/40"
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </section>
  );
}
