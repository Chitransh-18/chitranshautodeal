import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { TireLogo } from "./TireLogo";

const links = [
  { href: "#home", label: "Home" },
  { href: "#inventory", label: "Inventory" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <TireLogo size={34} />
          <div className="leading-tight">
            <div className="font-display text-sm font-bold tracking-tight sm:text-base">
              CHITRANSH
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary sm:text-xs">
              Auto Deal
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-gradient-red px-5 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Get a Quote
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-border md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-red px-5 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
