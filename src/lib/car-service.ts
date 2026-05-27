import type { User } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured, storageBucket } from "./supabase";
import type { Car } from "./cars";

type CarStatus = "available" | "sold";

export type CarImageRow = {
  id: string;
  car_id: string;
  image_url: string;
  is_primary: boolean;
  created_at: string;
};

export type CarRow = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  odometer: number;
  fuel_type: Car["fuel"];
  transmission: Car["transmission"];
  insurance_active: boolean;
  owner_type: string;
  registration_number: string;
  description: string;
  features: string[];
  status: CarStatus;
  created_at: string;
  car_images?: CarImageRow[];
};

export type CarInput = {
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  odometer: number;
  fuel_type: Car["fuel"];
  transmission: Car["transmission"];
  insurance_active: boolean;
  owner_type: string;
  registration_number: string;
  description: string;
  features: string[];
  status: CarStatus;
};

function requireConfig() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env and add your project keys.",
    );
  }
}

function sortImages(images: CarImageRow[] = []) {
  return [...images].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
}

export function mapCar(row: CarRow): Car {
  const images = sortImages(row.car_images).map((image) => image.image_url);

  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    model: row.model,
    year: row.year,
    price: row.price,
    odometer: row.odometer,
    fuel: row.fuel_type,
    transmission: row.transmission,
    insurance: row.insurance_active,
    available: row.status === "available",
    ownerType: row.owner_type,
    registration: row.registration_number,
    description: row.description,
    features: row.features ?? [],
    images,
  };
}

export async function fetchCars() {
  requireConfig();

  const { data, error } = await getSupabase()
    .from("cars")
    .select("*, car_images(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return ((data ?? []) as CarRow[]).map(mapCar);
}

export async function fetchCarById(id: string) {
  requireConfig();

  const { data, error } = await getSupabase()
    .from("cars")
    .select("*, car_images(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return mapCar(data as CarRow);
}

export async function getCurrentUser(): Promise<User | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await getSupabase().auth.getUser();
  if (error) return null;
  return data.user;
}

export async function signInAdmin(email: string, password: string) {
  requireConfig();

  const { data, error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

export async function signOutAdmin() {
  requireConfig();

  const { error } = await getSupabase().auth.signOut();
  if (error) throw error;
}

export async function createCar(input: CarInput, files: File[]) {
  requireConfig();

  const { data, error } = await getSupabase().from("cars").insert(input).select().single();
  if (error) throw error;

  if (files.length > 0) {
    await uploadCarImages(data.id, files);
  }

  return data as CarRow;
}

export async function updateCar(id: string, input: CarInput, files: File[]) {
  requireConfig();

  const { data, error } = await getSupabase()
    .from("cars")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  if (files.length > 0) {
    await uploadCarImages(id, files);
  }

  return data as CarRow;
}

export async function updateCarStatus(id: string, status: CarStatus) {
  requireConfig();

  const { error } = await getSupabase().from("cars").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteCar(id: string) {
  requireConfig();

  const { error } = await getSupabase().from("cars").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadCarImages(carId: string, files: File[]) {
  requireConfig();

  const supabase = getSupabase();
  const rows: Omit<CarImageRow, "id" | "created_at">[] = [];

  for (const [index, file] of files.entries()) {
    const extension = file.name.split(".").pop() ?? "jpg";
    const path = `${carId}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from(storageBucket).upload(path, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(storageBucket).getPublicUrl(path);
    rows.push({
      car_id: carId,
      image_url: data.publicUrl,
      is_primary: index === 0,
    });
  }

  const { error } = await supabase.from("car_images").insert(rows);
  if (error) throw error;
}
