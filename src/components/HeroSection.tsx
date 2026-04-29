"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  ShoppingCart,
  Microscope,
  Cloud,
  ScanLine,
  Play,
  TrendingUp,
  Users,
  Sprout,
} from "lucide-react";

const stats = [
  { icon: Users, value: "50K+", label: "Active Farmers", color: "green" },
  { icon: TrendingUp, value: "40%", label: "More Income", color: "amber" },
  { icon: Sprout, value: "2M+", label: "Crops Analyzed", color: "green" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-banner.png"
          alt="Lush farm landscape at golden hour"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/50 via-transparent to-green-950/30" />
      </div>

      {/* Floating leaf particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="leaf-particle"
          style={{
            left: `${15 + i * 15}%`,
            animationDuration: `${8 + i * 3}s`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-200 text-sm font-medium">
                🌱 Empowering 50,000+ Farmers Across India
              </span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] mb-6">
              <span className="text-white">From </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-400">
                Farm
              </span>
              <span className="text-white"> to </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">
                Fork
              </span>
              <br />
              <span className="text-white/90 text-3xl sm:text-4xl lg:text-5xl font-bold">
                Intelligence at Every Step
              </span>
            </h1>

            <p className="text-green-100/80 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Eliminate middlemen. Boost yields with AI-driven crop diagnostics.
              Get real-time weather advisory and give consumers full produce
              traceability — all in one platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <motion.a
                href="#marketplace"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                id="hero-cta-explore"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-green-900 rounded-2xl bg-gradient-to-r from-green-300 to-green-400 shadow-xl hover:shadow-glow transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                Explore Marketplace
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#crop-doctor"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                id="hero-cta-doctor"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <Microscope className="w-5 h-5" />
                Try Crop Doctor
              </motion.a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      stat.color === "green"
                        ? "bg-green-500/20"
                        : "bg-amber-500/20"
                    }`}
                  >
                    <stat.icon
                      className={`w-5 h-5 ${
                        stat.color === "green"
                          ? "text-green-400"
                          : "text-amber-400"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-green-200/60 text-xs font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              {
                icon: ShoppingCart,
                title: "Direct Marketplace",
                desc: "Sell directly to retailers & consumers",
                gradient: "from-green-500/20 to-green-600/20",
                border: "border-green-400/20",
                iconColor: "text-green-400",
              },
              {
                icon: Microscope,
                title: "Crop Doctor",
                desc: "AI-powered disease detection",
                gradient: "from-amber-500/20 to-amber-600/20",
                border: "border-amber-400/20",
                iconColor: "text-amber-400",
              },
              {
                icon: Cloud,
                title: "Smart Advisory",
                desc: "Weather & soil intelligence",
                gradient: "from-blue-500/20 to-blue-600/20",
                border: "border-blue-400/20",
                iconColor: "text-blue-400",
              },
              {
                icon: ScanLine,
                title: "Traceability",
                desc: "QR-based farm-to-fork tracking",
                gradient: "from-purple-500/20 to-purple-600/20",
                border: "border-purple-400/20",
                iconColor: "text-purple-400",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${card.gradient} border ${card.border} backdrop-blur-md cursor-pointer transition-all duration-300`}
              >
                <card.icon
                  className={`w-8 h-8 ${card.iconColor} mb-3 group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-white font-semibold text-sm mb-1">
                  {card.title}
                </h3>
                <p className="text-white/50 text-xs">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
