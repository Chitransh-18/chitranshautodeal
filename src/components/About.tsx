import { motion } from "framer-motion";
import { Award, Handshake, Wrench, Sparkles } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "Certified Pre-Owned",
    desc: "Every car backed by our quality certification and inspection report.",
  },
  {
    icon: Wrench,
    title: "Service History",
    desc: "Verified service records and clean ownership on every listing.",
  },
  {
    icon: Handshake,
    title: "Easy Financing",
    desc: "Tie-ups with leading banks for low-interest, hassle-free loans.",
  },
  {
    icon: Sparkles,
    title: "Detailed & Ready",
    desc: "Each car professionally detailed and ready to drive home.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-y border-border bg-surface/55 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Why Chitransh</div>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            A dealership built on <span className="text-gradient-red">trust</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            We've spent over a decade helping families and enthusiasts find cars they love — without
            the games, the haggling, or the surprises.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="premium-ring rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-foreground/50"
            >
              <div className="inline-flex rounded-2xl bg-gradient-red p-3 text-primary-foreground shadow-glow">
                <it.icon size={20} />
              </div>
              <div className="mt-5 font-display text-lg font-bold">{it.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
