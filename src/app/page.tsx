"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import CropDoctorSection from "@/components/CropDoctorSection";
import AdvisorySection from "@/components/AdvisorySection";
import TraceabilitySection from "@/components/TraceabilitySection";
import ArchitectureSection from "@/components/ArchitectureSection";
import RoadmapSection from "@/components/RoadmapSection";
import Footer from "@/components/Footer";
import ChatInbox from "@/components/ChatInbox";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatContactId, setChatContactId] = useState<number | undefined>();

  const handleChatOpen = (farmerId: number, farmerName: string) => {
    // Map product IDs to mock contact IDs
    const productToContact: Record<number, number> = {
      1: 1, // Basmati Rice -> Rajesh Kumar
      2: 2, // Mangoes -> Priya Deshmukh
      7: 4, // Turmeric -> Savita Devi
    };
    setChatContactId(productToContact[farmerId] || 1);
    setChatOpen(true);
  };

  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <MarketplaceSection onChatOpen={handleChatOpen} />
      <CropDoctorSection />
      <AdvisorySection />
      <ArchitectureSection />
      <TraceabilitySection />
      <RoadmapSection />
      <Footer />

      {/* Chat Inbox */}
      <ChatInbox
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        initialContactId={chatContactId}
      />

      {/* Floating Chat FAB */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setChatContactId(undefined); setChatOpen(true); }}
            id="chat-fab"
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl shadow-green-500/30 flex items-center justify-center hover:shadow-2xl hover:shadow-green-500/40 transition-shadow"
            aria-label="Open inbox"
          >
            <MessageCircle className="w-7 h-7" />
            {/* Unread dot */}
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
              6
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
