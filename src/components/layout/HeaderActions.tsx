"use client";

import Image from "next/image";
import { selectCartLineCount } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";

export function HeaderActions() {
  const cartCount = useAppSelector(selectCartLineCount);

  return (
    <div className="flex h-full items-center">
      <button
        type="button"
        className="relative mr-[15px] flex h-8 w-8 items-center justify-center text-kiln-ink sm:mr-[19px]"
        aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
      >
        <Image
          src="/assets/icons/cart.svg"
          alt=""
          width={25}
          height={25}
          className="h-[25px] w-[25px]"
        />
        {cartCount > 0 && (
          <span
            className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border border-kiln-ink bg-kiln-badge-gold px-0.5 text-[9px] font-bold leading-none text-kiln-ink"
            aria-hidden
          >
            {cartCount}
          </span>
        )}
      </button>

      <div className="flex h-full items-center gap-2">
        <button
          type="button"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-kiln-ink bg-kiln-slate"
          aria-label="User profile"
        >
          <Image
            src="/assets/icons/user-profile.svg"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4"
          />
        </button>

        <button
          type="button"
          className="flex h-7 items-center rounded-[5px] border-2 border-kiln-ink bg-kiln-slate px-3.5 text-xs font-medium leading-none text-kiln-cream transition hover:opacity-90"
        >
          A. Smith
        </button>
      </div>
    </div>
  );
}
