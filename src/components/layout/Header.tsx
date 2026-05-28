"use client";

import { HeaderActions } from "@/components/layout/HeaderActions";
import { pageContainerClass } from "@/components/layout/PageFrame";

const NAV_DESKTOP = [
  "Home",
  "Shop",
  "Collections",
  "About Us",
  "FAQ",
  "Gallery",
  "Blog",
];

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-kiln-dot-brown" />
      <span className="h-2.5 w-2.5 rounded-full bg-kiln-dot-gold" />
      <span className="h-2.5 w-2.5 rounded-full bg-kiln-dot-olive" />
    </div>
  );
}

function BurgerIcon() {
  return (
    <span className="flex flex-col gap-[4px]" aria-hidden>
      <span className="block h-[2px] w-6 rounded-full bg-kiln-ink" />
      <span className="block h-[2px] w-6 rounded-full bg-kiln-ink" />
      <span className="block h-[2px] w-6 rounded-full bg-kiln-ink" />
    </span>
  );
}

const navLinkClass =
  "text-base font-black uppercase leading-none tracking-[0.1em] text-kiln-ink hover:text-kiln-terracotta";

export function Header() {
  return (
    <header className="w-full bg-kiln-cream border-b-[3px] border-kiln-ink">
      <div className={pageContainerClass}>
        <div className="relative flex h-10 items-center">
          <div className="z-10 flex h-full shrink-0 items-center pl-0.5">
            <WindowDots />
          </div>

          <nav
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-label="Main"
          >
            <button
              type="button"
              className="pointer-events-auto flex h-full items-center text-kiln-ink lg:hidden"
              aria-label="Open menu"
            >
              <BurgerIcon />
            </button>
            <ul className="pointer-events-auto hidden h-full items-center gap-x-5 lg:flex">
              {NAV_DESKTOP.map((item) => (
                <li key={item} className="flex h-full items-center">
                  <a href="#" className={navLinkClass}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="z-10 ml-auto flex h-full shrink-0 items-center pr-0.5">
            <HeaderActions />
          </div>
        </div>
      </div>
    </header>
  );
}
