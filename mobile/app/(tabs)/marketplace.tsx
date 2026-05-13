import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Dimensions, Platform, FlatList, Image,
} from 'react-native';
import Colors from '../../constants/Colors';
import {
  listings, categories, sortOptions, filterAndSortListings,
  parseCSV, csvToListings,
  type Category, type SortKey, type Listing,
} from '../../constants/Data';
import { AGRI_DATASET_CSV } from '../../constants/DatasetCSV';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

// Parse dataset at module level (runs once)
const datasetListings = csvToListings(parseCSV(AGRI_DATASET_CSV));
const allListings: Listing[] = [...listings, ...datasetListings];

export default function MarketplaceScreen() {
  const [activeCat, setActiveCat] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('relevance');
  const [favs, setFavs] = useState<number[]>([]);
  const [showSort, setShowSort] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = useMemo(
    () => filterAndSortListings(allListings, { category: activeCat, query, sortBy, organicOnly, verifiedOnly }),
    [activeCat, query, sortBy, organicOnly, verifiedOnly]
  );

  const toggleFav = (id: number) =>
    setFavs((p) => (p.includes(id) ? p.filter((f) => f !== id) : [...p, id]));

  const renderProduct = ({ item }: { item: Listing }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.85}
    >
      {/* Image Area */}
      <View style={styles.productImageArea}>
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
        {item.trending && (
          <View style={styles.trendingBadge}>
            <Text style={styles.trendingText}>📈 Trending</Text>
          </View>
        )}
        {item.organic && (
          <View style={styles.organicBadge}>
            <Text style={styles.organicText}>✅ Organic</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favButton}
          onPress={() => toggleFav(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={{ fontSize: 16 }}>{favs.includes(item.id) ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.ratingRow}>
            <Text style={{ fontSize: 11 }}>⭐</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <Text style={styles.farmerText} numberOfLines={1}>
          📍 {item.farmer} • {item.location}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>🕐 {item.freshness}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaBlue}>📡 {item.distance} km</Text>
          {item.verified && <Text style={styles.metaGreen}>✅ Verified</Text>}
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>₹{item.price}<Text style={styles.unit}>{item.unit}</Text></Text>
            <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
          </View>
          <TouchableOpacity style={styles.orderButton} activeOpacity={0.7}>
            <Text style={styles.orderButtonText}>🛒 Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fresh from the Farm</Text>
        <Text style={styles.headerDesc}>{allListings.length} products • No middlemen</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search crops, farmers..."
            placeholderTextColor={Colors.slate[400]}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <TouchableOpacity
          style={[styles.sortButton, showSort && styles.sortButtonActive]}
          onPress={() => setShowSort(!showSort)}
        >
          <Text style={{ fontSize: 16 }}>⬍</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Dropdown */}
      {showSort && (
        <View style={styles.sortDropdown}>
          {sortOptions.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[styles.sortOption, sortBy === opt.key && styles.sortOptionActive]}
              onPress={() => { setSortBy(opt.key); setShowSort(false); }}
            >
              <Text style={[styles.sortOptionText, sortBy === opt.key && styles.sortOptionTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Filter Toggles */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, organicOnly && styles.filterChipActive]}
          onPress={() => setOrganicOnly(!organicOnly)}
        >
          <Text style={[styles.filterChipText, organicOnly && styles.filterChipTextActive]}>
            🌿 Organic Only
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, verifiedOnly && styles.filterChipActive]}
          onPress={() => setVerifiedOnly(!verifiedOnly)}
        >
          <Text style={[styles.filterChipText, verifiedOnly && styles.filterChipTextActive]}>
            ✅ Verified Only
          </Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll} contentContainerStyle={styles.categoriesContent}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c.key}
            style={[styles.categoryChip, activeCat === c.key && styles.categoryChipActive]}
            onPress={() => setActiveCat(c.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.categoryEmoji}>{c.emoji}</Text>
            <Text style={[styles.categoryLabel, activeCat === c.key && styles.categoryLabelActive]}>
              {c.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Result Count */}
      <Text style={styles.resultCount}>
        Showing <Text style={{ fontWeight: '700', color: Colors.slate[700] }}>{filtered.length}</Text> products
      </Text>

      {/* Products Grid */}
      <FlatList
        data={filtered}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>🍃</Text>
            <Text style={styles.emptyText}>No products match your filters.</Text>
            <TouchableOpacity onPress={() => { setActiveCat('all'); setQuery(''); setOrganicOnly(false); setVerifiedOnly(false); }}>
              <Text style={styles.resetText}>Reset all filters</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  header: {
    backgroundColor: Colors.green[800],
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 26, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  headerDesc: { fontSize: 14, color: Colors.green[200], fontWeight: '500' },

  searchRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 16, gap: 10 },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, borderRadius: 16,
    paddingHorizontal: 14, height: 48,
    borderWidth: 1, borderColor: Colors.slate[200],
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: Colors.slate[800] },
  sortButton: {
    width: 48, height: 48, borderRadius: 16, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.slate[200],
  },
  sortButtonActive: { backgroundColor: Colors.green[600], borderColor: Colors.green[600] },

  sortDropdown: {
    marginHorizontal: 16, marginTop: 8, backgroundColor: Colors.white,
    borderRadius: 16, borderWidth: 1, borderColor: Colors.slate[200],
    overflow: 'hidden', elevation: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10,
  },
  sortOption: { paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.slate[50] },
  sortOptionActive: { backgroundColor: Colors.green[50] },
  sortOptionText: { fontSize: 14, color: Colors.slate[600] },
  sortOptionTextActive: { color: Colors.green[700], fontWeight: '700' },

  filterRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 12, gap: 8 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.slate[200],
  },
  filterChipActive: { backgroundColor: Colors.green[600], borderColor: Colors.green[600] },
  filterChipText: { fontSize: 12, fontWeight: '600', color: Colors.slate[600] },
  filterChipTextActive: { color: Colors.white },

  categoriesScroll: { marginTop: 12 },
  categoriesContent: { paddingHorizontal: 16, gap: 8 },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.slate[200],
  },
  categoryChipActive: { backgroundColor: Colors.green[600], borderColor: Colors.green[600] },
  categoryEmoji: { fontSize: 14 },
  categoryLabel: { fontSize: 13, fontWeight: '600', color: Colors.slate[600] },
  categoryLabelActive: { color: Colors.white },

  resultCount: { paddingHorizontal: 20, marginTop: 14, marginBottom: 8, fontSize: 13, color: Colors.slate[500] },

  gridRow: { paddingHorizontal: 16, gap: 12 },
  gridContent: { paddingBottom: 32 },

  productCard: {
    width: CARD_WIDTH, backgroundColor: Colors.white, borderRadius: 18,
    borderWidth: 1, borderColor: Colors.slate[100], overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8,
    elevation: 2,
  },
  productImageArea: {
    height: 110, backgroundColor: Colors.green[50],
    alignItems: 'center', justifyContent: 'center',
  },
  productImage: { width: '100%' as any, height: '100%' as any },
  trendingBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: Colors.amber[500], paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 10,
  },
  trendingText: { color: Colors.white, fontSize: 9, fontWeight: '700' },
  organicBadge: {
    position: 'absolute', top: 8, right: 36,
    backgroundColor: Colors.green[500], paddingHorizontal: 6, paddingVertical: 3,
    borderRadius: 10,
  },
  organicText: { color: Colors.white, fontSize: 9, fontWeight: '700' },
  favButton: {
    position: 'absolute', top: 8, right: 8,
    width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center', justifyContent: 'center',
  },

  productInfo: { padding: 12 },
  productHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  productName: { fontSize: 13, fontWeight: '700', color: Colors.slate[900], flex: 1, marginRight: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingText: { fontSize: 11, fontWeight: '600', color: Colors.slate[700] },

  farmerText: { fontSize: 11, color: Colors.slate[500], marginBottom: 6 },

  metaRow: { flexDirection: 'row', gap: 8, marginBottom: 3 },
  metaText: { fontSize: 10, color: Colors.green[600] },
  metaBlue: { fontSize: 10, color: Colors.blue[500] },
  metaGreen: { fontSize: 10, color: Colors.green[600] },

  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 },
  price: { fontSize: 18, fontWeight: '800', color: Colors.green[700] },
  unit: { fontSize: 11, fontWeight: '400', color: Colors.slate[400] },
  oldPrice: { fontSize: 11, color: Colors.slate[400], textDecorationLine: 'line-through' },

  orderButton: {
    backgroundColor: Colors.green[600], paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 12,
  },
  orderButtonText: { color: Colors.white, fontSize: 11, fontWeight: '700' },

  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 16, color: Colors.slate[400], marginBottom: 8 },
  resetText: { color: Colors.green[600], fontWeight: '600', fontSize: 14 },
});
