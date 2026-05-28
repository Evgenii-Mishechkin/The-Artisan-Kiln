export function Footer() {
  const links = [
    "Terms of Service",
    "Privacy Policy",
    "Returns",
    "Contact",
    "Help Center",
  ];

  return (
    <footer className="mt-10 border-t-2 border-kiln-navy/10 pt-6">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-wide text-kiln-navy/55 sm:text-xs">
        {links.map((link) => (
          <a key={link} href="#" className="hover:text-kiln-navy">
            {link}
          </a>
        ))}
      </div>
      <p className="mt-4 text-center text-[10px] uppercase tracking-wider text-kiln-navy/45">
        © {new Date().getFullYear()} The Artisan Kiln. All rights reserved.
      </p>
    </footer>
  );
}
