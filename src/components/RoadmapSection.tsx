"use client";

import { motion } from "framer-motion";
import { Rocket, Sprout, Brain, Truck, CheckCircle2, Circle, ArrowRight } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "MVP — Foundation",
    status: "completed" as const,
    timeline: "Month 1-3",
    color: "green",
    icon: Sprout,
    items: [
      "Basic listing and browsing of produce",
      "Buyer-seller real-time chat in 2 local languages",
      "UPI payment integration with escrow",
      "Farmer & buyer registration with Aadhaar verification",
      "QR-based delivery confirmation",
    ],
  },
  {
    phase: "Phase 2",
    title: "Agri-Intel — AI & Weather",
    status: "current" as const,
    timeline: "Month 4-7",
    color: "amber",
    icon: Brain,
    items: [
      "Crop Doctor: CNN-based disease detection from images",
      "Weather API integration for real-time alerts",
      "Soil-based fertilizer recommendations",
      "Offline-first sync with Redux-Persist / SQLite",
      "Voice interface for low-literacy farmers",
    ],
  },
  {
    phase: "Phase 3",
    title: "Scaling — Logistics & Gov APIs",
    status: "upcoming" as const,
    timeline: "Month 8-12",
    color: "blue",
    icon: Truck,
    items: [
      "3rd-party logistics integration & fleet tracking",
      "Government 'Soil Health Card' API sync",
      "Traceability map for end consumers",
      "Multi-state expansion with regional language packs",
      "Premium analytics dashboard for large buyers",
    ],
  },
];

const statusBadge = {
  completed: { label: "Completed", bg: "bg-green-100 text-green-700" },
  current: { label: "In Progress", bg: "bg-amber-100 text-amber-700" },
  upcoming: { label: "Upcoming", bg: "bg-blue-100 text-blue-700" },
};

const phaseColors = {
  green: { line: "bg-green-500", dot: "bg-green-500", card: "border-green-200 bg-green-50/50", iconBg: "bg-green-100" },
  amber: { line: "bg-amber-500", dot: "bg-amber-500", card: "border-amber-200 bg-amber-50/50", iconBg: "bg-amber-100" },
  blue: { line: "bg-blue-500", dot: "bg-blue-500", card: "border-blue-200 bg-blue-50/50", iconBg: "bg-blue-100" },
};

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="section-padding bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="badge badge-green mb-4"><Rocket className="w-3.5 h-3.5" /> Development Roadmap</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Building the <span className="gradient-text">Future</span> of Farming</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">A phased approach to delivering maximum impact — starting with the basics, scaling with intelligence.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-1 bg-slate-200 rounded-full" />

          <div className="space-y-12">
            {phases.map((phase, i) => {
              const colors = phaseColors[phase.color as keyof typeof phaseColors];
              const badge = statusBadge[phase.status];
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md z-10" style={{ top: "2rem" }}>
                    <div className={`w-full h-full rounded-full ${colors.dot} ${phase.status === "current" ? "animate-pulse-glow" : ""}`} />
                  </div>

                  {/* Card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <div className={`rounded-3xl border p-8 ${colors.card} card-hover`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                          <phase.icon className="w-6 h-6 text-slate-700" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{phase.phase}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge.bg}`}>{badge.label}</span>
                          </div>
                          <h3 className="font-display font-bold text-slate-900">{phase.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">{phase.timeline}</p>
                      <div className="space-y-2.5">
                        {phase.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            {phase.status === "completed" ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                            )}
                            <span className="text-sm text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
