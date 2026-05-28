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
    <section className="w-fit max-w-full flex flex-col gap-4">
      <h2 className="inline-block self-start text-[2rem] font-black uppercase leading-none tracking-tight text-kiln-ink">
        Shopping Cart & Design Tool
      </h2>
      <div className="w-fit max-w-full">
        <div className="overflow-hidden rounded-t-[5px] bg-kiln-paper shadow-inner-bracket">
          <table className="w-[22.1rem] table-fixed border-collapse sm:w-[32.6rem]">
            <colgroup>
              <col className="w-[6.3rem] sm:w-[8.9rem]" />
              <col className="hidden sm:table-column sm:w-[6.3rem]" />
              <col className="w-[4.9rem] sm:w-[5.4rem]" />
              <col className="w-[4.9rem] sm:w-[5.4rem]" />
              <col className="w-[5.2rem] sm:w-[5.8rem]" />
            </colgroup>
            <thead>
              <tr>
                <th className={`${cartHead} ${cartColTight}`}>
                  Tile Collection
                </th>
                <th className={`${cartHead} hidden sm:table-cell`}>Item</th>
                <th className={cartHead}>
                  <HeadTwoLine top="Quantity" bottom="(sq. ft.)" />
                </th>
                <th className={cartHead}>
                  <HeadTwoLine top="Unit Price" bottom="($)" />
                </th>
                <th className={`${cartHead} ${cartColTight}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {lines.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className={`${cartCell} py-8 text-sm text-kiln-navy/50`}
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

        <div className="grid sm:grid-cols-[auto_1fr] sm:items-start sm:gap-x-2">
          <div className="flex items-start gap-[3.9rem]">
            <Image
              src="/assets/decor/geo-tile-terra.svg"
              alt=""
              width={64}
              height={64}
              className="mt-[10px] hidden h-16 w-16 -rotate-[18deg] sm:ml-[15px] sm:block"
              unoptimized
            />
            <div className="mt-[10px]">
              <AddTileDropdown />
            </div>
          </div>
          <OrderSummary variant="cart" className="sm:justify-self-end" />
        </div>
      </div>
    </section>
  );
}
