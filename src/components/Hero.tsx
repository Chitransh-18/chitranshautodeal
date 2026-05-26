import { motion } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, Star, Car } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-gradient-hero pt-24"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroCar}
          alt="Premium pre-owned car"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Bhopal · Indore · Madhya Pradesh
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Drive home a<br />
            <span className="text-gradient-red">car you can trust.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Find trusted pre-owned cars at the right price. Every vehicle at
            Chitransh Auto Deal is hand-picked, inspected, and ready for the road.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#inventory"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-red px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              View Inventory
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              <Phone size={16} />
              Contact Us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {[
              { n: "500+", l: "Cars Delivered" },
              { n: "100%", l: "Verified Cars" },
              { n: "12+", l: "Years Trusted" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold sm:text-3xl">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating credential cards */}
        <div className="hidden lg:col-span-5 lg:block">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative h-full"
          >
            {[
              { icon: ShieldCheck, title: "200-Point Inspection", desc: "Every car checked top-to-bottom" },
              { icon: Star, title: "Premium Selection", desc: "Hand-picked, low-km vehicles only" },
              { icon: Car, title: "Easy Test Drive", desc: "At your home or our showroom" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                className="mb-4 flex items-start gap-4 rounded-2xl border border-border glass p-5 shadow-card"
                style={{ marginLeft: `${i * 24}px` }}
              >
                <div className="rounded-xl bg-gradient-red p-2.5 text-primary-foreground">
                  <f.icon size={20} />
                </div>
                <div>
                  <div className="font-semibold">{f.title}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
