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

export const CARS: Car[] = [
  {
    id: "1",
    name: "Hyundai Creta SX",
    brand: "Hyundai",
    model: "Creta SX (O)",
    year: 2022,
    price: 1495000,
    odometer: 28400,
    fuel: "Diesel",
    transmission: "Automatic",
    insurance: true,
    available: true,
    ownerType: "1st Owner",
    registration: "MP-04, Bhopal",
    description:
      "Top-end Creta SX (O) automatic in pristine showroom condition. Single owner, full service history, all original paint.",
    features: ["Sunroof", "Ventilated Seats", "360° Camera", "Wireless CarPlay", "6 Airbags", "Cruise Control"],
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "2",
    name: "BMW 3 Series 330i",
    brand: "BMW",
    model: "330i M Sport",
    year: 2021,
    price: 3895000,
    odometer: 34200,
    fuel: "Petrol",
    transmission: "Automatic",
    insurance: true,
    available: true,
    ownerType: "1st Owner",
    registration: "MP-09, Indore",
    description:
      "Iconic 330i M Sport in Alpine White. Meticulously maintained, BMW service records available, accident-free.",
    features: ["M Sport Package", "Harman Kardon", "HUD", "Adaptive Cruise", "Park Assist", "LED Laser Lights"],
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "3",
    name: "Maruti Swift VXi",
    brand: "Maruti Suzuki",
    model: "Swift VXi",
    year: 2020,
    price: 595000,
    odometer: 41200,
    fuel: "Petrol",
    transmission: "Manual",
    insurance: true,
    available: true,
    ownerType: "1st Owner",
    registration: "MP-04, Bhopal",
    description:
      "Fuel-efficient daily driver. Perfectly maintained, all four tires recently replaced, fresh service done.",
    features: ["Touchscreen", "Reverse Camera", "Dual Airbags", "ABS+EBD", "Steering Controls"],
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "4",
    name: "Mahindra Thar LX",
    brand: "Mahindra",
    model: "Thar LX 4x4",
    year: 2023,
    price: 1685000,
    odometer: 12500,
    fuel: "Diesel",
    transmission: "Manual",
    insurance: true,
    available: true,
    ownerType: "1st Owner",
    registration: "MP-09, Indore",
    description:
      "Hard-top Thar LX 4x4 diesel manual. Almost new, all accessories included, factory warranty active.",
    features: ["4x4 Drive", "Cruise Control", "Touchscreen", "6 Airbags", "Roof Mounted Speakers"],
    images: [
      "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "5",
    name: "Tata Nexon EV Max",
    brand: "Tata",
    model: "Nexon EV Max XZ+",
    year: 2023,
    price: 1395000,
    odometer: 18900,
    fuel: "Electric",
    transmission: "Automatic",
    insurance: true,
    available: false,
    ownerType: "1st Owner",
    registration: "MP-04, Bhopal",
    description:
      "Long-range Nexon EV Max with 437km certified range. Home charger included, battery health 98%.",
    features: ["Sunroof", "Ventilated Seats", "ESP", "Hill Hold", "Wireless Charging", "Air Purifier"],
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "6",
    name: "Mercedes-Benz GLC 220d",
    brand: "Mercedes-Benz",
    model: "GLC 220d 4MATIC",
    year: 2020,
    price: 4250000,
    odometer: 46800,
    fuel: "Diesel",
    transmission: "Automatic",
    insurance: true,
    available: true,
    ownerType: "2nd Owner",
    registration: "MP-09, Indore",
    description:
      "Flagship GLC 220d 4MATIC in Obsidian Black. Burmester sound, panoramic roof, full Mercedes service history.",
    features: ["Panoramic Sunroof", "Burmester Audio", "4MATIC AWD", "Memory Seats", "Ambient Lighting", "HUD"],
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1400&q=80",
    ],
  },
];

export const formatPrice = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

export const formatKm = (n: number) => `${n.toLocaleString("en-IN")} km`;
