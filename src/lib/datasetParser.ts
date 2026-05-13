/**
 * Parses agri_dataset_200.csv and maps it to the Listing type
 * used by the MarketplaceSection component.
 */

// Real crop image URLs (Unsplash)
const cropImage: Record<string, string> = {
  Rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
  Wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
  Tomato: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=300&fit=crop",
  Potato: "https://images.unsplash.com/photo-1518977676601-b53f82ber87?w=400&h=300&fit=crop",
  Onion: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop",
  Soybean: "https://images.unsplash.com/photo-1599420186946-7a46f5425c3a?w=400&h=300&fit=crop",
  Mustard: "https://images.unsplash.com/photo-1591379012369-05af4e44ef67?w=400&h=300&fit=crop",
  Garlic: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0a24a?w=400&h=300&fit=crop",
  Chana: "https://images.unsplash.com/photo-1612257416648-ee7a6c533b4f?w=400&h=300&fit=crop",
};

// Map CSV category → app category
type AppCategory = "grains" | "vegetables" | "spices" | "dairy" | "fruits";

const categoryMap: Record<string, AppCategory> = {
  Grain: "grains",
  Vegetable: "vegetables",
  Oilseed: "spices",    // oilseeds mapped to spices tab
  Pulse: "grains",      // pulses mapped to grains tab
};

// State lookup for enrichment
const locationToState: Record<string, string> = {
  Delhi: "Delhi",
  Lucknow: "Uttar Pradesh",
  Bhopal: "Madhya Pradesh",
  Jaipur: "Rajasthan",
  Nagpur: "Maharashtra",
  Indore: "Madhya Pradesh",
};

export interface CSVRow {
  itemId: string;
  farmerName: string;
  cropName: string;
  category: string;
  quantityAvailable: number;
  unit: string;
  pricePerUnit: number;
  currency: string;
  marketplaceLocation: string;
  isAvailable: boolean;
  listedDate: string;
}

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
  category: AppCategory;
  organic: boolean;
  verified: boolean;
  freshness: string;
  freshnessHours: number;
  available: string;
  trending: boolean;
  minOrder: number;
}

/** Parse CSV string → array of typed rows */
export function parseCSV(csvText: string): CSVRow[] {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || "";
    });
    return {
      itemId: row.itemId,
      farmerName: row.farmerName,
      cropName: row.cropName,
      category: row.category,
      quantityAvailable: parseInt(row.quantityAvailable) || 0,
      unit: row.unit,
      pricePerUnit: parseInt(row.pricePerUnit) || 0,
      currency: row.currency,
      marketplaceLocation: row.marketplaceLocation,
      isAvailable: row.isAvailable === "True",
      listedDate: row.listedDate,
    };
  });
}

/** Convert CSV rows → Listing[] for the Marketplace */
export function csvToListings(rows: CSVRow[]): Listing[] {
  return rows
    .filter((r) => r.isAvailable)
    .map((row, i) => {
      const price = row.pricePerUnit;
      // Generate a pseudo-random but deterministic "old price" (10-30% more)
      const markup = 1.1 + (((i * 7 + 3) % 20) / 100);
      const oldPrice = Math.round(price * markup);

      // Generate pseudo-random but consistent rating/reviews
      const rating = 4.0 + ((i * 3) % 10) / 10;
      const reviews = 20 + ((i * 17 + 5) % 400);
      const distance = 5 + ((i * 13 + 7) % 300);

      // Freshness based on date diff
      const listed = new Date(row.listedDate);
      const now = new Date();
      const daysDiff = Math.max(1, Math.floor((now.getTime() - listed.getTime()) / 86400000));
      const freshnessHours = daysDiff * 24;
      const freshness =
        daysDiff <= 1
          ? "Picked today"
          : daysDiff <= 3
          ? `Harvested ${daysDiff} days ago`
          : daysDiff <= 7
          ? "This week"
          : `Listed ${daysDiff} days ago`;

      // Organic: deterministic from index (roughly 40% organic)
      const organic = (i * 3 + 1) % 5 < 2;
      const verified = (i * 7 + 2) % 3 !== 0;
      const trending = (i * 11 + 3) % 7 === 0;

      const unitLabel = row.unit === "Qt" ? "/quintal" : `/${row.unit}`;

      return {
        id: i + 1000, // offset to avoid collision with mock data
        name: `${organic ? "Organic " : ""}${row.cropName}`,
        farmer: row.farmerName,
        location: row.marketplaceLocation,
        state: locationToState[row.marketplaceLocation] || row.marketplaceLocation,
        distance,
        price,
        unit: unitLabel,
        oldPrice,
        rating: parseFloat(rating.toFixed(1)),
        reviews,
        image: cropImage[row.cropName] || "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
        category: categoryMap[row.category] || "vegetables",
        organic,
        verified,
        freshness,
        freshnessHours,
        available: `${row.quantityAvailable} ${row.unit}`,
        trending,
        minOrder: row.unit === "Qt" ? 1 : 5,
      };
    });
}
