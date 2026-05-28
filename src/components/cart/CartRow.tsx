"use client";

import { motion } from "framer-motion";
import { TILE_BY_ID } from "@/constants/tiles";
import { formatCurrency } from "@/lib/format";
import {
  decrementLineQuantity,
  incrementLineQuantity,
  setLineQuantity,
} from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import type { CartLine } from "@/types";
import { CartActionButton } from "@/components/cart/CartActionButton";
import { CartBracketField } from "@/components/cart/CartBracketField";
import {
  cartBodyCell,
  cartColItem,
  cartColTight,
  cartColValue,
} from "@/components/cart/cartTableLayout";
import { TilePattern } from "@/components/ui/TilePattern";

interface CartRowProps {
  line: CartLine;
}

export function CartRow({ line }: CartRowProps) {
  const dispatch = useAppDispatch();
  const tile = TILE_BY_ID[line.tileId];

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-kiln-paper"
    >
      <td className={`${cartBodyCell} ${cartColTight}`}>
        <div className="mx-auto flex h-full w-max max-w-[4.75rem] flex-col items-center justify-center gap-1">
          <TilePattern tileId={line.tileId} size={44} />
          <span className="whitespace-normal text-[11px] font-bold uppercase leading-tight text-kiln-navy">
            {tile.name}
          </span>
        </div>
      </td>
      <td className={`${cartBodyCell} ${cartColItem} hidden sm:table-cell`}>
        <div className="flex h-full items-center justify-center">
          <TilePattern tileId={line.tileId} size={56} />
        </div>
      </td>
      <td className={`${cartBodyCell} ${cartColValue}`}>
        <div className="flex h-full items-center justify-center">
          <CartBracketField
            value={String(line.quantity)}
            onChange={(raw) => {
              const v = parseInt(raw, 10);
              if (Number.isNaN(v)) return;
              dispatch(setLineQuantity({ lineId: line.id, quantity: v }));
            }}
            ariaLabel={`Quantity for ${tile.name}`}
          />
        </div>
      </td>
      <td className={`${cartBodyCell} ${cartColValue}`}>
        <div className="flex h-full items-center justify-center">
          <CartBracketField
            value={formatCurrency(tile.unitPrice)}
            ariaLabel={`Unit price for ${tile.name}`}
          />
        </div>
      </td>
      <td className={`${cartBodyCell} ${cartColTight}`}>
        <div className="flex h-full items-center justify-center gap-1">
          <CartActionButton
            variant="add"
            onClick={() => dispatch(incrementLineQuantity(line.id))}
            ariaLabel={`Add one ${tile.name}`}
          />
          <CartActionButton
            variant="remove"
            onClick={() => dispatch(decrementLineQuantity(line.id))}
            ariaLabel={`Remove one ${tile.name}`}
          />
        </div>
      </td>
    </motion.tr>
  );
}
