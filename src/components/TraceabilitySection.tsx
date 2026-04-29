"use client";

import { motion } from "framer-motion";
import { ScanLine, MapPin, Calendar, Truck, Leaf, ShieldCheck, QrCode, ArrowRight, CheckCircle2 } from "lucide-react";

const journey = [
  { step: 1, title: "Farm Origin", desc: "GPS-verified farm location & farmer identity", icon: MapPin, color: "bg-green-500" },
  { step: 2, title: "Harvest Date", desc: "Exact date of harvesting with batch ID", icon: Calendar, color: "bg-amber-500" },
  { step: 3, title: "Quality Check", desc: "Pesticide residue & freshness testing", icon: ShieldCheck, color: "bg-blue-500" },
  { step: 4, title: "Transit", desc: "Cold-chain logistics tracking in real-time", icon: Truck, color: "bg-purple-500" },
  { step: 5, title: "Delivery", desc: "QR scan confirms delivery & triggers payment", icon: QrCode, color: "bg-green-600" },
];

const sampleTrace = {
  product: "Organic Basmati Rice",
  batch: "AGR-2026-04-2847",
  farmer: "Rajesh Kumar",
  farm: "Kumar Organic Farms",
  location: "Amritsar, Punjab",
  gps: "31.6340° N, 74.8723° E",
  harvest: "April 26, 2026",
  quality: "Grade A — No pesticide residues detected",
  transport: "Cold-chain truck via NH-44",
  arrived: "April 29, 2026",
};

export default function TraceabilitySection() {
  return (
    <section id="traceability" className="section-padding bg-gradient-to-b from-white to-slate-50 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="badge badge-earth mb-4"><ScanLine className="w-3.5 h-3.5" /> Traceability Map</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Seed to <span className="gradient-text">Plate</span> Transparency</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Consumers scan a QR code on the produce to see the full journey — from farm GPS to delivery.</p>
        </motion.div>

        {/* Journey Timeline */}
        <div className="relative mb-16">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-slate-200" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {journey.map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative text-center">
                <div className={`w-16 h-16 rounded-2xl ${item.color} mx-auto mb-4 flex items-center justify-center shadow-lg relative z-10`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h4>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sample QR Trace */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center"><QrCode className="w-6 h-6 text-green-600" /></div>
              <div>
                <h3 className="font-display font-bold text-slate-900">Sample QR Trace</h3>
                <p className="text-xs text-slate-400">What consumers see after scanning</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Product", value: sampleTrace.product },
                { label: "Batch ID", value: sampleTrace.batch },
                { label: "Farmer", value: sampleTrace.farmer },
                { label: "Farm", value: sampleTrace.farm },
                { label: "Location", value: sampleTrace.location },
                { label: "GPS", value: sampleTrace.gps },
                { label: "Harvest Date", value: sampleTrace.harvest },
                { label: "Quality", value: sampleTrace.quality },
                { label: "Transport", value: sampleTrace.transport },
                { label: "Arrived", value: sampleTrace.arrived },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <div><span className="text-xs text-slate-400 block">{row.label}</span><span className="text-sm font-medium text-slate-800">{row.value}</span></div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {/* Escrow Flow */}
            <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-green-700/30 blur-2xl" />
              <div className="relative">
                <h3 className="font-display text-xl font-bold mb-4">🔒 Escrow Payment Flow</h3>
                <div className="space-y-4">
                  {[
                    "Farmer lists produce at base price",
                    "Buyer places order or counter-offers",
                    "Payment authorized via UPI → held in escrow",
                    "Driver assigned — both verify the load",
                    "Buyer scans QR at delivery → funds released",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/30 text-green-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-green-100 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-amber-50 rounded-3xl border border-amber-200 p-8">
              <h3 className="font-display font-bold text-slate-900 mb-4">Why Traceability Matters</h3>
              <div className="space-y-3">
                {[
                  "Consumers know exactly where food comes from",
                  "Farmers get premium prices for verified organic produce",
                  "Reduces food fraud and adulteration by 80%",
                  "Government compliance with FSSAI standards",
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700"><Leaf className="w-4 h-4 text-green-600 shrink-0" />{b}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
