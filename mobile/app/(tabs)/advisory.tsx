import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, Platform, Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
import {
  weatherData, soilData, advisoryAlerts, recommendations,
} from '../../constants/Data';

const { width } = Dimensions.get('window');

const alertColors = {
  warning: { bg: Colors.amber[50], border: Colors.amber[200] },
  success: { bg: Colors.green[50], border: Colors.green[200] },
  info: { bg: Colors.blue[50], border: Colors.blue[200] },
};

const priorityColors: Record<string, { bg: string; text: string }> = {
  Critical: { bg: Colors.red[100], text: Colors.red[600] },
  High: { bg: Colors.amber[100], text: Colors.amber[700] },
  Medium: { bg: Colors.blue[100], text: Colors.blue[600] },
  Low: { bg: Colors.green[100], text: Colors.green[700] },
};

const soilBars = [
  { label: 'pH Level', value: soilData.ph, max: 14, color: Colors.green[500] },
  { label: 'Nitrogen (N)', value: soilData.nitrogen, max: 100, color: Colors.blue[500] },
  { label: 'Phosphorus (P)', value: soilData.phosphorus, max: 100, color: Colors.amber[500] },
  { label: 'Potassium (K)', value: soilData.potassium, max: 100, color: Colors.purple[500] },
  { label: 'Organic Matter', value: soilData.organicMatter, max: 10, color: '#92400e' },
  { label: 'Moisture', value: soilData.moisture, max: 100, color: Colors.sky[500] },
];

export default function AdvisoryScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌤️ Smart Advisory</Text>
        <Text style={styles.headerDesc}>Weather & Soil Intelligence</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <Text style={styles.weatherLocation}>📍 {weatherData.location}</Text>
          <View style={styles.weatherMainRow}>
            <View>
              <Text style={styles.tempText}>{weatherData.temp}°</Text>
              <Text style={styles.conditionText}>{weatherData.condition}</Text>
            </View>
            <View style={styles.weatherMeta}>
              <Text style={styles.weatherMetaText}>💧 {weatherData.humidity}%</Text>
              <Text style={styles.weatherMetaText}>💨 {weatherData.wind} km/h</Text>
            </View>
          </View>

          {/* Forecast */}
          <View style={styles.forecastRow}>
            {weatherData.forecast.map((d) => (
              <View key={d.day} style={styles.forecastDay}>
                <Text style={styles.forecastDayLabel}>{d.day}</Text>
                <Text style={{ fontSize: 22, marginVertical: 4 }}>{d.emoji}</Text>
                <Text style={styles.forecastTemp}>{d.temp}°</Text>
                <Text style={styles.forecastRain}>{d.rain}% rain</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Soil Analysis */}
        <View style={styles.soilCard}>
          <Text style={styles.cardTitle}>🌱 Soil Analysis</Text>
          {soilBars.map((item) => (
            <View key={item.label} style={styles.soilRow}>
              <View style={styles.soilLabelRow}>
                <Text style={styles.soilLabel}>{item.label}</Text>
                <Text style={styles.soilValue}>
                  {item.value}{item.max === 14 ? '' : '%'}
                </Text>
              </View>
              <View style={styles.soilBarBg}>
                <View
                  style={[
                    styles.soilBarFill,
                    {
                      backgroundColor: item.color,
                      width: `${(item.value / item.max) * 100}%`,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Alerts */}
        <Text style={styles.sectionTitle}>⚡ Active Alerts</Text>
        {advisoryAlerts.map((alert, i) => {
          const colors = alertColors[alert.type];
          return (
            <View key={i} style={[styles.alertCard, { backgroundColor: colors.bg, borderColor: colors.border }]}>
              <Text style={{ fontSize: 24, marginBottom: 8 }}>{alert.emoji}</Text>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDesc}>{alert.desc}</Text>
            </View>
          );
        })}

        {/* Action Plan */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>📅 Weekly Action Plan</Text>
        <View style={styles.actionPlanCard}>
          {recommendations.map((r, i) => (
            <View
              key={i}
              style={[styles.actionRow, i < recommendations.length - 1 && styles.actionRowBorder]}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.actionCrop}>{r.crop}</Text>
                <Text style={styles.actionText}>{r.action}</Text>
                <Text style={styles.actionTiming}>🕐 {r.timing}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: priorityColors[r.priority].bg }]}>
                <Text style={[styles.priorityText, { color: priorityColors[r.priority].text }]}>
                  {r.priority}
                </Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  header: {
    backgroundColor: Colors.sky[600],
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 26, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  headerDesc: { fontSize: 14, color: Colors.sky[100], fontWeight: '500' },

  scrollContent: { padding: 20, paddingBottom: 40 },

  // Weather
  weatherCard: {
    backgroundColor: Colors.sky[700],
    borderRadius: 24, padding: 20, marginBottom: 20,
    shadowColor: Colors.blue[700],
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12,
    elevation: 6,
  },
  weatherLocation: { color: Colors.sky[200], fontSize: 13, marginBottom: 12, fontWeight: '500' },
  weatherMainRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 },
  tempText: { fontSize: 56, fontWeight: '800', color: Colors.white },
  conditionText: { fontSize: 15, color: Colors.sky[200] },
  weatherMeta: { gap: 8, paddingBottom: 10 },
  weatherMetaText: { color: Colors.white, fontSize: 14 },

  forecastRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  forecastDay: {
    flex: 1, alignItems: 'center', padding: 10,
    borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.12)',
  },
  forecastDayLabel: { fontSize: 11, color: Colors.sky[200], marginBottom: 2 },
  forecastTemp: { fontSize: 14, fontWeight: '700', color: Colors.white },
  forecastRain: { fontSize: 10, color: Colors.sky[300] },

  // Soil
  soilCard: {
    backgroundColor: Colors.white, borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: Colors.slate[200], marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.slate[900], marginBottom: 16 },
  soilRow: { marginBottom: 14 },
  soilLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  soilLabel: { fontSize: 12, fontWeight: '600', color: Colors.slate[600] },
  soilValue: { fontSize: 12, fontWeight: '700', color: Colors.slate[800] },
  soilBarBg: { height: 8, backgroundColor: Colors.slate[100], borderRadius: 4, overflow: 'hidden' },
  soilBarFill: { height: 8, borderRadius: 4 },

  // Alerts
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.slate[800], marginBottom: 12 },
  alertCard: {
    borderRadius: 18, padding: 16, marginBottom: 10,
    borderWidth: 1,
  },
  alertTitle: { fontSize: 14, fontWeight: '700', color: Colors.slate[800], marginBottom: 4 },
  alertDesc: { fontSize: 12, color: Colors.slate[600], lineHeight: 18 },

  // Action Plan
  actionPlanCard: {
    backgroundColor: Colors.white, borderRadius: 20, overflow: 'hidden',
    borderWidth: 1, borderColor: Colors.slate[200],
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6,
    elevation: 2,
  },
  actionRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  actionRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.slate[50] },
  actionCrop: { fontSize: 14, fontWeight: '700', color: Colors.slate[800], marginBottom: 2 },
  actionText: { fontSize: 12, color: Colors.slate[600], lineHeight: 18, marginBottom: 4 },
  actionTiming: { fontSize: 11, color: Colors.slate[400] },
  priorityBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  priorityText: { fontSize: 10, fontWeight: '700' },
});
