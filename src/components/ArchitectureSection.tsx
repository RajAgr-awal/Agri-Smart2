"use client";

import { motion } from "framer-motion";
import { Server, Smartphone, Database, Cloud, Brain, CreditCard, Shield, Zap, ArrowRight, Layers } from "lucide-react";

const layers = [
  { label: "Frontend", tech: "React Native / Expo", reason: "Cross-platform native performance", icon: Smartphone, color: "from-blue-500 to-cyan-500" },
  { label: "Backend", tech: "Node.js (Express)", reason: "Async handling of concurrent users/bids", icon: Server, color: "from-green-500 to-emerald-500" },
  { label: "Primary DB", tech: "MongoDB + PostgreSQL", reason: "Flexible listings + structured transactions", icon: Database, color: "from-amber-500 to-orange-500" },
  { label: "Real-time", tech: "Firebase Firestore", reason: "Instant price negotiation & chat", icon: Zap, color: "from-yellow-500 to-amber-500" },
  { label: "AI/ML", tech: "TensorFlow Lite + Gemini", reason: "On-device + cloud AI inference", icon: Brain, color: "from-purple-500 to-violet-500" },
  { label: "Cloud", tech: "AWS (S3 + Lambda)", reason: "Cost-effective seasonal scaling", icon: Cloud, color: "from-sky-500 to-blue-500" },
  { label: "Payments", tech: "UPI + Bank APIs", reason: "Secure escrow with nodal accounts", icon: CreditCard, color: "from-emerald-500 to-teal-500" },
];

const microservices = [
  { name: "Marketplace Service", desc: "Listings, search, orders, bidding", icon: "🏪", color: "bg-green-50 border-green-200" },
  { name: "Intelligence Service", desc: "AI models, IoT weather data, advisory", icon: "🧠", color: "bg-purple-50 border-purple-200" },
  { name: "Payment/Escrow Service", desc: "UPI integration, fund holding, settlements", icon: "💳", color: "bg-amber-50 border-amber-200" },
];

export default function ArchitectureSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium text-slate-300 mb-4"><Layers className="w-3.5 h-3.5" /> Technical Architecture</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">Modular <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-amber-400">Microservices</span> Architecture</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Separating heavy AI processing from lightweight marketplace transactions for maximum performance.</p>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {layers.map((layer, i) => (
            <motion.div key={layer.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <layer.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{layer.label}</div>
              <div className="text-sm font-semibold text-white mb-1">{layer.tech}</div>
              <div className="text-xs text-slate-400">{layer.reason}</div>
            </motion.div>
          ))}
        </div>

        {/* Microservices */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-center font-display text-xl font-bold text-white mb-8">Core Microservices</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {microservices.map((ms, i) => (
              <motion.div key={ms.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all group">
                <div className="text-4xl mb-4">{ms.icon}</div>
                <h4 className="font-semibold text-white mb-2">{ms.name}</h4>
                <p className="text-slate-400 text-sm">{ms.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API Gateway Visualization */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 flex-wrap justify-center">
            <div className="px-5 py-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium">📱 Mobile App</div>
            <ArrowRight className="w-5 h-5 text-slate-500" />
            <div className="px-5 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-medium">🔀 API Gateway</div>
            <ArrowRight className="w-5 h-5 text-slate-500" />
            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium">Intelligence</div>
              <div className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium">Marketplace</div>
              <div className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium">Payments</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
