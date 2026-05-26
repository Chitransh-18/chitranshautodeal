import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X, MapPin, MessageCircle, Instagram, ShieldCheck, ShieldOff, Check } from "lucide-react";
import type { Car } from "@/lib/cars";
import { formatKm, formatPrice } from "@/lib/cars";

const WHATSAPP = "919999999999"; // placeholder
const INSTAGRAM = "https://instagram.com/chitranshautodeal";
const MAPS = "https://maps.google.com/?q=Chitransh+Auto+Deal+Bhopal";

export function CarDetailModal({ car, onClose }: { car: Car | null; onClose: () => void }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [car]);

  useEffect(() => {
    if (!car) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [car, onClose]);

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-t-3xl bg-card shadow-card sm:rounded-3xl"
          >
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-foreground transition-colors hover:bg-background"
            >
              <X size={18} />
            </button>

            <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-2">
              {/* Gallery */}
              <div className="bg-black p-4">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
                  <img
                    src={car.images[active]}
                    alt={car.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                        active === i ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-5 p-5 sm:p-7">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-primary">{car.brand}</div>
                  <h3 className="mt-1 font-display text-3xl font-bold">{car.name}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="rounded-lg bg-gradient-red px-4 py-1.5 text-lg font-bold text-primary-foreground shadow-glow">
                      {formatPrice(car.price)}
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        car.available
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {car.available ? "Available" : "Sold"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs ${
                        car.insurance ? "text-emerald-400" : "text-muted-foreground"
                      }`}
                    >
                      {car.insurance ? <ShieldCheck size={14} /> : <ShieldOff size={14} />}
                      Insurance {car.insurance ? "Active" : "Expired"}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{car.description}</p>

                <div className="grid grid-cols-2 gap-x-5 gap-y-3 rounded-xl border border-border bg-surface p-4 text-sm">
                  <Detail label="Year" value={String(car.year)} />
                  <Detail label="Odometer" value={formatKm(car.odometer)} />
                  <Detail label="Fuel" value={car.fuel} />
                  <Detail label="Transmission" value={car.transmission} />
                  <Detail label="Owner" value={car.ownerType} />
                  <Detail label="Registration" value={car.registration} />
                </div>

                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Features
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs"
                      >
                        <Check size={12} className="text-primary" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=Hi, I'm interested in the ${car.name} (${car.year})`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-red px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold transition-colors hover:bg-background"
                  >
                    <Instagram size={16} /> Instagram
                  </a>
                  <a
                    href={MAPS}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold transition-colors hover:bg-background"
                  >
                    <MapPin size={16} /> Visit Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-medium">{value}</div>
    </div>
  );
}
