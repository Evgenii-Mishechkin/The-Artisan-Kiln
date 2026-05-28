"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { selectCartLines } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";
import { AddTileDropdown } from "@/components/cart/AddTileDropdown";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { CartRow } from "@/components/cart/CartRow";
import {
  cartCell,
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
            <AnimatePresence initial={false}>
              {lines.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className={`${cartCell} border-b-0 border-l-0 border-r-0 py-8 text-sm text-kiln-navy/50`}
                  >
                    Your cart is empty. Add tiles to get started.
                  </td>
                </tr>
              ) : (
                lines.map((line) => <CartRow key={line.id} line={line} />)
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="grid grid-flow-col justify-items-end sm:grid-cols-[auto_1fr] sm:items-start">
        <div className="pl-0 pt-2 sm:pl-8 sm:pt-4">
          <Image
            src="/assets/decor/geo-tile-terra.svg"
            alt=""
            width={64}
            height={64}
            className="h-10 w-10 -rotate-[18deg] rounded-[5px] sm:h-16 sm:w-16"
            unoptimized
          />
        </div>
        <AddTileDropdown />
        <OrderSummary className="sm:justify-self-end" />
      </div>
    </section>
  );
}
