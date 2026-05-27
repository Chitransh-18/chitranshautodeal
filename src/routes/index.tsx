import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Inventory } from "@/components/Inventory";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chitransh Auto Deal — Trusted Pre-Owned Cars" },
      {
        name: "description",
        content:
          "Premium used car dealership in Kota, Rajasthan. Hand-picked, inspected pre-owned cars at the right price. Visit Chitransh Auto Deal.",
      },
      { property: "og:title", content: "Chitransh Auto Deal — Trusted Pre-Owned Cars" },
      {
        property: "og:description",
        content:
          "Find trusted pre-owned cars at the right price at Chitransh Auto Deal.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <div
        className={`transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <Inventory />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
