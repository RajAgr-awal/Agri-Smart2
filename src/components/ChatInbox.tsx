"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Search, Phone, MoreVertical,
  ChevronLeft, Circle, Image, Paperclip, Smile, Check,
  CheckCheck, Clock, BadgeCheck, Leaf, MapPin, Star,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
  time: string;
  status: "sent" | "delivered" | "read";
  type?: "text" | "offer" | "image";
  offerAmount?: number;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  role: "farmer" | "buyer";
  location: string;
  online: boolean;
  lastSeen: string;
  verified: boolean;
  rating: number;
  unread: number;
  lastMessage: string;
  lastTime: string;
  product?: string;
  messages: Message[];
}

const mockContacts: Contact[] = [
  {
    id: 1, name: "Rajesh Kumar", avatar: "👨‍🌾", role: "farmer", location: "Punjab",
    online: true, lastSeen: "Now", verified: true, rating: 4.8, unread: 2,
    lastMessage: "I can offer 500kg at ₹82/kg for bulk", lastTime: "2m ago",
    product: "Organic Basmati Rice",
    messages: [
      { id: 1, text: "Hello! I saw your listing for Organic Basmati Rice", sender: "me", time: "10:30 AM", status: "read" },
      { id: 2, text: "Yes, it's freshly harvested from our organic farms in Amritsar 🌾", sender: "them", time: "10:32 AM", status: "read" },
      { id: 3, text: "What's your best price for 500kg?", sender: "me", time: "10:33 AM", status: "read" },
      { id: 4, text: "I can offer 500kg at ₹82/kg for bulk", sender: "them", time: "10:35 AM", status: "read" },
      { id: 5, text: "That's a great deal! Can you deliver to Mumbai?", sender: "me", time: "10:36 AM", status: "delivered" },
    ],
  },
  {
    id: 2, name: "Priya Deshmukh", avatar: "👩‍🌾", role: "farmer", location: "Ratnagiri",
    online: true, lastSeen: "Now", verified: true, rating: 4.9, unread: 0,
    lastMessage: "The mangoes are Grade A Alphonso ✨", lastTime: "1h ago",
    product: "Alphonso Mangoes",
    messages: [
      { id: 1, text: "Hi Priya! Are the Alphonso mangoes still available?", sender: "me", time: "9:00 AM", status: "read" },
      { id: 2, text: "Yes! We have 200 dozen ready for dispatch 🥭", sender: "them", time: "9:05 AM", status: "read" },
      { id: 3, text: "The mangoes are Grade A Alphonso ✨", sender: "them", time: "9:06 AM", status: "read" },
    ],
  },
  {
    id: 3, name: "Metro Fresh Mart", avatar: "🏪", role: "buyer", location: "Mumbai",
    online: false, lastSeen: "30m ago", verified: true, rating: 4.6, unread: 1,
    lastMessage: "We need 2 tons of tomatoes weekly", lastTime: "45m ago",
    product: "Bulk Order Request",
    messages: [
      { id: 1, text: "We're looking for a reliable tomato supplier", sender: "them", time: "Yesterday", status: "read" },
      { id: 2, text: "We can supply 2 tons weekly from Nashik farms", sender: "me", time: "Yesterday", status: "read" },
      { id: 3, text: "We need 2 tons of tomatoes weekly", sender: "them", time: "11:00 AM", status: "delivered" },
    ],
  },
  {
    id: 4, name: "Savita Devi", avatar: "👩‍🌾", role: "farmer", location: "Erode, TN",
    online: false, lastSeen: "2h ago", verified: false, rating: 4.8, unread: 0,
    lastMessage: "Turmeric is sun-dried and ready", lastTime: "3h ago",
    product: "Organic Turmeric",
    messages: [
      { id: 1, text: "Hello, I'd like to order turmeric", sender: "me", time: "8:00 AM", status: "read" },
      { id: 2, text: "Turmeric is sun-dried and ready", sender: "them", time: "8:30 AM", status: "read" },
    ],
  },
  {
    id: 5, name: "Green Valley Co-op", avatar: "🌿", role: "buyer", location: "Bangalore",
    online: true, lastSeen: "Now", verified: true, rating: 4.7, unread: 3,
    lastMessage: "Can you ship saffron via cold chain?", lastTime: "15m ago",
    product: "Saffron Order",
    messages: [
      { id: 1, text: "We're interested in your Kashmir saffron listing", sender: "them", time: "11:00 AM", status: "read" },
      { id: 2, text: "How much quantity do you need?", sender: "me", time: "11:05 AM", status: "read" },
      { id: 3, text: "500 grams to start. Can you ship via cold chain?", sender: "them", time: "11:10 AM", status: "delivered" },
      { id: 4, text: "Can you ship saffron via cold chain?", sender: "them", time: "11:12 AM", status: "delivered" },
    ],
  },
];

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  initialContactId?: number;
}

