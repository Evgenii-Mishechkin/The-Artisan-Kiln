"use client";

import { AnimatePresence, motion } from "framer-motion";
import { formatCurrency } from "@/lib/format";
import {
  selectGrandTotal,
  selectShipping,
  selectSubtotal,
} from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";
import type { CustomerForm } from "@/types";

interface OrderSuccessModalProps {
  open: boolean;
  onClose: () => void;
  customer: CustomerForm;
  lines: { name: string; quantity: number; total: number }[];
}

export function OrderSuccessModal({
  open,
  onClose,
  customer,
  lines,
}: OrderSuccessModalProps) {
  const subtotal = useAppSelector(selectSubtotal);
  const shipping = useAppSelector(selectShipping);
  const grandTotal = useAppSelector(selectGrandTotal);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-kiln-navy/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="order-modal-title"
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border-2 border-kiln-navy/20 bg-kiln-paper p-6 shadow-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="order-modal-title"
              className="text-lg font-bold uppercase text-kiln-navy"
            >
              Order confirmed (demo)
            </h2>
            <p className="mt-1 text-sm text-kiln-navy/70">
              No payment was processed. This is a preview of your order.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>{customer.name}</strong>
              </p>
              <p>{customer.email}</p>
              <p>{customer.address}</p>
              {customer.notes && (
                <p className="text-kiln-navy/80">{customer.notes}</p>
              )}
            </div>

            <ul className="mt-4 divide-y divide-kiln-navy/10 border-t border-kiln-navy/10">
              {lines.map((line) => (
                <li
                  key={line.name}
                  className="flex justify-between py-2 text-sm"
                >
                  <span>
                    {line.name} × {line.quantity} sq. ft.
                  </span>
                  <span>{formatCurrency(line.total)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-1 border-t border-kiln-navy/15 pt-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded bg-kiln-navy py-3 text-sm font-semibold uppercase text-kiln-cream"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
