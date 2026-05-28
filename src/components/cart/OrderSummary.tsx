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
  variant?: "cart" | "checkout";
}

function BracketValue({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block min-w-[6.25rem] border border-kiln-navy/25 bg-kiln-paper px-2 py-1 text-right text-base font-medium tabular-nums">
      {children}
    </span>
  );
}

export function OrderSummary({
  className = "",
  variant = "cart",
}: OrderSummaryProps) {
  const subtotal = useAppSelector(selectSubtotal);
  const shipping = useAppSelector(selectShipping);
  const grandTotal = useAppSelector(selectGrandTotal);

  const row = (label: string, value: string, highlight?: boolean) => (
    <div
      className={`flex items-center justify-between gap-3 text-sm sm:text-base ${
        highlight ? "font-bold text-kiln-navy" : "text-kiln-navy/85"
      }`}
    >
      <span className="uppercase tracking-wide">{label}</span>
      {highlight ? (
        <span className="inline-block min-w-[6.25rem] border-2 border-kiln-navy/30 bg-kiln-cream-dark px-2 py-1 text-right text-base font-bold tabular-nums">
          {value}
        </span>
      ) : (
        <BracketValue>{value}</BracketValue>
      )}
    </div>
  );

  return (
    <div
      className={`space-y-2.5 ${variant === "checkout" ? "" : "w-fit max-w-full border-t-2 border-kiln-navy/10 pt-4"} ${className}`}
    >
      {variant === "checkout" && (
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-kiln-navy">
          Order Summary
        </h2>
      )}
      {row("Subtotal", formatCurrency(subtotal))}
      {row("Shipping", formatCurrency(shipping))}
      {row("Grand Total", formatCurrency(grandTotal), true)}
    </div>
  );
}
