import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import { fetchCars } from "@/lib/car-service";
import { CarCard } from "./CarCard";
import { CarDetailModal } from "./CarDetailModal";

const FUELS = ["All", "Petrol", "Diesel", "CNG", "Electric", "Hybrid"] as const;
const AVAILS = ["All", "Available", "Sold"] as const;
const PRICES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under ₹10 L", min: 0, max: 1000000 },
  { label: "₹10 L – ₹20 L", min: 1000000, max: 2000000 },
  { label: "₹20 L – ₹40 L", min: 2000000, max: 4000000 },
  { label: "Above ₹40 L", min: 4000000, max: Infinity },
];

export function Inventory() {
  const [q, setQ] = useState("");
  const [fuel, setFuel] = useState<(typeof FUELS)[number]>("All");
  const [avail, setAvail] = useState<(typeof AVAILS)[number]>("All");
  const [priceIdx, setPriceIdx] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    data: cars = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
    retry: false,
  });

  const filtered = useMemo(() => {
    const p = PRICES[priceIdx];
    return cars.filter((c) => {
      if (q && !`${c.name} ${c.brand} ${c.model}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (fuel !== "All" && c.fuel !== fuel) return false;
      if (avail === "Available" && !c.available) return false;
      if (avail === "Sold" && c.available) return false;
      if (priceIdx !== 0 && c.price <= 0) return false;
      if (c.price < p.min || c.price > p.max) return false;
      return true;
    });
  }, [q, fuel, avail, priceIdx, cars]);

  return (
    <section id="inventory" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Inventory</div>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Curated <span className="text-gradient-red">pre-owned</span> cars
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Every car in our collection passes a rigorous 200-point inspection. Browse, compare,
              and book a test drive in minutes.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{filtered.length}</span> / {cars.length}{" "}
            cars
          </div>
        </div>

        {/* Filters */}
        <div className="premium-ring mt-10 rounded-3xl border border-border bg-surface-elevated/80 p-4 shadow-card sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <label className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 transition-colors focus-within:border-foreground">
              <Search size={18} className="text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by car name, brand or model..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
            <FilterSelect
              icon={<SlidersHorizontal size={16} />}
              value={fuel}
              onChange={(v) => setFuel(v as typeof fuel)}
              options={FUELS as readonly string[]}
              label="Fuel"
            />
            <FilterSelect
              value={PRICES[priceIdx].label}
              onChange={(v) => setPriceIdx(PRICES.findIndex((p) => p.label === v))}
              options={PRICES.map((p) => p.label)}
              label="Price"
            />
            <FilterSelect
              value={avail}
              onChange={(v) => setAvail(v as typeof avail)}
              options={AVAILS as readonly string[]}
              label="Status"
            />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="mt-16 rounded-3xl border border-border bg-surface/50 p-12 text-center">
            <div className="text-lg font-semibold">Loading inventory</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Fetching latest cars from Supabase.
            </p>
          </div>
        ) : error ? (
          <div className="mt-16 rounded-3xl border border-dashed border-border bg-surface/50 p-12 text-center">
            <div className="text-lg font-semibold">Inventory is not connected yet</div>
            <p className="mt-2 text-sm text-muted-foreground">{(error as Error).message}</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CarCard key={c.id} car={c} onSelect={(car) => setSelectedId(car.id)} />
            ))}
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="mt-16 rounded-3xl border border-dashed border-border bg-surface/50 p-12 text-center">
            <div className="text-lg font-semibold">No cars match your filters</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting the search or clearing some filters.
            </p>
          </div>
        )}
      </div>

      <CarDetailModal carId={selectedId} onClose={() => setSelectedId(null)} />
    </section>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  label,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 transition-colors focus-within:border-foreground">
      {icon ?? (
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-background text-foreground">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
