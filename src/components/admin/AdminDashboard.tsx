import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCar,
  deleteCar,
  fetchCars,
  getCurrentUser,
  signInAdmin,
  signOutAdmin,
  updateCar,
  updateCarStatus,
  type CarInput,
} from "@/lib/car-service";
import { formatKm, formatPrice, type Car } from "@/lib/cars";
import { isSupabaseConfigured } from "@/lib/supabase";

const emptyForm = {
  name: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  odometer: 0,
  fuel_type: "Petrol" as CarInput["fuel_type"],
  transmission: "Manual" as CarInput["transmission"],
  insurance_active: true,
  owner_type: "1st Owner",
  registration_number: "",
  description: "",
  features: "",
  status: "available" as CarInput["status"],
};

type FormState = typeof emptyForm;

function carToForm(car: Car): FormState {
  return {
    name: car.name,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    odometer: car.odometer,
    fuel_type: car.fuel,
    transmission: car.transmission,
    insurance_active: car.insurance,
    owner_type: car.ownerType,
    registration_number: car.registration,
    description: car.description,
    features: car.features.join(", "),
    status: car.available ? "available" : "sold",
  };
}

function toCarInput(form: FormState): CarInput {
  return {
    ...form,
    year: Number(form.year),
    price: Number(form.price),
    odometer: Number(form.odometer),
    features: form.features
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean),
  };
}

export function AdminDashboard() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  const userQuery = useQuery({
    queryKey: ["admin-user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const carsQuery = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
    enabled: Boolean(userQuery.data),
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: () => signInAdmin(email, password),
    onSuccess: () => {
      setPassword("");
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["admin-user"] });
    },
    onError: (error) => setMessage((error as Error).message),
  });

  const saveMutation = useMutation({
    mutationFn: () =>
      editingId
        ? updateCar(editingId, toCarInput(form), files)
        : createCar(toCarInput(form), files),
    onSuccess: () => {
      setForm(emptyForm);
      setEditingId(null);
      setFiles([]);
      setMessage("Car listing saved.");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (error) => setMessage((error as Error).message),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CarInput["status"] }) =>
      updateCarStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }),
    onError: (error) => setMessage((error as Error).message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      setMessage("Car listing deleted.");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (error) => setMessage((error as Error).message),
  });

  const handleSave = (event: FormEvent) => {
    event.preventDefault();
    saveMutation.mutate();
  };

  const handleLogout = async () => {
    await signOutAdmin();
    queryClient.setQueryData(["admin-user"], null);
  };

  if (!isSupabaseConfigured) {
    return (
      <AdminShell>
        <Panel title="Supabase is not configured">
          <p className="text-sm text-muted-foreground">
            Copy `.env.example` to `.env`, add your Supabase URL and anon key, then restart the dev
            server.
          </p>
        </Panel>
      </AdminShell>
    );
  }

  if (!userQuery.data) {
    return (
      <AdminShell>
        <Panel title="Admin Login">
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              loginMutation.mutate();
            }}
          >
            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="admin-input"
                required
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="admin-input"
                required
              />
            </Field>
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="rounded-full bg-gradient-red px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </Panel>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Protected Admin
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold">Manage Inventory</h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold"
        >
          Sign Out
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <Panel title={editingId ? "Edit Car" : "Add New Car"}>
          <form className="space-y-4" onSubmit={handleSave}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input className="admin-input" value={form.name} onChange={bind("name")} required />
              </Field>
              <Field label="Brand">
                <input
                  className="admin-input"
                  value={form.brand}
                  onChange={bind("brand")}
                  required
                />
              </Field>
              <Field label="Model">
                <input
                  className="admin-input"
                  value={form.model}
                  onChange={bind("model")}
                  required
                />
              </Field>
              <Field label="Year">
                <input
                  className="admin-input"
                  type="number"
                  value={form.year}
                  onChange={bind("year")}
                  required
                />
              </Field>
              <Field label="Price">
                <input
                  className="admin-input"
                  type="number"
                  value={form.price}
                  onChange={bind("price")}
                  required
                />
              </Field>
              <Field label="Odometer">
                <input
                  className="admin-input"
                  type="number"
                  value={form.odometer}
                  onChange={bind("odometer")}
                  required
                />
              </Field>
              <Field label="Fuel">
                <select className="admin-input" value={form.fuel_type} onChange={bind("fuel_type")}>
                  {["Petrol", "Diesel", "CNG", "Electric", "Hybrid"].map((fuel) => (
                    <option key={fuel}>{fuel}</option>
                  ))}
                </select>
              </Field>
              <Field label="Transmission">
                <select
                  className="admin-input"
                  value={form.transmission}
                  onChange={bind("transmission")}
                >
                  <option>Manual</option>
                  <option>Automatic</option>
                </select>
              </Field>
              <Field label="Owner Type">
                <input
                  className="admin-input"
                  value={form.owner_type}
                  onChange={bind("owner_type")}
                  required
                />
              </Field>
              <Field label="Registration">
                <input
                  className="admin-input"
                  value={form.registration_number}
                  onChange={bind("registration_number")}
                  required
                />
              </Field>
            </div>

            <Field label="Description">
              <textarea
                className="admin-input min-h-24"
                value={form.description}
                onChange={bind("description")}
                required
              />
            </Field>
            <Field label="Features (comma separated)">
              <input className="admin-input" value={form.features} onChange={bind("features")} />
            </Field>
            <Field label="Images">
              <input
                className="admin-input"
                type="file"
                multiple
                accept="image/*"
                onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.insurance_active}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      insurance_active: event.target.checked,
                    }))
                  }
                />
                Insurance active
              </label>
              <Field label="Status">
                <select className="admin-input" value={form.status} onChange={bind("status")}>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </Field>
            </div>

            {message && <p className="text-sm text-muted-foreground">{message}</p>}
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="rounded-full bg-gradient-red px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
              >
                {saveMutation.isPending ? "Saving..." : editingId ? "Update Car" : "Add Car"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                    setFiles([]);
                  }}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </Panel>

        <Panel title="Listings">
          {carsQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading cars...</p>
          ) : carsQuery.error ? (
            <p className="text-sm text-muted-foreground">{(carsQuery.error as Error).message}</p>
          ) : (
            <div className="space-y-3">
              {(carsQuery.data ?? []).map((car) => (
                <div
                  key={car.id}
                  className="rounded-2xl border border-border bg-background p-4 shadow-card"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <div className="font-display text-lg font-bold">{car.name}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {formatPrice(car.price)} · {formatKm(car.odometer)} ·{" "}
                        {car.available ? "Available" : "Sold"}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(car.id);
                          setForm(carToForm(car));
                        }}
                        className="rounded-full border border-border px-4 py-2 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          statusMutation.mutate({
                            id: car.id,
                            status: car.available ? "sold" : "available",
                          })
                        }
                        className="rounded-full border border-border px-4 py-2 text-xs font-semibold"
                      >
                        Mark {car.available ? "Sold" : "Available"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete ${car.name}?`)) {
                            deleteMutation.mutate(car.id);
                          }
                        }}
                        className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </AdminShell>
  );

  function bind(key: keyof FormState) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = ["year", "price", "odometer"].includes(key)
        ? Number(event.target.value)
        : event.target.value;

      setForm((current) => ({ ...current, [key]: value }) as FormState);
    };
  }
}

function AdminShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8">
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="premium-ring rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6">
      <h2 className="mb-5 font-display text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
