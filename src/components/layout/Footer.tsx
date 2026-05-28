import { Fragment } from "react";

const FOOTER_LINKS = [
  "Terms of Service",
  "Privacy Policy",
  "Shipping Info",
  "Contact Us",
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 pb-8 pt-8 text-center">
      <nav
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-bold uppercase leading-tight tracking-wide text-kiln-ink"
        aria-label="Footer"
      >
        {FOOTER_LINKS.map((label, index) => (
          <Fragment key={label}>
            {index > 0 && (
              <span className="text-kiln-ink" aria-hidden>
                |
              </span>
            )}
            <a href="#" className="hover:opacity-80">
              {label}
            </a>
          </Fragment>
        ))}
      </nav>
      <p className="mt-3 text-sm font-bold uppercase leading-tight tracking-wide text-kiln-ink">
        © {year} The Artisan Kiln. All rights reserved.
      </p>
    </footer>
  );
}
