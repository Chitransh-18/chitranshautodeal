import { TireLogo } from "./TireLogo";
import { Instagram, MessageCircle, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <TireLogo size={38} />
            <div className="leading-tight">
              <div className="font-display text-base font-bold">CHITRANSH</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary">
                Auto Deal
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Premium pre-owned cars, hand-picked and inspected. Your trusted dealership in
            Madhya Pradesh since 2012.
          </p>
        </div>

        <div className="text-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explore
          </div>
          <ul className="mt-4 space-y-2">
            <li><a href="#home" className="hover:text-primary">Home</a></li>
            <li><a href="#inventory" className="hover:text-primary">Inventory</a></li>
            <li><a href="#about" className="hover:text-primary">About</a></li>
            <li><a href="#contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Connect
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-border p-2.5 transition-colors hover:border-primary hover:text-primary"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://instagram.com/chitranshautodeal"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-border p-2.5 transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://maps.google.com/?q=Chitransh+Auto+Deal+Bhopal"
              target="_blank"
              rel="noreferrer"
              aria-label="Maps"
              className="rounded-full border border-border p-2.5 transition-colors hover:border-primary hover:text-primary"
            >
              <MapPin size={18} />
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            MP Nagar Zone-1, Bhopal · +91 99999 99999
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border px-5 pt-6 text-center text-xs text-muted-foreground sm:px-8">
        © {new Date().getFullYear()} Chitransh Auto Deal. All rights reserved.
      </div>
    </footer>
  );
}
