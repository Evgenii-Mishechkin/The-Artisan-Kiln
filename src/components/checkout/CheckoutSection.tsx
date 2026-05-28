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
  notes: "",
};

const emptyCard: CardForm = {
  number: "",
  expiry: "",
  cvv: "",
};

const fieldLabelClass =
  "shrink-0 text-sm font-bold uppercase leading-none tracking-wide text-kiln-ink";

function fieldInputClass(field: string, hasError: boolean) {
  return `min-w-0 flex-1 border-0 border-b-2 bg-transparent p-0 text-base leading-none text-kiln-ink outline-none focus:border-kiln-ink ${
    hasError ? "border-red-500" : "border-kiln-ink"
  }`;
}

function FormRow({
  label,
  field,
  error,
  compact = false,
  className = "",
  children,
}: {
  label: string;
  field: string;
  error?: string;
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <div
        className={`flex items-end ${compact ? "gap-1.5" : "gap-2"}`}
      >
        <span className={fieldLabelClass}>{label}:</span>
        {children}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600" id={`${field}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

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

  const inputProps = (field: keyof CustomerForm) => ({
    className: fieldInputClass(field, Boolean(errors[field])),
    value: customer[field],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setField(field)(e.target.value),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div>
          <div className="mb-4 flex w-full items-stretch bg-kiln-cream">
            <div className="flex w-fit items-center overflow-hidden rounded-tl-[5px] rounded-tr-[5px] border-[2px] border-b-0 border-kiln-ink bg-kiln-cream px-3 py-[6px]">
              <h2 className="text-[2rem] font-black uppercase leading-none text-kiln-ink">
                Order Summary
              </h2>
            </div>
            <div
              className="flex-1 self-stretch border-b-[2px] border-kiln-ink bg-kiln-cream"
              aria-hidden
            />
          </div>

          <div className="min-w-0 space-y-[5px] border-b-2 border-kiln-ink pb-[25px]">
            <FormRow label="Customer Name" field="name" error={errors.name}>
              <input type="text" {...inputProps("name")} />
            </FormRow>

            <div className="grid min-w-0 grid-cols-2 gap-x-2">
              <FormRow
                label="Phone"
                field="phone"
                error={errors.phone}
                compact
              >
                <input type="tel" {...inputProps("phone")} />
              </FormRow>
              <FormRow
                label="Email"
                field="email"
                error={errors.email}
                compact
              >
                <input type="email" {...inputProps("email")} />
              </FormRow>
            </div>

            <FormRow
              label="Shipping Address"
              field="address"
              error={errors.address}
            >
              <input type="text" {...inputProps("address")} />
            </FormRow>

            <FormRow label="Project Notes" field="notes" error={errors.notes}>
              <textarea
                rows={1}
                {...inputProps("notes")}
                className={`${fieldInputClass("notes", Boolean(errors.notes))} resize-y overflow-hidden`}
              />
            </FormRow>
          </div>
        </div>

        <OrderSummary
          plainCells
          className="hidden w-fit self-end lg:block"
        />

        <PaymentMethods
          method={paymentMethod}
          onChange={setPaymentMethod}
          card={card}
          onCardChange={setCard}
          errors={errors}
        />

        <button
          type="submit"
          className="w-full rounded-[5px] border-2 border-kiln-ink bg-kiln-slate px-4 py-2 text-lg font-bold uppercase leading-none tracking-wide text-white transition hover:opacity-90"
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
