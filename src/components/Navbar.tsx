"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Menu,
  X,
  ShoppingCart,
  Microscope,
  Cloud,
  ScanLine,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#marketplace", label: "Marketplace" },
  { href: "#crop-doctor", label: "Crop Doctor" },
  { href: "#advisory", label: "Advisory" },
  { href: "#traceability", label: "Traceability" },
  { href: "#roadmap", label: "Roadmap" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="navbar-logo">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
              <Leaf className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight">
              <span className="gradient-text">Agri</span>
              <span className="text-slate-700">Smart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-green-700 transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300 group-hover:w-2/3" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#marketplace"
              id="nav-cta-explore"
              className="px-4 py-2 text-sm font-medium text-green-700 border border-green-200 rounded-full hover:bg-green-50 transition-all duration-200"
            >
              Explore Market
            </a>
            <a
              href="#contact"
              id="nav-cta-start"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-green-50 transition-colors"
            id="nav-mobile-toggle"
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-green-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-700 hover:bg-green-50 hover:text-green-700 font-medium transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="#marketplace"
                  className="block text-center px-4 py-3 text-green-700 border border-green-200 rounded-xl hover:bg-green-50 font-medium transition-colors"
                >
                  Explore Market
                </a>
                <a
                  href="#contact"
                  className="block text-center px-5 py-3 text-white rounded-xl bg-gradient-to-r from-green-600 to-green-500 font-semibold shadow-md"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
