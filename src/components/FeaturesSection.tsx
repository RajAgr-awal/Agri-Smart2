"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Microscope,
  Cloud,
  ScanLine,
  ArrowRight,
  Zap,
  Shield,
  Wifi,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Direct Marketplace",
    description:
      "Connect farmers directly with retailers and consumers. Set prices, negotiate in real-time, and receive secure escrow payments via UPI.",
    highlights: ["Real-time bidding", "QR delivery confirmation", "Escrow payments"],
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Microscope,
    title: "Crop Doctor AI",
    description:
      "Upload a photo of any diseased leaf and our CNN model instantly identifies pests, diseases, and provides organic or chemical remedies with safe withdrawal periods.",
    highlights: ["Image-based diagnosis", "Offline capable", "Safe remedy suggestions"],
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Cloud,
    title: "Smart Advisory",
    description:
      "Soil-based fertilizer recommendations and weather-triggered action plans. Get notified before storms, frosts, or optimal planting windows.",
    highlights: ["Weather alerts", "Soil analysis", "Yield optimization"],
    gradient: "from-sky-500 to-blue-600",
    bgGradient: "from-sky-50 to-blue-50",
    borderColor: "border-sky-200",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    icon: ScanLine,
    title: "Traceability Map",
    description:
      "Consumers scan a QR code on produce to see the farm's location, harvest date, pesticide history, and transport chain. Full transparency from seed to plate.",
    highlights: ["QR code scanning", "Farm GPS location", "Harvest history"],
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

const additionalFeatures = [
  {
    icon: Wifi,
    title: "Offline-First",
    description:
      "Works without internet. Sync automatically when connectivity returns.",
  },
  {
    icon: Globe,
    title: "Multilingual",
    description: "Interface available in 12+ Indian languages with voice support.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "UPI-integrated escrow protects both farmers and buyers.",
  },
  {
    icon: Zap,
    title: "Lite Mode",
    description: "Optimized for low-bandwidth rural areas with minimal data usage.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-white relative">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--green-500) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge badge-green mb-4">
            <Zap className="w-3.5 h-3.5" /> The Agri-Smart Stack
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Four Pillars of{" "}
            <span className="gradient-text">Smart Agriculture</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            An integrated ecosystem that puts technology to work for the people
            who feed our world.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 mb-20"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`group relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} card-hover overflow-hidden`}
              id={`feature-card-${i}`}
            >
              {/* Decorative corner gradient */}
              <div
                className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-bl-[100px] group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {feature.highlights.map((hl) => (
                    <span
                      key={hl}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-xs font-medium text-slate-700 border border-slate-100"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}
                      />
                      {hl}
                    </span>
                  ))}
                </div>

                <a
                  href={`#${feature.title.toLowerCase().replace(/\s/g, "-")}`}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent hover:gap-3 transition-all duration-300`}
                >
                  Learn more <ArrowRight className="w-4 h-4 text-current opacity-60" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center font-display text-xl font-bold text-slate-800 mb-8">
            Built for Rural Reality
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group text-center p-6 rounded-2xl bg-slate-50 hover:bg-green-50 border border-slate-100 hover:border-green-200 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm mb-3 group-hover:shadow-md transition-shadow">
                  <f.icon className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">
                  {f.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