export default function ChatInbox({ isOpen, onClose, initialContactId }: ChatProps) {
  const [contacts, setContacts] = useState(mockContacts);
  const [activeChat, setActiveChat] = useState<number | null>(initialContactId ?? null);
  const [newMsg, setNewMsg] = useState("");
  const [searchQ, setSearchQ] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "farmer" | "buyer">("all");
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContactId) setActiveChat(initialContactId);
  }, [initialContactId]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, contacts]);

  const activeContact = contacts.find(c => c.id === activeChat);

  const filteredContacts = contacts.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchQ.toLowerCase()) || c.product?.toLowerCase().includes(searchQ.toLowerCase());
    const matchRole = filterRole === "all" || c.role === filterRole;
    return matchSearch && matchRole;
  }).sort((a, b) => b.unread - a.unread);

  const totalUnread = contacts.reduce((sum, c) => sum + c.unread, 0);

  const sendMessage = () => {
    if (!newMsg.trim() || !activeChat) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    setContacts(prev => prev.map(c => {
      if (c.id !== activeChat) return c;
      return {
        ...c,
        lastMessage: newMsg,
        lastTime: "Just now",
        unread: 0,
        messages: [...c.messages, { id: c.messages.length + 1, text: newMsg, sender: "me" as const, time: timeStr, status: "sent" as const }],
      };
    }));
    setNewMsg("");
    // Simulate reply after 2s
    setTimeout(() => {
      const replies = [
        "That sounds good! Let me check and get back to you.",
        "Sure, we can arrange that. When do you need delivery?",
        "Let me discuss with my team and confirm the details.",
        "Great! I'll prepare the shipment right away 🚛",
        "The quality is guaranteed. You'll love our produce! 🌿",
      ];
      setContacts(prev => prev.map(c => {
        if (c.id !== activeChat) return c;
        const reply = replies[Math.floor(Math.random() * replies.length)];
        return {
          ...c,
          lastMessage: reply,
          lastTime: "Just now",
          messages: [...c.messages, { id: c.messages.length + 2, text: reply, sender: "them" as const, time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }), status: "read" as const }],
        };
      }));
    }, 2000);
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "read") return <CheckCheck className="w-3.5 h-3.5 text-blue-500" />;
    if (status === "delivered") return <CheckCheck className="w-3.5 h-3.5 text-slate-400" />;
    return <Check className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]" />
          {/* Chat Panel */}
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] lg:w-[800px] bg-white z-[70] flex shadow-2xl"
          >
            {/* Contact List */}
            <div className={`w-full lg:w-[320px] border-r border-slate-100 flex flex-col ${activeChat && "hidden lg:flex"}`}>
              {/* Header */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <h2 className="font-display font-bold text-lg text-slate-900">Inbox</h2>
                    {totalUnread > 0 && <span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">{totalUnread}</span>}
                  </div>
                  <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
                </div>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search conversations..." className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30" />
                </div>
                <div className="flex gap-1">
                  {(["all", "farmer", "buyer"] as const).map(role => (
                    <button key={role} onClick={() => setFilterRole(role)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${filterRole === role ? "bg-green-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                      {role === "all" ? "All" : role === "farmer" ? "🌾 Farmers" : "🏪 Buyers"}
                    </button>
                  ))}
                </div>
              </div>
              {/* Contact List */}
              <div className="flex-1 overflow-y-auto">
                {filteredContacts.map(contact => (
                  <button key={contact.id} onClick={() => { setActiveChat(contact.id); setContacts(p => p.map(c => c.id === contact.id ? { ...c, unread: 0 } : c)); }} className={`w-full flex items-start gap-3 p-4 text-left transition-colors border-b border-slate-50 ${activeChat === contact.id ? "bg-green-50" : "hover:bg-slate-50"}`}>
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center text-xl">{contact.avatar}</div>
                      {contact.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-sm text-slate-900 truncate">{contact.name}</span>
                          {contact.verified && <BadgeCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />}
                        </div>
                        <span className="text-xs text-slate-400 shrink-0">{contact.lastTime}</span>
                      </div>
                      {contact.product && <div className="text-xs text-green-600 font-medium mb-0.5 truncate">{contact.product}</div>}
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500 truncate">{contact.lastMessage}</p>
                        {contact.unread > 0 && <span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0 ml-2">{contact.unread}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat View */}
            <div className={`flex-1 flex flex-col ${!activeChat && "hidden lg:flex"}`}>
              {activeContact ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-white">
                    <button onClick={() => setActiveChat(null)} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100"><ChevronLeft className="w-5 h-5" /></button>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center text-lg">{activeContact.avatar}</div>
                      {activeContact.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-slate-900">{activeContact.name}</span>
                        {activeContact.verified && <BadgeCheck className="w-3.5 h-3.5 text-green-500" />}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${activeContact.role === "farmer" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{activeContact.role === "farmer" ? "Farmer" : "Buyer"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{activeContact.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{activeContact.rating}</span>
                        <span>•</span>
                        <span className={activeContact.online ? "text-green-600" : ""}>{activeContact.online ? "Online" : activeContact.lastSeen}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><Phone className="w-4 h-4 text-slate-500" /></button>
                      <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><MoreVertical className="w-4 h-4 text-slate-500" /></button>
                    </div>
                  </div>

                  {/* Product Context Banner */}
                  {activeContact.product && (
                    <div className="px-4 py-2.5 bg-green-50 border-b border-green-100 flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Discussing: {activeContact.product}</span>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-50/50 to-white">
                    {activeContact.messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === "me" ? "bg-green-600 text-white rounded-br-md" : "bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm"}`}>
                          <p>{msg.text}</p>
                          <div className={`flex items-center gap-1 mt-1 ${msg.sender === "me" ? "justify-end" : ""}`}>
                            <span className={`text-[10px] ${msg.sender === "me" ? "text-green-200" : "text-slate-400"}`}>{msg.time}</span>
                            {msg.sender === "me" && <StatusIcon status={msg.status} />}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEnd} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-slate-100 bg-white">
                    <div className="flex items-end gap-2">
                      <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors shrink-0"><Paperclip className="w-5 h-5" /></button>
                      <div className="flex-1 relative">
                        <textarea
                          value={newMsg}
                          onChange={e => setNewMsg(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                          placeholder="Type a message..."
                          rows={1}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 resize-none"
                        />
                      </div>
                      <button onClick={sendMessage} disabled={!newMsg.trim()} className="p-3 rounded-2xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shrink-0">
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-slate-50/50">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center mx-auto mb-4"><MessageCircle className="w-10 h-10 text-green-400" /></div>
                    <h3 className="font-display font-bold text-slate-700 text-lg mb-2">Select a Conversation</h3>
                    <p className="text-slate-400 text-sm max-w-xs">Choose a contact from the list to start chatting with farmers and buyers.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
