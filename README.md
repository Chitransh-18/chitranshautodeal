# 🚗 Chitransh Auto Deal — Premium Used Car Dealership Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-v1-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/router)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Storage-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers_%26_Pages-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)

**Chitransh Auto Deal** is a full-stack, high-performance web application designed for a premier pre-owned car dealership based in Kota, Rajasthan. Built with modern web technologies including **TanStack Start (SSR)**, **React 19**, **Tailwind CSS v4**, and **Supabase**, the platform provides an intuitive interface for prospective car buyers to explore certified pre-owned vehicles and an **Admin Dashboard** for dealership inventory management.

---

## ✨ Features

### 🛍️ Public Customer Portal
- **⚡ Fast SSR & Preloader**: Dynamic animated splash screen and server-side rendering for optimal load speeds and SEO.
- **🔍 Multi-Faceted Inventory Filtering**: Search vehicles by make/model/year, or filter by:
  - **Brand** (Hyundai, Maruti Suzuki, Honda, Mahindra, Tata, Toyota, etc.)
  - **Fuel Type** (Petrol, Diesel, CNG, Electric, Hybrid)
  - **Transmission** (Manual, Automatic)
  - **Status** (Available, Sold)
  - **Price Range & Mileage**
  - **Owner Type** (1st Owner, 2nd Owner, etc.)
- **📱 Car Detail Modal & Media Gallery**: High-resolution image carousel, detailed spec checklist, odometer reading, insurance status, registration details, and feature tags.
- **💬 Direct WhatsApp & Lead Generation**: Pre-filled WhatsApp message buttons allowing customers to instantly inquire about specific car listings.
- **📍 Location & Contact Hub**: Interactive business hours, contact form, telephone links, and location details in Kota, Rajasthan.

### 🔐 Dealer Admin Portal (`/admin`)
- **🔑 Secure Authentication**: Supabase Auth login for authorized dealership staff.
- **📦 Real-Time Inventory Management**:
  - Add new car listings with detailed specifications.
  - Multi-image drag-and-drop upload directly to **Supabase Storage**.
  - Edit existing vehicle listings and pricing.
  - Toggle vehicle status between `Available` and `Sold`.
  - Delete retired listings and associated media assets.
- **🔄 Smart Fallback Mechanism**: Built-in fallback dataset ensuring smooth development and demo mode when Supabase environment variables are absent.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework & SSR** | [TanStack Start](https://tanstack.com/start) / [React 19](https://react.dev/) |
| **Routing** | [TanStack React Router](https://tanstack.com/router) (File-based routing) |
| **State & Data Fetching** | [TanStack React Query v5](https://tanstack.com/query) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/) |
| **Icons & Toast UI** | [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Backend & DB** | [Supabase](https://supabase.com/) (PostgreSQL + RLS Security) |
| **File Storage** | Supabase Storage (`car-images` public bucket) |
| **Deployment** | [Cloudflare Workers / Pages](https://pages.cloudflare.com/) via `@cloudflare/vite-plugin` |

---

## 📁 Project Structure

```
chitranshautodeal/
├── public/                 # Static assets & favicon
├── I20Images/              # Sample vehicle asset gallery
├── src/
│   ├── assets/             # Brand logos & graphics
│   ├── components/         # UI Components
│   │   ├── admin/          # Admin Dashboard & management portal
│   │   │   └── AdminDashboard.tsx
│   │   ├── ui/             # Radix UI / Shadcn base components
│   │   ├── About.tsx       # About dealership section
│   │   ├── CarCard.tsx     # Vehicle preview card
│   │   ├── CarDetailModal.tsx # Full spec modal & image gallery
│   │   ├── Contact.tsx     # Contact section & inquiry form
│   │   ├── Footer.tsx      # Footer links & copyright
│   │   ├── Hero.tsx        # Hero banner with trust statistics
│   │   ├── Inventory.tsx   # Filterable car catalog
│   │   ├── Navbar.tsx      # Navigation header
│   │   ├── Preloader.tsx   # Animated site loader
│   │   └── TireLogo.tsx    # Custom tire logo SVG asset
│   ├── hooks/              # Custom React hooks (toast, state)
│   ├── lib/                # API services & configuration
│   │   ├── car-service.ts  # Supabase CRUD operations & image uploader
│   │   ├── cars.ts         # Fallback mock inventory dataset
│   │   ├── error-capture.ts# Runtime error logging helper
│   │   ├── error-page.ts   # Fallback error UI template
│   │   ├── supabase.ts     # Supabase client instantiation
│   │   └── utils.ts        # Tailwind class merge helper (`cn`)
│   ├── routes/             # TanStack file-based routes
│   │   ├── __root.tsx      # Root HTML shell & meta configuration
│   │   ├── admin.tsx       # Route for /admin dashboard
│   │   └── index.tsx       # Route for homepage /
│   ├── routeTree.gen.ts    # Auto-generated TanStack router manifest
│   ├── router.tsx          # Router configuration
│   ├── server.ts          # SSR server entrypoint
│   ├── start.ts           # Client entrypoint
│   └── styles.css         # Tailwind v4 import & custom CSS
├── supabase/
│   ├── schema.sql          # PostgreSQL DDL, indices & RLS security policies
│   └── current-inventory-seed.sql # Inventory seed data script
├── .env.example            # Environment variable template
├── components.json         # Component library configuration
├── package.json            # Scripts & dependencies
├── vite.config.ts          # Vite build & TanStack configuration
└── wrangler.jsonc          # Cloudflare Pages deployment configuration
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed on your local environment:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9+), **pnpm**, or **yarn**

### 1️⃣ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Chitransh-18/chitranshautodeal.git
cd chitranshautodeal
npm install
```

### 2️⃣ Environment Configuration

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Configure your Supabase credentials in `.env`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_STORAGE_BUCKET=car-images
```

> **Note**: If `.env` is omitted or credentials are missing, the app automatically switches to read-only fallback mode using mock vehicle data in `src/lib/cars.ts`.

---

## 🗄️ Database Setup (Supabase)

1. Open your project dashboard in [Supabase](https://database.new).
2. Go to the **SQL Editor**.
3. Execute the contents of [`supabase/schema.sql`](file:///c:/Users/chitr/Desktop/chitranshautodeal/supabase/schema.sql) to create:
   - `public.cars` table (with validation constraints for price, year, fuel type, transmission, status)
   - `public.car_images` table (with cascade deletion)
   - Indexes for fast query performance
   - Row Level Security (RLS) policies for read and admin operations
   - `car-images` storage bucket setup
4. *(Optional)* Run [`supabase/current-inventory-seed.sql`](file:///c:/Users/chitr/Desktop/chitranshautodeal/supabase/current-inventory-seed.sql) to seed sample vehicle listings into your database.

---

## 💻 Development & Build Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Builds the SSR & static production bundle for Cloudflare deployment |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint to check for code quality and style violations |
| `npm run format` | Formats code using Prettier |

---

## ☁️ Deployment

The project is configured for seamless deployment to **Cloudflare Workers / Pages**:

1. Ensure [`wrangler.jsonc`](file:///c:/Users/chitr/Desktop/chitranshautodeal/wrangler.jsonc) is configured for your Cloudflare environment.
2. Build the project using `npm run build`.
3. Deploy to Cloudflare via Wrangler:

```bash
npx wrangler pages deploy dist
```

Alternatively, link the GitHub repository directly to Cloudflare Pages with build command `npm run build` and output directory `dist`.

---

## 📄 License

This project is proprietary and built specifically for **Chitransh Auto Deal**, Kota, Rajasthan. All rights reserved.
