"use client";

import Image from "next/image";
import { cartRadius } from "@/components/cart/cartTableLayout";

type CartActionVariant = "add" | "remove";

const config: Record<
  CartActionVariant,
  { icon: string; label: string; border: string; bg: string }
> = {
  add: {
    icon: "/assets/icons/add.svg",
    label: "Add",
    border: "border-kiln-sage",
    bg: "bg-[#e8efe4]",
  },
  remove: {
    icon: "/assets/icons/remove.svg",
    label: "Remove",
    border: "border-kiln-terracotta",
    bg: "bg-[#f0e4dc]",
  },
};

interface CartActionButtonProps {
  variant: CartActionVariant;
  onClick: () => void;
  ariaLabel: string;
}

export function CartActionButton({
  variant,
  onClick,
  ariaLabel,
}: CartActionButtonProps) {
  const { icon, label, border, bg } = config[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-w-[1.9rem] flex-col items-center gap-0.5 transition hover:opacity-90 sm:min-w-[2.9rem] sm:gap-0"
      aria-label={ariaLabel}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center ${cartRadius} border-2 border-solid ${border} ${bg}`}
        aria-hidden
      >
        <Image src={icon} alt="" width={20} height={20} className="h-5 w-5" />
      </span>
      <span className="text-base font-bold uppercase leading-none tracking-tight text-kiln-navy">
        {label}
      </span>
    </button>
  );
}
