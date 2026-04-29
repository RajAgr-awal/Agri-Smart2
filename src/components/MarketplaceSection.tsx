"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Star, ShoppingCart, Heart, MessageCircle,
  Wheat, Apple, Leaf, Milk, Bean, TrendingUp, Clock, BadgeCheck,
  SlidersHorizontal, ArrowUpDown, X, ChevronDown, Filter,
  IndianRupee, Navigation, Package,
} from "lucide-react";

type Category = "all" | "grains" | "fruits" | "vegetables" | "dairy" | "spices";
type SortKey = "relevance" | "price-low" | "price-high" | "rating" | "freshness" | "distance";

interface Listing {
  id: number;
  name: string;
  farmer: string;
  location: string;
  state: string;
  distance: number;
  price: number;
  unit: string;
  oldPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: Category;
  organic: boolean;
  verified: boolean;
  freshness: string;
  freshnessHours: number;
  available: string;
  trending: boolean;
  minOrder: number;
}

const categories = [
  { key: "all" as Category, label: "All Products", icon: ShoppingCart },
  { key: "grains" as Category, label: "Grains", icon: Wheat },
  { key: "fruits" as Category, label: "Fruits", icon: Apple },
  { key: "vegetables" as Category, label: "Vegetables", icon: Leaf },
  { key: "dairy" as Category, label: "Dairy", icon: Milk },
  { key: "spices" as Category, label: "Spices", icon: Bean },
];

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "price-low", label: "Price: Low → High" },
  { key: "price-high", label: "Price: High → Low" },
  { key: "rating", label: "Highest Rated" },
  { key: "freshness", label: "Most Fresh" },
  { key: "distance", label: "Nearest First" },
];

const locations = ["All Locations", "Punjab", "Maharashtra", "Gujarat", "Kashmir", "Haryana", "Tamil Nadu", "Andhra Pradesh", "Karnataka"];

const listings: Listing[] = [
  { id: 1, name: "Organic Basmati Rice", farmer: "Rajesh Kumar", location: "Amritsar", state: "Punjab", distance: 12, price: 85, unit: "/kg", oldPrice: 120, rating: 4.8, reviews: 234, image: "🌾", category: "grains", organic: true, verified: true, freshness: "Harvested 3 days ago", freshnessHours: 72, available: "500 kg", trending: true, minOrder: 10 },
  { id: 2, name: "Alphonso Mangoes", farmer: "Priya Deshmukh", location: "Ratnagiri", state: "Maharashtra", distance: 85, price: 450, unit: "/dz", oldPrice: 600, rating: 4.9, reviews: 189, image: "🥭", category: "fruits", organic: true, verified: true, freshness: "Picked today", freshnessHours: 6, available: "200 dozen", trending: true, minOrder: 2 },
  { id: 3, name: "Fresh Tomatoes", farmer: "Suresh Patel", location: "Nashik", state: "Maharashtra", distance: 45, price: 32, unit: "/kg", oldPrice: 50, rating: 4.6, reviews: 98, image: "🍅", category: "vegetables", organic: false, verified: true, freshness: "Harvested yesterday", freshnessHours: 24, available: "1,200 kg", trending: false, minOrder: 5 },
  { id: 4, name: "A2 Cow Milk", farmer: "Lakshmi Dairy", location: "Anand", state: "Gujarat", distance: 120, price: 70, unit: "/L", oldPrice: 80, rating: 4.7, reviews: 312, image: "🥛", category: "dairy", organic: true, verified: true, freshness: "Fresh this morning", freshnessHours: 4, available: "500L daily", trending: false, minOrder: 5 },
  { id: 5, name: "Kashmiri Saffron", farmer: "Abdul Rashid", location: "Pampore", state: "Kashmir", distance: 650, price: 290, unit: "/g", oldPrice: 400, rating: 5.0, reviews: 67, image: "🌸", category: "spices", organic: true, verified: true, freshness: "Current season", freshnessHours: 168, available: "2 kg", trending: true, minOrder: 1 },
  { id: 6, name: "Whole Wheat Flour", farmer: "Mohan Singh", location: "Karnal", state: "Haryana", distance: 28, price: 42, unit: "/kg", oldPrice: 55, rating: 4.5, reviews: 156, image: "🌾", category: "grains", organic: false, verified: true, freshness: "Ground 2 days ago", freshnessHours: 48, available: "800 kg", trending: false, minOrder: 10 },
  { id: 7, name: "Organic Turmeric", farmer: "Savita Devi", location: "Erode", state: "Tamil Nadu", distance: 380, price: 180, unit: "/kg", oldPrice: 250, rating: 4.8, reviews: 203, image: "🫚", category: "spices", organic: true, verified: false, freshness: "Sun-dried this week", freshnessHours: 96, available: "300 kg", trending: true, minOrder: 2 },
  { id: 8, name: "Green Chillies", farmer: "Venkat Reddy", location: "Guntur", state: "Andhra Pradesh", distance: 320, price: 60, unit: "/kg", oldPrice: 80, rating: 4.4, reviews: 78, image: "🌶️", category: "vegetables", organic: false, verified: true, freshness: "Picked today", freshnessHours: 8, available: "600 kg", trending: false, minOrder: 5 },
  { id: 9, name: "Fresh Coconut", farmer: "Ravi Nair", location: "Mangalore", state: "Karnataka", distance: 210, price: 35, unit: "/pc", oldPrice: 45, rating: 4.3, reviews: 45, image: "🥥", category: "fruits", organic: true, verified: true, freshness: "Picked yesterday", freshnessHours: 20, available: "1000 pcs", trending: false, minOrder: 10 },
  { id: 10, name: "Desi Ghee", farmer: "Kamla Devi", location: "Jaipur", state: "Gujarat", distance: 95, price: 550, unit: "/L", oldPrice: 700, rating: 4.9, reviews: 421, image: "🧈", category: "dairy", organic: true, verified: true, freshness: "Made 2 days ago", freshnessHours: 48, available: "50L", trending: true, minOrder: 1 },
];

