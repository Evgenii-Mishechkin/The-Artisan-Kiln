"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { selectCartLines } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";
import { AddTileDropdown } from "@/components/cart/AddTileDropdown";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { CartRow } from "@/components/cart/CartRow";
import {
  cartBodyCell,
  cartColTight,
  cartColValue,
  cartHead,
} from "@/components/cart/cartTableLayout";

function HeadTwoLine({ top, bottom }: { top: string; bottom: string }) {
  return (
    <span className="inline-flex max-w-[4.25rem] flex-col gap-px leading-tight">
      <span>{top}</span>
      <span className="font-bold normal-case tracking-normal opacity-90">
        {bottom}
      </span>
    </span>
  );
}

export function CartSection() {
  const lines = useAppSelector(selectCartLines);
  const [showEmpty, setShowEmpty] = useState(lines.length === 0);
  const [showRows, setShowRows] = useState(lines.length > 0);

  useEffect(() => {
    if (lines.length > 0 && showEmpty) {
      setShowEmpty(false);
    }
  }, [lines.length, showEmpty]);

  return (
    <section className="w-full max-w-full sm:w-fit">
      <div className="overflow-hidden rounded-t-[5px] border-2 border-kiln-ink bg-kiln-paper shadow-inner-bracket">
        <table className="w-full table-fixed border-collapse sm:w-[32.6rem]">
          <colgroup>
            <col className="w-[25.5%] sm:w-[5.9rem]" />
            <col className="w-[18.6%] sm:w-[4.3rem]" />
            <col className="w-[18.6%] sm:w-[4.3rem]" />
            <col className="w-[18.6%] sm:w-[4.3rem]" />
            <col className="w-[18.6%] sm:w-[4.3rem]" />
          </colgroup>
          <thead>
            <tr>
              <th className={`${cartHead} ${cartColTight} border-l-0 border-t-0`}>
                Tile Collection
              </th>
              <th className={`${cartHead} border-t-0`}>Item</th>
              <th className={`${cartHead} border-t-0`}>
                <HeadTwoLine top="Quantity" bottom="(sq. ft.)" />
              </th>
              <th className={`${cartHead} border-t-0`}>
                <HeadTwoLine top="Unit Price" bottom="($)" />
              </th>
              <th className={`${cartHead} ${cartColValue} border-r-0 border-t-0`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="[&>tr:last-child>td]:border-b-0">
            <AnimatePresence
              initial={false}
              onExitComplete={() => {
                if (lines.length === 0) {
                  setShowEmpty(true);
                  setShowRows(false);
                } else {
                  setShowRows(true);
                }
              }}
            >
              {showRows &&
                lines.map((line) => <CartRow key={line.id} line={line} />)}
              {showEmpty && (
                <motion.tr
                  key="cart-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td
                    colSpan={5}
                    className={`${cartBodyCell} border-b-0 border-l-0 border-r-0 text-sm text-kiln-navy/50`}
                  >
                    Your cart is empty. Add tiles to get started.
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="grid grid-flow-col justify-items-end sm:grid-cols-[auto_1fr] sm:items-start">
        <div className="hidden min-[425px]:flex items-end justify-self-start pt-2 sm:justify-self-auto sm:pl-6 sm:pt-4">
          <Image
            src="/assets/decor/hand-tile.png"
            alt=""
            width={140}
            height={140}
            className="h-14 w-auto max-w-[5.5rem] -translate-x-3 object-contain sm:h-[4.75rem] sm:max-w-[6.5rem] sm:translate-x-[25px]"
            unoptimized
          />
        </div>
        <AddTileDropdown />
        <OrderSummary className="sm:justify-self-end" />
      </div>
    </section>
  );
}
