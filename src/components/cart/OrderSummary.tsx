"use client";

import { formatCurrency } from "@/lib/format";
import {
  selectGrandTotal,
  selectShipping,
  selectSubtotal,
} from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";

interface OrderSummaryProps {
  className?: string;
  /** Без рамок и фона у значений (checkout под формой) */
  plainCells?: boolean;
}

function BracketValue({
  children,
  strong = false,
  plain = false,
}: {
  children: React.ReactNode;
  strong?: boolean;
  plain?: boolean;
}) {
  const cellChrome = plain
    ? "px-1.5 py-0.5"
    : `border-x-[2px] border-b-[2px] border-kiln-ink px-1.5 py-0.5 ${
        strong ? "rounded-b-[5px] bg-kiln-cream" : "bg-kiln-paper"
      }`;

  return (
    <span
      className={`inline-flex w-[6.3rem] items-center justify-between tabular-nums ${
        strong ? "font-bold text-kiln-ink" : "font-bold text-kiln-navy"
      } ${cellChrome}`}
    >
      <span className="text-kiln-navy/70">[</span>
      <span className="text-right">{children}</span>
      <span className="text-kiln-navy/70">]</span>
    </span>
  );
}

export function OrderSummary({
  className = "",
  plainCells = false,
}: OrderSummaryProps) {
  const subtotal = useAppSelector(selectSubtotal);
  const shipping = useAppSelector(selectShipping);
  const grandTotal = useAppSelector(selectGrandTotal);

  const row = (label: string, value: string, strong = false) => (
    <div className="grid grid-cols-[max-content_max-content] items-center justify-end gap-x-2 text-base leading-tight">
      <span
        className={`text-right font-bold uppercase tracking-wide ${strong ? "text-kiln-ink" : "text-kiln-navy"}`}
      >
        {label}:
      </span>
      <BracketValue strong={strong} plain={plainCells}>
        {value}
      </BracketValue>
    </div>
  );

  return (
    <div className={`space-y-0 ${className}`}>
      {row("Subtotal", formatCurrency(subtotal))}
      {row("Shipping", formatCurrency(shipping))}
      {row("Grand Total", formatCurrency(grandTotal), true)}
    </div>
  );
}
