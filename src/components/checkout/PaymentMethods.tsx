"use client";

import Image from "next/image";
import type { CardForm, PaymentMethod } from "@/types";

const METHODS: {
  id: PaymentMethod;
  label: string;
  icon: string;
}[] = [
  { id: "credit_card", label: "Credit / Debit Card", icon: "/assets/icons/payment-card.svg" },
  { id: "paypal", label: "PayPal", icon: "/assets/icons/payment-paypal.svg" },
  { id: "apple_pay", label: "Apple Pay", icon: "/assets/icons/payment-apple.svg" },
  { id: "bank_transfer", label: "Bank Transfer", icon: "/assets/icons/payment-bank.svg" },
];

interface PaymentMethodsProps {
  method: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
  card: CardForm;
  onCardChange: (c: CardForm) => void;
  errors: Record<string, string>;
}

export function PaymentMethods({
  method,
  onChange,
  card,
  onCardChange,
  errors,
}: PaymentMethodsProps) {
  const setCard = (key: keyof CardForm) => (value: string) =>
    onCardChange({ ...card, [key]: value });

  const formatCardNumber = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const inputClass = (field: string) =>
    `w-full rounded-sm border border-kiln-navy/30 bg-kiln-paper px-3 py-2 text-sm shadow-inner-bracket ${errors[field] ? "border-red-500" : ""}`;

  return (
    <div>
      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-kiln-navy">
        Select Payment Method
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {METHODS.map((m) => (
          <label
            key={m.id}
            className={`flex cursor-pointer items-center gap-3 rounded-sm border-2 p-3 transition ${
              method === m.id
                ? "border-kiln-terracotta bg-kiln-cream shadow-sm"
                : "border-kiln-navy/15 bg-kiln-paper hover:border-kiln-navy/30"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={method === m.id}
              onChange={() => onChange(m.id)}
              className="accent-kiln-terracotta"
            />
            <Image src={m.icon} alt="" width={28} height={20} />
            <span className="text-[10px] font-bold uppercase leading-tight text-kiln-navy sm:text-xs">
              {m.label}
            </span>
          </label>
        ))}
      </div>

      {method === "credit_card" && (
        <div className="mt-4 space-y-3 rounded-sm border border-kiln-navy/15 bg-kiln-cream/40 p-4">
          <div className="flex items-center justify-end gap-2 text-[10px] font-bold uppercase text-kiln-navy/50">
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
          </div>
          <label className="block">
            <span className="text-[10px] font-bold uppercase text-kiln-navy/70">
              Card Number
            </span>
            <input
              className={inputClass("number")}
              placeholder="4111 1111 1111 1111"
              value={card.number}
              onChange={(e) => setCard("number")(formatCardNumber(e.target.value))}
            />
            {errors.number && (
              <span className="text-xs text-red-600">{errors.number}</span>
            )}
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className="text-[10px] font-bold uppercase text-kiln-navy/70">
                Expiration
              </span>
              <input
                className={inputClass("expiry")}
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                  if (v.length >= 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                  setCard("expiry")(v);
                }}
              />
              {errors.expiry && (
                <span className="text-xs text-red-600">{errors.expiry}</span>
              )}
            </label>
            <label>
              <span className="text-[10px] font-bold uppercase text-kiln-navy/70">
                CVV
              </span>
              <input
                className={inputClass("cvv")}
                placeholder="123"
                value={card.cvv}
                maxLength={4}
                onChange={(e) =>
                  setCard("cvv")(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
              />
              {errors.cvv && (
                <span className="text-xs text-red-600">{errors.cvv}</span>
              )}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
