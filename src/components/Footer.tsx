"use client";

import { motion } from "framer-motion";
import { Leaf, Globe, ExternalLink, MessageCircle, Mail, Phone, MapPin, Heart, ArrowUp, Send } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer id="contact" className="relative bg-gradient-to-b from-green-900 to-green-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      {/* CTA Banner */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 bg-gradient-to-r from-green-800/50 to-green-700/50 rounded-3xl border border-green-600/30 p-12 backdrop-blur-sm">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4">Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-amber-300">Farming?</span></h2>
          <p className="text-green-200 text-lg max-w-xl mx-auto mb-8">Join 50,000+ farmers already using Agri-Smart to boost their income and protect their crops.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-green-500/30 text-white placeholder-green-300/50 focus:outline-none focus:ring-2 focus:ring-green-400/30 text-sm" id="footer-email" />
            <button className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-green-900 font-semibold text-sm hover:from-green-300 hover:to-green-400 transition-all shadow-lg flex items-center justify-center gap-2" id="footer-subscribe"><Send className="w-4 h-4" />Get Started</button>
          </div>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-green-400 flex items-center justify-center"><Leaf className="w-4 h-4 text-white" /></div>
              <span className="text-lg font-bold font-display">AgriSmart</span>
            </div>
            <p className="text-green-300/70 text-sm leading-relaxed mb-4">Empowering farmers with technology, connecting them directly to markets, and ensuring every bite is traceable.</p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-green-800/50 hover:bg-green-700/50 flex items-center justify-center transition-colors"><Icon className="w-4 h-4 text-green-300" /></a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-green-200">Platform</h4>
            <div className="space-y-3">
              {["Marketplace", "Crop Doctor", "Smart Advisory", "Traceability", "Pricing"].map((link) => (
                <a key={link} href="#" className="block text-sm text-green-300/70 hover:text-green-200 transition-colors">{link}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-green-200">Resources</h4>
            <div className="space-y-3">
              {["Documentation", "API Reference", "Blog", "Case Studies", "Help Center"].map((link) => (
                <a key={link} href="#" className="block text-sm text-green-300/70 hover:text-green-200 transition-colors">{link}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-green-200">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-green-300/70"><Mail className="w-4 h-4" />hello@agri-smart.in</div>
              <div className="flex items-center gap-2 text-sm text-green-300/70"><Phone className="w-4 h-4" />+91 80 1234 5678</div>
              <div className="flex items-center gap-2 text-sm text-green-300/70"><MapPin className="w-4 h-4" />Bangalore, India</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-400/50 text-xs">© 2026 Agri-Smart. All rights reserved.</p>
          <div className="flex items-center gap-1 text-green-400/50 text-xs">Made with <Heart className="w-3 h-3 text-red-400 fill-red-400 mx-0.5" /> for Indian Farmers</div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-9 h-9 rounded-lg bg-green-800/50 hover:bg-green-700/50 flex items-center justify-center transition-colors" aria-label="Back to top"><ArrowUp className="w-4 h-4 text-green-300" /></button>
        </div>
      </div>
    </footer>
  );
}
