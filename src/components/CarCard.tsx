import { motion } from "framer-motion";
import { Fuel, Gauge, Cog, Calendar, ShieldCheck, ShieldOff } from "lucide-react";
import type { Car } from "@/lib/cars";
import { formatKm, formatPrice } from "@/lib/cars";

export function CarCard({ car, onSelect }: { car: Car; onSelect: (c: Car) => void }) {
  return (
    <motion.button
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onClick={() => onSelect(car)}
      className="group premium-ring relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-left shadow-card transition-all hover:-translate-y-1 hover:border-foreground/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {car.images[0] ? (
          <img
            src={car.images[0]}
            alt={car.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image uploaded
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
              car.available
                ? "bg-background/90 text-foreground backdrop-blur"
                : "bg-muted/90 text-muted-foreground backdrop-blur"
            }`}
          >
            {car.available ? "Available" : "Sold"}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/60">{car.brand}</div>
            <div className="font-display text-lg font-bold text-white">{car.name}</div>
          </div>
          <div className="rounded-xl bg-gradient-red px-3 py-1.5 text-sm font-bold text-primary-foreground shadow-glow">
            {formatPrice(car.price)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4">
        <Spec icon={Calendar} label={String(car.year)} />
        <Spec icon={Gauge} label={formatKm(car.odometer)} />
        <Spec icon={Fuel} label={car.fuel} />
        <Spec icon={Cog} label={car.transmission} />
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs">
        <span
          className={`inline-flex items-center gap-1.5 ${
            car.insurance ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {car.insurance ? <ShieldCheck size={14} /> : <ShieldOff size={14} />}
          Insurance {car.insurance ? "Active" : "Expired"}
        </span>
        <span className="font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
          View Details →
        </span>
      </div>
    </motion.button>
  );
}

function Spec({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon size={15} className="text-muted-foreground" />
      <span className="truncate text-foreground">{label}</span>
    </div>
  );
}
