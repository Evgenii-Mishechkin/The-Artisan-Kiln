"use client";

import { useState } from "react";
import { TILE_BY_ID } from "@/constants/tiles";
import { formatCurrency } from "@/lib/format";
import { validateCheckout } from "@/lib/validation";
import { selectCartLines, selectGrandTotal } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";
import type { CardForm, CustomerForm, PaymentMethod } from "@/types";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { OrderSuccessModal } from "@/components/checkout/OrderSuccessModal";
import { PaymentMethods } from "@/components/checkout/PaymentMethods";
import { Toast } from "@/components/ui/Toast";

const emptyCustomer: CustomerForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  projectName: "",
  notes: "",
};

const emptyCard: CardForm = {
  number: "",
  expiry: "",
  cvv: "",
};

export function CheckoutSection() {
  const lines = useAppSelector(selectCartLines);
  const grandTotal = useAppSelector(selectGrandTotal);

  const [customer, setCustomer] = useState<CustomerForm>(emptyCustomer);
  const [card, setCard] = useState<CardForm>(emptyCard);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("credit_card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const setField =
    <K extends keyof CustomerForm>(key: K) =>
    (value: CustomerForm[K]) =>
      setCustomer((c) => ({ ...c, [key]: value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) {
      setToast("Add at least one tile to your cart.");
      return;
    }
    const nextErrors = validateCheckout(customer, paymentMethod, card);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setToast("Order placed successfully (demo).");
    setModalOpen(true);
  };

  const inputClass = (field: string) =>
    `w-full border-b-2 border-kiln-navy/35 bg-transparent py-2 text-sm text-kiln-navy outline-none transition focus:border-kiln-terracotta ${errors[field] ? "border-red-500" : ""}`;

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-kiln-navy">
            Customer Information
          </h2>
          <div className="space-y-4">
            <label className="block">
              <span className="text-[10px] font-bold uppercase text-kiln-navy/70">
                Customer Name
              </span>
              <input
                className={inputClass("name")}
                value={customer.name}
                onChange={(e) => setField("name")(e.target.value)}
              />
              {errors.name && (
                <span className="text-xs text-red-600">{errors.name}</span>
              )}
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[10px] font-bold uppercase text-kiln-navy/70">
                  Phone
                </span>
                <input
                  className={inputClass("phone")}
                  value={customer.phone}
                  onChange={(e) => setField("phone")(e.target.value)}
                />
                {errors.phone && (
                  <span className="text-xs text-red-600">{errors.phone}</span>
                )}
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase text-kiln-navy/70">
                  Email
                </span>
                <input
                  type="email"
                  className={inputClass("email")}
                  value={customer.email}
                  onChange={(e) => setField("email")(e.target.value)}
                />
                {errors.email && (
                  <span className="text-xs text-red-600">{errors.email}</span>
                )}
              </label>
            </div>
            <label className="block">
              <span className="text-[10px] font-bold uppercase text-kiln-navy/70">
                Shipping Address
              </span>
              <input
                className={inputClass("address")}
                value={customer.address}
                onChange={(e) => setField("address")(e.target.value)}
              />
              {errors.address && (
                <span className="text-xs text-red-600">{errors.address}</span>
              )}
            </label>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-kiln-navy">
            Project Name / Notes
          </h2>
          <div className="space-y-4">
            <label className="block">
              <span className="text-[10px] font-bold uppercase text-kiln-navy/70">
                Project Name
              </span>
              <input
                className={inputClass("projectName")}
                value={customer.projectName}
                onChange={(e) => setField("projectName")(e.target.value)}
                placeholder="e.g. Kitchen backsplash"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase text-kiln-navy/70">
                Notes
              </span>
              <textarea
                rows={3}
                className="mt-1 w-full resize-y rounded border border-kiln-navy/20 bg-kiln-paper/50 p-2 text-sm text-kiln-navy"
                value={customer.notes}
                onChange={(e) => setField("notes")(e.target.value)}
                placeholder="Installation details, preferences…"
              />
            </label>
          </div>
        </div>

        <div className="hidden lg:block">
          <OrderSummary variant="checkout" />
        </div>

        <PaymentMethods
          method={paymentMethod}
          onChange={setPaymentMethod}
          card={card}
          onCardChange={setCard}
          errors={errors}
        />

        <button
          type="submit"
          className="w-full rounded-sm bg-kiln-navy px-6 py-4 text-sm font-bold uppercase tracking-wider text-kiln-cream shadow-artisan transition hover:bg-kiln-navy-light"
        >
          Place Secure Order — {formatCurrency(grandTotal)}
        </button>
      </form>

      <OrderSuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        customer={customer}
        lines={lines.map((l) => ({
          name: TILE_BY_ID[l.tileId].name,
          quantity: l.quantity,
          total: l.quantity * TILE_BY_ID[l.tileId].unitPrice,
        }))}
      />

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