interface MarketplaceProps {
  onChatOpen?: (farmerId: number, farmerName: string) => void;
}

export default function MarketplaceSection({ onChatOpen }: MarketplaceProps) {
  const [activeCat, setActiveCat] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [favs, setFavs] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Advanced filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [maxDistance, setMaxDistance] = useState(1000);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    if (selectedLocation !== "All Locations") count++;
    if (maxDistance < 1000) count++;
    if (organicOnly) count++;
    if (verifiedOnly) count++;
    if (minRating > 0) count++;
    return count;
  }, [priceRange, selectedLocation, maxDistance, organicOnly, verifiedOnly, minRating]);

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedLocation("All Locations");
    setMaxDistance(1000);
    setOrganicOnly(false);
    setVerifiedOnly(false);
    setMinRating(0);
  };

  const filtered = useMemo(() => {
    let result = listings.filter((l) => {
      const matchCat = activeCat === "all" || l.category === activeCat;
      const matchQ = l.name.toLowerCase().includes(query.toLowerCase()) || l.farmer.toLowerCase().includes(query.toLowerCase()) || l.location.toLowerCase().includes(query.toLowerCase());
      const matchPrice = l.price >= priceRange[0] && l.price <= priceRange[1];
      const matchLocation = selectedLocation === "All Locations" || l.state === selectedLocation;
      const matchDistance = l.distance <= maxDistance;
      const matchOrganic = !organicOnly || l.organic;
      const matchVerified = !verifiedOnly || l.verified;
      const matchRating = l.rating >= minRating;
      return matchCat && matchQ && matchPrice && matchLocation && matchDistance && matchOrganic && matchVerified && matchRating;
    });

    // Sort
    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "freshness": result.sort((a, b) => a.freshnessHours - b.freshnessHours); break;
      case "distance": result.sort((a, b) => a.distance - b.distance); break;
      default: result.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0)); break;
    }
    return result;
  }, [activeCat, query, sortBy, priceRange, selectedLocation, maxDistance, organicOnly, verifiedOnly, minRating]);

  return (
    <section id="marketplace" className="section-padding bg-gradient-to-b from-white to-green-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="badge badge-green mb-4"><ShoppingCart className="w-3.5 h-3.5" /> Direct Marketplace</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Fresh from the <span className="gradient-text">Farm</span></h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">No middlemen. No markups. Buy directly from verified farmers.</p>
        </motion.div>

        {/* Search + Sort + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search crops, farmers, locations..." id="marketplace-search" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 text-sm" />
          </div>
          {/* Sort Dropdown */}
          <div className="relative">
            <button onClick={() => setShowSortDropdown(!showSortDropdown)} id="sort-toggle" className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-slate-200 bg-white hover:border-green-300 text-sm font-medium text-slate-600 transition-colors whitespace-nowrap">
              <ArrowUpDown className="w-4 h-4" />
              {sortOptions.find(s => s.key === sortBy)?.label}
              <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showSortDropdown && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl z-20 overflow-hidden">
                  {sortOptions.map((opt) => (
                    <button key={opt.key} onClick={() => { setSortBy(opt.key); setShowSortDropdown(false); }} className={`block w-full text-left px-4 py-3 text-sm transition-colors ${sortBy === opt.key ? "bg-green-50 text-green-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}>
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Filter Toggle */}
          <button onClick={() => setShowFilters(!showFilters)} id="filter-toggle" className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border text-sm font-medium transition-all whitespace-nowrap ${showFilters ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-500/25" : "border-slate-200 bg-white text-slate-600 hover:border-green-300"}`}>
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${showFilters ? "bg-white text-green-600" : "bg-green-600 text-white"}`}>{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Advanced Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2"><Filter className="w-4 h-4 text-green-600" />Advanced Filters</h3>
                  <button onClick={resetFilters} className="text-xs font-medium text-green-600 hover:text-green-700 flex items-center gap-1"><X className="w-3 h-3" />Reset All</button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                  {/* Location */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Location</label>
                    <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} id="filter-location" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400">
                      {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                  {/* Max Distance */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between"><span>Max Distance</span><span className="text-green-600">{maxDistance < 1000 ? `${maxDistance} km` : "Any"}</span></label>
                    <input type="range" min={10} max={1000} step={10} value={maxDistance} onChange={(e) => setMaxDistance(Number(e.target.value))} className="w-full accent-green-500 h-2" />
                  </div>
                  {/* Price Range */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between"><span>Price Range</span><span className="text-green-600">₹{priceRange[0]} - ₹{priceRange[1]}</span></label>
                    <div className="flex gap-2">
                      <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-full px-2 py-2 rounded-lg border border-slate-200 text-sm text-center" placeholder="Min" />
                      <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full px-2 py-2 rounded-lg border border-slate-200 text-sm text-center" placeholder="Max" />
                    </div>
                  </div>
                  {/* Min Rating */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Min Rating</label>
                    <div className="flex gap-1">
                      {[0, 3, 3.5, 4, 4.5].map(r => (
                        <button key={r} onClick={() => setMinRating(r)} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${minRating === r ? "bg-green-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                          {r === 0 ? "All" : `${r}+`}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Organic Toggle */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Type</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={organicOnly} onChange={(e) => setOrganicOnly(e.target.checked)} className="w-4 h-4 rounded accent-green-500" />
                        <span className="text-sm text-slate-700">Organic Only</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="w-4 h-4 rounded accent-green-500" />
                        <span className="text-sm text-slate-700">Verified Sellers</span>
                      </label>
                    </div>
                  </div>
                  {/* Result Count */}
                  <div className="flex items-end">
                    <div className="w-full py-3 rounded-xl bg-green-50 border border-green-200 text-center">
                      <span className="text-2xl font-bold text-green-700">{filtered.length}</span>
                      <span className="text-xs text-green-600 block">results found</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-center flex-wrap">
          {categories.map((c) => (
            <button key={c.key} onClick={() => setActiveCat(c.key)} id={`cat-${c.key}`} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCat === c.key ? "bg-green-600 text-white shadow-lg shadow-green-500/25" : "bg-white text-slate-600 border border-slate-200 hover:border-green-300"}`}>
              <c.icon className="w-4 h-4" />{c.label}
            </button>
          ))}
        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filtered.length}</span> products
            {activeCat !== "all" && <> in <span className="font-semibold text-green-600">{categories.find(c => c.key === activeCat)?.label}</span></>}
            {selectedLocation !== "All Locations" && <> near <span className="font-semibold text-green-600">{selectedLocation}</span></>}
          </p>
          {activeFilterCount > 0 && (
            <button onClick={resetFilters} className="text-xs font-medium text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"><X className="w-3 h-3" />Clear filters</button>
          )}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover" id={`product-${item.id}`}>
                <div className="relative h-40 bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{item.image}</span>
                  {item.trending && <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold"><TrendingUp className="w-3 h-3" />Trending</div>}
                  {item.organic && <div className="absolute top-3 right-12 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-semibold"><BadgeCheck className="w-3 h-3" />Organic</div>}
                  <button onClick={() => setFavs(p => p.includes(item.id) ? p.filter(f => f !== item.id) : [...p, item.id])} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm" aria-label="Favorite"><Heart className={`w-4 h-4 ${favs.includes(item.id) ? "fill-red-500 text-red-500" : "text-slate-400"}`} /></button>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 text-sm">{item.name}</h3>
                    <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span className="text-xs font-medium">{item.rating}</span><span className="text-xs text-slate-400">({item.reviews})</span></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1"><MapPin className="w-3 h-3" />{item.farmer} • {item.location}, {item.state}</div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1 text-xs text-green-600"><Clock className="w-3 h-3" />{item.freshness}</div>
                    <div className="flex items-center gap-1 text-xs text-blue-500"><Navigation className="w-3 h-3" />{item.distance} km</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Package className="w-3 h-3" />{item.available}</span>
                    {item.verified && <span className="flex items-center gap-1 text-green-600"><BadgeCheck className="w-3 h-3" />Verified</span>}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xl font-bold text-green-700">₹{item.price}</span>
                      <span className="text-xs text-slate-400 ml-1">{item.unit}</span>
                      <div className="text-xs text-slate-400 line-through">₹{item.oldPrice}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => onChatOpen?.(item.id, item.farmer)} className="p-2 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 transition-colors" aria-label="Chat with seller" title="Chat with seller"><MessageCircle className="w-4 h-4" /></button>
                      <button className="flex items-center gap-1 px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-semibold hover:bg-green-700 shadow-sm"><ShoppingCart className="w-3.5 h-3.5" />Order</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && <div className="text-center py-20 text-slate-400"><Leaf className="w-12 h-12 mx-auto mb-4 opacity-30" /><p className="text-lg">No products match your filters.</p><button onClick={resetFilters} className="mt-3 text-sm text-green-600 font-medium hover:underline">Reset all filters</button></div>}
      </div>
    </section>
  );
}
