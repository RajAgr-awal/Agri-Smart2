/**
 * Shared business logic and mock data — ported from the Next.js web app.
 * This is the mobile equivalent of frontend/src/hooks/useData.ts
 */

// ─── Marketplace Types ─────────────────────────
export type Category = 'all' | 'grains' | 'fruits' | 'vegetables' | 'dairy' | 'spices';
export type SortKey = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'freshness' | 'distance';

export interface Listing {
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

export const categories: { key: Category; label: string; emoji: string }[] = [
  { key: 'all', label: 'All', emoji: '🛒' },
  { key: 'grains', label: 'Grains', emoji: '🌾' },
  { key: 'fruits', label: 'Fruits', emoji: '🍎' },
  { key: 'vegetables', label: 'Veggies', emoji: '🥬' },
  { key: 'dairy', label: 'Dairy', emoji: '🥛' },
  { key: 'spices', label: 'Spices', emoji: '🫚' },
];

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'price-low', label: 'Price: Low → High' },
  { key: 'price-high', label: 'Price: High → Low' },
  { key: 'rating', label: 'Highest Rated' },
  { key: 'freshness', label: 'Most Fresh' },
  { key: 'distance', label: 'Nearest First' },
];

export const listings: Listing[] = [
  { id: 1, name: 'Organic Basmati Rice', farmer: 'Rajesh Kumar', location: 'Amritsar', state: 'Punjab', distance: 12, price: 85, unit: '/kg', oldPrice: 120, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', category: 'grains', organic: true, verified: true, freshness: 'Harvested 3 days ago', freshnessHours: 72, available: '500 kg', trending: true, minOrder: 10 },
  { id: 2, name: 'Alphonso Mangoes', farmer: 'Priya Deshmukh', location: 'Ratnagiri', state: 'Maharashtra', distance: 85, price: 450, unit: '/dz', oldPrice: 600, rating: 4.9, reviews: 189, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop', category: 'fruits', organic: true, verified: true, freshness: 'Picked today', freshnessHours: 6, available: '200 dozen', trending: true, minOrder: 2 },
  { id: 3, name: 'Fresh Tomatoes', farmer: 'Suresh Patel', location: 'Nashik', state: 'Maharashtra', distance: 45, price: 32, unit: '/kg', oldPrice: 50, rating: 4.6, reviews: 98, image: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=300&fit=crop', category: 'vegetables', organic: false, verified: true, freshness: 'Harvested yesterday', freshnessHours: 24, available: '1,200 kg', trending: false, minOrder: 5 },
  { id: 4, name: 'A2 Cow Milk', farmer: 'Lakshmi Dairy', location: 'Anand', state: 'Gujarat', distance: 120, price: 70, unit: '/L', oldPrice: 80, rating: 4.7, reviews: 312, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop', category: 'dairy', organic: true, verified: true, freshness: 'Fresh this morning', freshnessHours: 4, available: '500L daily', trending: false, minOrder: 5 },
  { id: 5, name: 'Kashmiri Saffron', farmer: 'Abdul Rashid', location: 'Pampore', state: 'Kashmir', distance: 650, price: 290, unit: '/g', oldPrice: 400, rating: 5.0, reviews: 67, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop', category: 'spices', organic: true, verified: true, freshness: 'Current season', freshnessHours: 168, available: '2 kg', trending: true, minOrder: 1 },
  { id: 6, name: 'Whole Wheat Flour', farmer: 'Mohan Singh', location: 'Karnal', state: 'Haryana', distance: 28, price: 42, unit: '/kg', oldPrice: 55, rating: 4.5, reviews: 156, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop', category: 'grains', organic: false, verified: true, freshness: 'Ground 2 days ago', freshnessHours: 48, available: '800 kg', trending: false, minOrder: 10 },
  { id: 7, name: 'Organic Turmeric', farmer: 'Savita Devi', location: 'Erode', state: 'Tamil Nadu', distance: 380, price: 180, unit: '/kg', oldPrice: 250, rating: 4.8, reviews: 203, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop&q=80', category: 'spices', organic: true, verified: false, freshness: 'Sun-dried this week', freshnessHours: 96, available: '300 kg', trending: true, minOrder: 2 },
  { id: 8, name: 'Green Chillies', farmer: 'Venkat Reddy', location: 'Guntur', state: 'Andhra Pradesh', distance: 320, price: 60, unit: '/kg', oldPrice: 80, rating: 4.4, reviews: 78, image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=300&fit=crop', category: 'vegetables', organic: false, verified: true, freshness: 'Picked today', freshnessHours: 8, available: '600 kg', trending: false, minOrder: 5 },
  { id: 9, name: 'Fresh Coconut', farmer: 'Ravi Nair', location: 'Mangalore', state: 'Karnataka', distance: 210, price: 35, unit: '/pc', oldPrice: 45, rating: 4.3, reviews: 45, image: 'https://images.unsplash.com/photo-1580984969071-a8da8b38e4ce?w=400&h=300&fit=crop', category: 'fruits', organic: true, verified: true, freshness: 'Picked yesterday', freshnessHours: 20, available: '1000 pcs', trending: false, minOrder: 10 },
  { id: 10, name: 'Desi Ghee', farmer: 'Kamla Devi', location: 'Jaipur', state: 'Gujarat', distance: 95, price: 550, unit: '/L', oldPrice: 700, rating: 4.9, reviews: 421, image: 'https://images.unsplash.com/photo-1631209121750-a9f656d28f5d?w=400&h=300&fit=crop', category: 'dairy', organic: true, verified: true, freshness: 'Made 2 days ago', freshnessHours: 48, available: '50L', trending: true, minOrder: 1 },
];

// ─── Advisory Types ─────────────────────────
export const weatherData = {
  location: 'Nashik, Maharashtra',
  temp: 28,
  humidity: 72,
  wind: 12,
  condition: 'Partly Cloudy',
  forecast: [
    { day: 'Today', emoji: '☀️', temp: 28, rain: 10 },
    { day: 'Tue', emoji: '⛅', temp: 26, rain: 30 },
    { day: 'Wed', emoji: '🌧️', temp: 24, rain: 75 },
    { day: 'Thu', emoji: '🌧️', temp: 23, rain: 80 },
    { day: 'Fri', emoji: '☀️', temp: 27, rain: 15 },
  ],
};

export const soilData = {
  ph: 6.5,
  nitrogen: 65,
  phosphorus: 42,
  potassium: 78,
  organicMatter: 3.2,
  moisture: 55,
};

export const advisoryAlerts = [
  { type: 'warning' as const, title: 'Heavy Rain Expected', desc: 'Wed-Thu: 40-60mm rainfall. Delay pesticide spraying.', emoji: '🌧️' },
  { type: 'success' as const, title: 'Optimal Planting Window', desc: 'Next 5 days ideal for sowing wheat.', emoji: '🌱' },
  { type: 'info' as const, title: 'Fertilizer Reminder', desc: 'Apply DAP — soil phosphorus below optimal.', emoji: '🧪' },
];

export const recommendations = [
  { crop: 'Wheat', action: 'Apply Urea @ 50kg/acre', timing: 'This week', priority: 'High' as const },
  { crop: 'Tomato', action: 'Install drip irrigation', timing: 'Before Wed rain', priority: 'Medium' as const },
  { crop: 'Rice', action: 'Begin nursery preparation', timing: 'Next 10 days', priority: 'High' as const },
  { crop: 'Onion', action: 'Harvest before rain', timing: 'Today-Tomorrow', priority: 'Critical' as const },
];

// ─── Crop Doctor Types ─────────────────────────
export interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  crop: string;
  description: string;
  organicRemedy: string;
  chemicalRemedy: string;
  withdrawalPeriod: string;
  prevention: string[];
}

export const mockDiagnoses: DiagnosisResult[] = [
  {
    disease: 'Late Blight',
    confidence: 94.2,
    severity: 'high',
    crop: 'Potato / Tomato',
    description: 'Water-soaked lesions that turn brown/black with white mold on undersides.',
    organicRemedy: 'Copper-based fungicide (Bordeaux mixture 1%). Remove infected parts.',
    chemicalRemedy: 'Mancozeb 75% WP @ 2.5g/L spray at 7-day intervals.',
    withdrawalPeriod: '7-14 days before harvest',
    prevention: ['Use disease-free seed', 'Avoid overhead irrigation', 'Rotate crops every 2-3 years', 'Plant resistant varieties'],
  },
  {
    disease: 'Powdery Mildew',
    confidence: 89.7,
    severity: 'medium',
    crop: 'Wheat / Grapes',
    description: 'White powdery patches on leaves. Reduces photosynthesis and yield.',
    organicRemedy: 'Neem oil spray (5ml/L) or milk spray (1:10).',
    chemicalRemedy: 'Sulfur 80% WP @ 3g/L at first symptom.',
    withdrawalPeriod: '5-7 days before harvest',
    prevention: ['Good air circulation', 'Avoid excess nitrogen', 'Water at base', 'Remove infected leaves'],
  },
];

// ─── Chat Types ─────────────────────────
export interface ChatMessage {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatContact {
  id: number;
  name: string;
  avatar: string;
  role: 'farmer' | 'buyer';
  location: string;
  online: boolean;
  verified: boolean;
  rating: number;
  unread: number;
  lastMessage: string;
  lastTime: string;
  product?: string;
  messages: ChatMessage[];
}

export const mockContacts: ChatContact[] = [
  {
    id: 1, name: 'Rajesh Kumar', avatar: '👨‍🌾', role: 'farmer', location: 'Punjab',
    online: true, verified: true, rating: 4.8, unread: 2,
    lastMessage: 'I can offer 500kg at ₹82/kg for bulk', lastTime: '2m ago',
    product: 'Organic Basmati Rice',
    messages: [
      { id: 1, text: 'Hello! I saw your listing for Organic Basmati Rice', sender: 'me', time: '10:30 AM', status: 'read' },
      { id: 2, text: 'Yes, freshly harvested from our organic farms 🌾', sender: 'them', time: '10:32 AM', status: 'read' },
      { id: 3, text: "What's your best price for 500kg?", sender: 'me', time: '10:33 AM', status: 'read' },
      { id: 4, text: 'I can offer 500kg at ₹82/kg for bulk', sender: 'them', time: '10:35 AM', status: 'read' },
    ],
  },
  {
    id: 2, name: 'Priya Deshmukh', avatar: '👩‍🌾', role: 'farmer', location: 'Ratnagiri',
    online: true, verified: true, rating: 4.9, unread: 0,
    lastMessage: 'The mangoes are Grade A Alphonso ✨', lastTime: '1h ago',
    product: 'Alphonso Mangoes',
    messages: [
      { id: 1, text: 'Hi! Are the Alphonso mangoes available?', sender: 'me', time: '9:00 AM', status: 'read' },
      { id: 2, text: '200 dozen ready for dispatch 🥭', sender: 'them', time: '9:05 AM', status: 'read' },
      { id: 3, text: 'The mangoes are Grade A Alphonso ✨', sender: 'them', time: '9:06 AM', status: 'read' },
    ],
  },
  {
    id: 3, name: 'Metro Fresh Mart', avatar: '🏪', role: 'buyer', location: 'Mumbai',
    online: false, verified: true, rating: 4.6, unread: 1,
    lastMessage: 'We need 2 tons of tomatoes weekly', lastTime: '45m ago',
    product: 'Bulk Order Request',
    messages: [
      { id: 1, text: "We're looking for a reliable tomato supplier", sender: 'them', time: 'Yesterday', status: 'read' },
      { id: 2, text: 'We can supply 2 tons weekly from Nashik', sender: 'me', time: 'Yesterday', status: 'read' },
      { id: 3, text: 'We need 2 tons of tomatoes weekly', sender: 'them', time: '11:00 AM', status: 'delivered' },
    ],
  },
  {
    id: 4, name: 'Savita Devi', avatar: '👩‍🌾', role: 'farmer', location: 'Erode, TN',
    online: false, verified: false, rating: 4.8, unread: 0,
    lastMessage: 'Turmeric is sun-dried and ready', lastTime: '3h ago',
    product: 'Organic Turmeric',
    messages: [
      { id: 1, text: "I'd like to order turmeric", sender: 'me', time: '8:00 AM', status: 'read' },
      { id: 2, text: 'Turmeric is sun-dried and ready', sender: 'them', time: '8:30 AM', status: 'read' },
    ],
  },
];

export const chatAutoReplies = [
  'That sounds good! Let me check and get back.',
  'Sure, we can arrange that. When do you need delivery?',
  "Let me discuss with my team and confirm.",
  "Great! I'll prepare the shipment right away 🚛",
  'The quality is guaranteed. You\'ll love it! 🌿',
];

// ─── Filter logic ─────────────────────────
export function filterAndSortListings(
  items: Listing[],
  opts: {
    category: Category;
    query: string;
    sortBy: SortKey;
    organicOnly?: boolean;
    verifiedOnly?: boolean;
  }
): Listing[] {
  let result = items.filter((l) => {
    const matchCat = opts.category === 'all' || l.category === opts.category;
    const q = opts.query.toLowerCase();
    const matchQ = !q || l.name.toLowerCase().includes(q) || l.farmer.toLowerCase().includes(q) || l.location.toLowerCase().includes(q);
    const matchOrganic = !opts.organicOnly || l.organic;
    const matchVerified = !opts.verifiedOnly || l.verified;
    return matchCat && matchQ && matchOrganic && matchVerified;
  });

  switch (opts.sortBy) {
    case 'price-low': result.sort((a, b) => a.price - b.price); break;
    case 'price-high': result.sort((a, b) => b.price - a.price); break;
    case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    case 'freshness': result.sort((a, b) => a.freshnessHours - b.freshnessHours); break;
    case 'distance': result.sort((a, b) => a.distance - b.distance); break;
    default: result.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0)); break;
  }
  return result;
}

// ─── CSV Dataset Parsing ─────────────────────────
const cropImage: Record<string, string> = {
  Rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
  Wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
  Tomato: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=300&fit=crop',
  Potato: 'https://images.unsplash.com/photo-1518977676601-b53f82ber87?w=400&h=300&fit=crop',
  Onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop',
  Soybean: 'https://images.unsplash.com/photo-1599420186946-7a46f5425c3a?w=400&h=300&fit=crop',
  Mustard: 'https://images.unsplash.com/photo-1591379012369-05af4e44ef67?w=400&h=300&fit=crop',
  Garlic: 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0a24a?w=400&h=300&fit=crop',
  Chana: 'https://images.unsplash.com/photo-1612257416648-ee7a6c533b4f?w=400&h=300&fit=crop',
};

const csvCategoryMap: Record<string, Category> = {
  Grain: 'grains', Vegetable: 'vegetables', Oilseed: 'spices', Pulse: 'grains',
};

const locationToState: Record<string, string> = {
  Delhi: 'Delhi', Lucknow: 'Uttar Pradesh', Bhopal: 'Madhya Pradesh',
  Jaipur: 'Rajasthan', Nagpur: 'Maharashtra', Indore: 'Madhya Pradesh',
};

export interface CSVRow {
  itemId: string; farmerName: string; cropName: string; category: string;
  quantityAvailable: number; unit: string; pricePerUnit: number;
  currency: string; marketplaceLocation: string; isAvailable: boolean; listedDate: string;
}

export function parseCSV(csvText: string): CSVRow[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].replace(/\r/g, '').split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.replace(/\r/g, '').split(',').map((v) => v.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = values[i] || ''; });
    return {
      itemId: row.itemId, farmerName: row.farmerName, cropName: row.cropName,
      category: row.category, quantityAvailable: parseInt(row.quantityAvailable) || 0,
      unit: row.unit, pricePerUnit: parseInt(row.pricePerUnit) || 0,
      currency: row.currency, marketplaceLocation: row.marketplaceLocation,
      isAvailable: row.isAvailable === 'True', listedDate: row.listedDate,
    };
  });
}

export function csvToListings(rows: CSVRow[]): Listing[] {
  return rows.filter((r) => r.isAvailable).map((row, i) => {
    const price = row.pricePerUnit;
    const markup = 1.1 + (((i * 7 + 3) % 20) / 100);
    const oldPrice = Math.round(price * markup);
    const rating = parseFloat((4.0 + ((i * 3) % 10) / 10).toFixed(1));
    const reviews = 20 + ((i * 17 + 5) % 400);
    const distance = 5 + ((i * 13 + 7) % 300);
    const listed = new Date(row.listedDate);
    const now = new Date();
    const daysDiff = Math.max(1, Math.floor((now.getTime() - listed.getTime()) / 86400000));
    const freshnessHours = daysDiff * 24;
    const freshness = daysDiff <= 1 ? 'Picked today' : daysDiff <= 3 ? `Harvested ${daysDiff} days ago` : daysDiff <= 7 ? 'This week' : `Listed ${daysDiff} days ago`;
    const organic = (i * 3 + 1) % 5 < 2;
    const verified = (i * 7 + 2) % 3 !== 0;
    const trending = (i * 11 + 3) % 7 === 0;
    const unitLabel = row.unit === 'Qt' ? '/quintal' : `/${row.unit}`;
    return {
      id: i + 1000, name: `${organic ? 'Organic ' : ''}${row.cropName}`,
      farmer: row.farmerName, location: row.marketplaceLocation,
      state: locationToState[row.marketplaceLocation] || row.marketplaceLocation,
      distance, price, unit: unitLabel, oldPrice, rating, reviews,
      image: cropImage[row.cropName] || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      category: csvCategoryMap[row.category] || 'vegetables',
      organic, verified, freshness, freshnessHours,
      available: `${row.quantityAvailable} ${row.unit}`, trending, minOrder: row.unit === 'Qt' ? 1 : 5,
    };
  });
}
