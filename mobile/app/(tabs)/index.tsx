import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Dimensions, StatusBar, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const stats = [
  { emoji: '👥', value: '50K+', label: 'Active Farmers', color: Colors.green[500] },
  { emoji: '📈', value: '40%', label: 'More Income', color: Colors.amber[500] },
  { emoji: '🌱', value: '2M+', label: 'Crops Analyzed', color: Colors.green[500] },
];

const features = [
  { emoji: '🛒', title: 'Direct Marketplace', desc: 'Sell directly to retailers & consumers', color: Colors.green[500], bg: Colors.green[50], tab: 'marketplace' },
  { emoji: '🔬', title: 'Crop Doctor', desc: 'AI-powered disease detection', color: Colors.amber[500], bg: Colors.amber[50], tab: 'crop-doctor' },
  { emoji: '🌤️', title: 'Smart Advisory', desc: 'Weather & soil intelligence', color: Colors.sky[500], bg: Colors.sky[50], tab: 'advisory' },
  { emoji: '📦', title: 'Traceability', desc: 'QR-based farm-to-fork tracking', color: Colors.purple[500], bg: Colors.purple[50], tab: 'index' },
];

const additionalFeatures = [
  { emoji: '📶', title: 'Offline-First', desc: 'Works without internet' },
  { emoji: '🌐', title: 'Multilingual', desc: '12+ Indian languages' },
  { emoji: '🔒', title: 'Secure Payments', desc: 'UPI-integrated escrow' },
  { emoji: '⚡', title: 'Lite Mode', desc: 'Low-bandwidth optimized' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>

        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadge}>
              <View style={styles.heroBadgeDot} />
              <Text style={styles.heroBadgeText}>🌱 Empowering 50,000+ Farmers</Text>
            </View>

            <Text style={styles.heroTitle}>
              From <Text style={styles.heroTitleGreen}>Farm</Text> to{' '}
              <Text style={styles.heroTitleAmber}>Fork</Text>
            </Text>
            <Text style={styles.heroSubtitle}>Intelligence at Every Step</Text>
            <Text style={styles.heroDesc}>
              Eliminate middlemen. Boost yields with AI-driven crop diagnostics.
              Real-time weather advisory and full produce traceability.
            </Text>

            <View style={styles.heroCTARow}>
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.8}
                onPress={() => router.push('/(tabs)/marketplace')}
              >
                <Text style={styles.primaryButtonText}>🛒 Explore Marketplace</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.8}
                onPress={() => router.push('/(tabs)/crop-doctor')}
              >
                <Text style={styles.secondaryButtonText}>🔬 Try Crop Doctor</Text>
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              {stats.map((stat) => (
                <View key={stat.label} style={styles.statItem}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + '30' }]}>
                    <Text style={{ fontSize: 18 }}>{stat.emoji}</Text>
                  </View>
                  <View>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>⚡ The Agri-Smart Stack</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Four Pillars of{'\n'}
            <Text style={styles.gradientText}>Smart Agriculture</Text>
          </Text>
          <Text style={styles.sectionDesc}>
            An integrated ecosystem for the people who feed our world.
          </Text>

          <View style={styles.featureGrid}>
            {features.map((feature) => (
              <TouchableOpacity
                key={feature.title}
                style={[styles.featureCard, { backgroundColor: feature.bg }]}
                activeOpacity={0.7}
                onPress={() => {
                  if (feature.tab !== 'index') {
                    router.push(`/(tabs)/${feature.tab}` as any);
                  }
                }}
              >
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <Text style={{ fontSize: 28 }}>{feature.emoji}</Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Features */}
        <View style={[styles.section, { backgroundColor: Colors.slate[50] }]}>
          <Text style={styles.sectionTitleSmall}>Built for Rural Reality</Text>
          <View style={styles.miniFeatureGrid}>
            {additionalFeatures.map((f) => (
              <View key={f.title} style={styles.miniFeatureCard}>
                <Text style={{ fontSize: 24, marginBottom: 8 }}>{f.emoji}</Text>
                <Text style={styles.miniFeatureTitle}>{f.title}</Text>
                <Text style={styles.miniFeatureDesc}>{f.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Traceability Overview */}
        <View style={styles.section}>
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>📍 Traceability Map</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Seed to <Text style={styles.gradientText}>Plate</Text> Transparency
          </Text>

          <View style={styles.traceTimeline}>
            {[
              { step: 1, title: 'Farm Origin', emoji: '📍', color: Colors.green[500] },
              { step: 2, title: 'Harvest Date', emoji: '📅', color: Colors.amber[500] },
              { step: 3, title: 'Quality Check', emoji: '🛡️', color: Colors.blue[500] },
              { step: 4, title: 'Transit', emoji: '🚛', color: Colors.purple[500] },
              { step: 5, title: 'Delivery', emoji: '📦', color: Colors.green[600] },
            ].map((item, i) => (
              <View key={item.step} style={styles.traceStep}>
                <View style={[styles.traceStepDot, { backgroundColor: item.color }]}>
                  <Text style={{ fontSize: 18 }}>{item.emoji}</Text>
                </View>
                <Text style={styles.traceStepTitle}>{item.title}</Text>
                {i < 4 && <View style={styles.traceConnector} />}
              </View>
            ))}
          </View>
        </View>

        {/* CTA Footer */}
        <View style={styles.ctaFooter}>
          <Text style={styles.ctaTitle}>Ready to Transform Your Farming?</Text>
          <Text style={styles.ctaDesc}>
            Join 50,000+ farmers already using Agri-Smart.
          </Text>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
            <Text style={styles.ctaButtonText}>🚀 Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            Made with ❤️ for Indian Farmers{'\n'}© 2026 Agri-Smart
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Hero
  hero: {
    backgroundColor: Colors.green[900],
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroOverlay: {
    paddingHorizontal: 24,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green[500] + '30',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.green[400] + '40',
  },
  heroBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.green[400],
    marginRight: 8,
  },
  heroBadgeText: {
    color: Colors.green[200],
    fontSize: 13,
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    lineHeight: 42,
    marginBottom: 4,
  },
  heroTitleGreen: {
    color: Colors.green[300],
  },
  heroTitleAmber: {
    color: Colors.amber[300],
  },
  heroSubtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 16,
  },
  heroDesc: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.green[100] + 'cc',
    marginBottom: 24,
    maxWidth: 360,
  },
  heroCTARow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: Colors.green[300],
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: Colors.green[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: Colors.green[900],
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
  },
  secondaryButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.green[200] + '99',
    fontWeight: '500',
  },

  // Section
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionBadge: {
    backgroundColor: Colors.green[100],
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  sectionBadgeText: {
    color: Colors.green[700],
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.slate[900],
    marginBottom: 8,
    lineHeight: 36,
  },
  sectionTitleSmall: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.slate[800],
    marginBottom: 16,
    textAlign: 'center',
  },
  gradientText: {
    color: Colors.green[600],
  },
  sectionDesc: {
    fontSize: 15,
    color: Colors.slate[500],
    lineHeight: 22,
    marginBottom: 24,
  },

  // Feature Grid
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: (width - 52) / 2,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.slate[200],
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.slate[900],
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: Colors.slate[600],
    lineHeight: 17,
  },

  // Mini Features
  miniFeatureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  miniFeatureCard: {
    width: (width - 50) / 2,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.slate[100],
    alignItems: 'center',
  },
  miniFeatureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.slate[800],
    marginBottom: 4,
    textAlign: 'center',
  },
  miniFeatureDesc: {
    fontSize: 11,
    color: Colors.slate[500],
    textAlign: 'center',
    lineHeight: 16,
  },

  // Traceability
  traceTimeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  traceStep: {
    alignItems: 'center',
    flex: 1,
  },
  traceStepDot: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  traceStepTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.slate[700],
    textAlign: 'center',
  },
  traceConnector: {
    position: 'absolute',
    top: 24,
    right: -12,
    width: 24,
    height: 2,
    backgroundColor: Colors.slate[200],
  },

  // CTA Footer
  ctaFooter: {
    backgroundColor: Colors.green[900],
    padding: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaDesc: {
    fontSize: 14,
    color: Colors.green[200],
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: Colors.green[400],
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 24,
    shadowColor: Colors.green[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaButtonText: {
    color: Colors.green[900],
    fontWeight: '700',
    fontSize: 16,
  },
  footerText: {
    color: Colors.green[400] + '80',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 18,
  },
});
