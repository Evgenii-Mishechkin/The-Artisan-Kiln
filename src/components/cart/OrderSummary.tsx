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

function BracketValue({
  children,
  strong = false,
}: {
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center border-x-[2px] border-b-[2px] border-kiln-ink px-1.5 py-0.5 tabular-nums ${
        strong ? "font-bold text-kiln-ink" : "font-bold text-kiln-navy"
      } ${strong ? "rounded-b-[5px] bg-kiln-cream" : "bg-kiln-paper"}`}
    >
      <span className="mr-1 text-kiln-navy/70">[</span>
      <span className="min-w-[4.4rem] text-right">{children}</span>
      <span className="ml-1 text-kiln-navy/70">]</span>
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

  if (variant === "cart") {
    const cartRow = (label: string, value: string, strong = false) => (
      <div className="grid grid-cols-[max-content_max-content] items-center justify-end gap-x-2 text-base leading-tight">
        <span
          className={`text-right font-bold uppercase tracking-wide ${strong ? "text-kiln-ink" : "text-kiln-navy"}`}
        >
          {label}:
        </span>
        <BracketValue strong={strong}>{value}</BracketValue>
      </div>
    );

    return (
      <div className={`space-y-0 ${className}`}>
        {cartRow("Subtotal", formatCurrency(subtotal))}
        {cartRow("Shipping", formatCurrency(shipping))}
        {cartRow("Grand Total", formatCurrency(grandTotal), true)}
      </div>
    );
  }

  const row = (label: string, value: string, highlight?: boolean) => (
    <div
      className={`flex items-center justify-between gap-3 text-sm sm:text-base ${
        highlight ? "font-bold text-kiln-navy" : "text-kiln-navy/85"
      }`}
    >
      <span className="uppercase tracking-wide">{label}</span>
      {highlight ? (
        <BracketValue strong>{value}</BracketValue>
      ) : (
        <BracketValue>{value}</BracketValue>
      )}
    </div>
  );

  return (
    <div className={`space-y-2.5 ${className}`}>
      <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-kiln-navy">
        Order Summary
      </h2>
      {row("Subtotal", formatCurrency(subtotal))}
      {row("Shipping", formatCurrency(shipping))}
      {row("Grand Total", formatCurrency(grandTotal), true)}
    </div>
  );
}
