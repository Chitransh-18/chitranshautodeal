import { MessageCircle, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";

const WHATSAPP = "919828455400";
const INSTAGRAM = "https://www.instagram.com/chitransh_auto_deal/";
const MAPS = "https://maps.google.com/?q=Chitransh+Auto+Deal+Kota+Rajasthan";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Contact</div>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Let's get you <span className="text-gradient-red">behind the wheel</span>
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Drop by our showroom, send us a WhatsApp, or follow our Instagram for fresh arrivals.
              We're here every day from 10 AM to 8 PM.
            </p>

            <div className="mt-8 space-y-4">
              <Info icon={Phone} label="Phone" value="+91 98284 55400" />
              <Info icon={Mail} label="Email" value="Chitranshsaxena85@gmail.com" />
              <Info
                icon={MapPin}
                label="Showroom"
                value="Kota, Rajasthan"
              />
              <Info icon={Clock} label="Hours" value="Mon – Sun · 10:00 AM – 8:00 PM" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-red px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-background"
              >
                <Instagram size={16} /> Instagram
              </a>
              <a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-background"
              >
                <MapPin size={16} /> Google Maps
              </a>
            </div>
          </div>

          <div className="premium-ring overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Kota+Rajasthan&output=embed"
              className="h-full min-h-[420px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-2xl bg-gradient-red p-2.5 text-primary-foreground shadow-glow">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 font-medium">{value}</div>
      </div>
    </div>
  );
}
