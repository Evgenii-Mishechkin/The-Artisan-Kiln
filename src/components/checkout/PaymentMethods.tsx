"use client";

import Image from "next/image";
import type { CardForm, PaymentMethod } from "@/types";

const PRIMARY_METHODS: {
  id: Extract<PaymentMethod, "credit_card" | "paypal">;
  label: string;
  icon?: string;
  iconOnly?: boolean;
}[] = [
  {
    id: "credit_card",
    label: "Credit / Debit Card",
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: "/assets/icons/payment-paypal.svg",
    iconOnly: true,
  },
];

const CARD_BRAND_BOX_CLASS = "h-7 w-12 px-1.5 py-0.5";
const CARD_BRAND_IMG_CLASS = "h-4 w-full max-h-4 object-contain";

const CARD_BRANDS = [
  { src: "/assets/icons/payment-visa.svg", alt: "Visa" },
  { src: "/assets/icons/payment-mastercard.svg", alt: "Mastercard" },
] as const;

const GRID_METHODS: {
  id: Extract<PaymentMethod, "apple_pay" | "bank_transfer">;
  label: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  imgClass: string;
}[] = [
  {
    id: "apple_pay",
    label: "Apple Pay",
    icon: "/assets/icons/payment-apple.svg",
    iconWidth: 56,
    iconHeight: 24,
    imgClass: "h-5 w-auto max-w-[72px]",
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    icon: "/assets/icons/payment-bank.svg",
    iconWidth: 36,
    iconHeight: 36,
    imgClass: "h-7 w-7",
  },
];

interface PaymentMethodsProps {
  method: PaymentMethod;
  onChange: (m: PaymentMethod) => void;
  card: CardForm;
  onCardChange: (c: CardForm) => void;
  errors: Record<string, string>;
}

const radioClass =
  "h-4 w-4 shrink-0 cursor-pointer accent-kiln-ink";

const optionLabelClass =
  "text-base font-bold uppercase tracking-wide leading-tight text-kiln-navy";

const fieldLabelClass =
  "mb-1 block text-[10px] font-bold uppercase leading-none text-kiln-ink";

function paymentInputClass(field: string, errors: Record<string, string>) {
  return `w-full rounded-[5px] border border-kiln-ink bg-kiln-page px-2 py-1 text-sm leading-tight text-kiln-ink outline-none placeholder:font-bold placeholder:uppercase placeholder:text-kiln-ink/35 ${
    errors[field] ? "border-red-500" : ""
  }`;
}

function BrandLogoBox({
  src,
  alt,
  width,
  height,
  boxClassName = "",
  imgClass,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  boxClassName?: string;
  imgClass: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-kiln-ink bg-kiln-page px-1 py-0.5 ${boxClassName}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`object-contain ${imgClass}`}
      />
    </span>
  );
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

  return (
    <div className="space-y-2">
      <h2 className="inline-flex w-fit items-center rounded-[5px] border-2 border-kiln-ink bg-kiln-cream px-2.5 py-1 text-sm font-bold uppercase leading-none tracking-wide text-kiln-ink">
        Select Payment Method:
      </h2>

      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {PRIMARY_METHODS.map((m) => (
          <label
            key={m.id}
            className="flex min-w-0 cursor-pointer items-center gap-2"
            aria-label={m.iconOnly ? m.label : undefined}
          >
            <input
              type="radio"
              name="payment"
              checked={method === m.id}
              onChange={() => onChange(m.id)}
              className={radioClass}
            />
            {m.icon && m.iconOnly ? (
              <span className="flex min-w-0 flex-1 items-center overflow-hidden">
                <Image
                  src={m.icon}
                  alt={m.label}
                  width={124}
                  height={33}
                  className="h-6 w-auto max-w-full object-contain object-left"
                />
              </span>
            ) : (
              <span className={`min-w-0 leading-tight ${optionLabelClass}`}>
                {m.label}
              </span>
            )}
          </label>
        ))}
      </div>

      {method === "credit_card" && (
        <div className="space-y-2 rounded-[5px] border-2 border-kiln-ink bg-kiln-cream-dark p-2.5">
          <div className="flex items-center gap-2">
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-kiln-ink bg-kiln-ink"
              aria-hidden
            >
              <span className="h-1.5 w-1.5 rounded-full bg-kiln-page" />
            </span>
            <div className="flex items-center gap-1.5">
              {CARD_BRANDS.map((brand) => (
                <BrandLogoBox
                  key={brand.alt}
                  src={brand.src}
                  alt={brand.alt}
                  width={48}
                  height={32}
                  boxClassName={CARD_BRAND_BOX_CLASS}
                  imgClass={CARD_BRAND_IMG_CLASS}
                />
              ))}
            </div>
          </div>

          <label className="block">
            <span className={fieldLabelClass}>Card Number</span>
            <input
              className={paymentInputClass("number", errors)}
              placeholder="1234 4556 7723 8990"
              value={card.number}
              onChange={(e) =>
                setCard("number")(formatCardNumber(e.target.value))
              }
            />
            {errors.number && (
              <span className="mt-1 block text-xs text-red-600">
                {errors.number}
              </span>
            )}
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="block min-w-0">
              <input
                className={paymentInputClass("expiry", errors)}
                placeholder="Expiration /"
                aria-label="Expiration"
                value={card.expiry}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                  if (v.length >= 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                  setCard("expiry")(v);
                }}
              />
              {errors.expiry && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.expiry}
                </span>
              )}
            </label>
            <label className="block min-w-0">
              <input
                className={paymentInputClass("cvv", errors)}
                placeholder="CVV"
                value={card.cvv}
                maxLength={4}
                onChange={(e) =>
                  setCard("cvv")(
                    e.target.value.replace(/\D/g, "").slice(0, 4),
                  )
                }
              />
              {errors.cvv && (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.cvv}
                </span>
              )}
            </label>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {GRID_METHODS.map((m) => (
          <label
            key={m.id}
            className="flex min-h-[76px] cursor-pointer flex-col rounded-[5px] border-2 border-kiln-ink bg-kiln-page p-2"
          >
            <input
              type="radio"
              name="payment"
              checked={method === m.id}
              onChange={() => onChange(m.id)}
              className={`${radioClass} self-start`}
            />
            <span className="flex flex-1 flex-col items-center justify-center py-0.5">
              <Image
                src={m.icon}
                alt=""
                width={m.iconWidth}
                height={m.iconHeight}
                className={`object-contain ${m.imgClass}`}
              />
            </span>
            <span className={`text-center ${optionLabelClass}`}>{m.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
