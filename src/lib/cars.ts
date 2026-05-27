export type Car = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  odometer: number;
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  insurance: boolean;
  available: boolean;
  ownerType: string;
  registration: string;
  description: string;
  features: string[];
  images: string[];
};

export const formatPrice = (n: number) => {
  if (!n || n <= 0) return "Price on request";
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

export const formatKm = (n: number) => {
  if (!n || n <= 0) return "KM on request";
  return `${n.toLocaleString("en-IN")} km`;
};
