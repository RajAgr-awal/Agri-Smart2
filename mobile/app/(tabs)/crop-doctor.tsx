import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Image, Platform, ActivityIndicator, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';
import { mockDiagnoses, type DiagnosisResult } from '../../constants/Data';

export default function CropDoctorScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const pickImage = async () => {
    const permResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permResult.granted) {
      Alert.alert('Permission needed', 'Camera roll permission is required.');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!pickerResult.canceled && pickerResult.assets[0]) {
      setSelectedImage(pickerResult.assets[0].uri);
      setResult(null);
    }
  };

  const takePhoto = async () => {
    const permResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permResult.granted) {
      Alert.alert('Permission needed', 'Camera permission is required.');
      return;
    }
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!pickerResult.canceled && pickerResult.assets[0]) {
      setSelectedImage(pickerResult.assets[0].uri);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult(mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)]);
      setAnalyzing(false);
    }, 3000);
  };

  const reset = () => {
    setSelectedImage(null);
    setResult(null);
  };

  const severityColor = {
    low: { bg: Colors.green[100], text: Colors.green[700] },
    medium: { bg: Colors.amber[100], text: Colors.amber[700] },
    high: { bg: Colors.red[100], text: Colors.red[600] },
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔬 AI Crop Doctor</Text>
        <Text style={styles.headerDesc}>Diagnose crop diseases instantly</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Upload Area */}
        {!selectedImage ? (
          <View style={styles.uploadArea}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>📸</Text>
            <Text style={styles.uploadTitle}>Upload Leaf Image</Text>
            <Text style={styles.uploadDesc}>Take a photo or choose from gallery</Text>

            <View style={styles.uploadActions}>
              <TouchableOpacity style={styles.cameraButton} onPress={takePhoto} activeOpacity={0.7}>
                <Text style={styles.cameraButtonText}>📷 Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.galleryButton} onPress={pickImage} activeOpacity={0.7}>
                <Text style={styles.galleryButtonText}>🖼️ Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.imagePreview}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} resizeMode="cover" />
            <TouchableOpacity style={styles.resetButton} onPress={reset}>
              <Text style={{ fontSize: 16 }}>🔄</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Analyze Button */}
        {selectedImage && !result && (
          <TouchableOpacity
            style={[styles.analyzeButton, analyzing && styles.analyzeButtonDisabled]}
            onPress={handleAnalyze}
            disabled={analyzing}
            activeOpacity={0.8}
          >
            {analyzing ? (
              <View style={styles.analyzeRow}>
                <ActivityIndicator color={Colors.white} size="small" />
                <Text style={styles.analyzeText}>Analyzing with AI...</Text>
              </View>
            ) : (
              <Text style={styles.analyzeText}>✨ Analyze Disease</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Results */}
        {result && (
          <View style={styles.resultsSection}>
            {/* Disease Header */}
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.diseaseName}>{result.disease}</Text>
                  <Text style={styles.cropText}>{result.crop}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.confidence}>{result.confidence}%</Text>
                  <View style={[styles.severityBadge, { backgroundColor: severityColor[result.severity].bg }]}>
                    <Text style={[styles.severityText, { color: severityColor[result.severity].text }]}>
                      {result.severity.toUpperCase()} Severity
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.diseaseDesc}>{result.description}</Text>
            </View>

            {/* Organic Remedy */}
            <View style={styles.remedyCardOrganic}>
              <Text style={styles.remedyTitle}>🌿 Organic Remedy</Text>
              <Text style={styles.remedyTextOrganic}>{result.organicRemedy}</Text>
            </View>

            {/* Chemical Remedy */}
            <View style={styles.remedyCardChemical}>
              <Text style={styles.remedyTitle}>⚠️ Chemical Remedy</Text>
              <Text style={styles.remedyTextChemical}>{result.chemicalRemedy}</Text>
              <View style={styles.withdrawalBanner}>
                <Text style={styles.withdrawalText}>
                  ⚠️ Withdrawal Period: {result.withdrawalPeriod}
                </Text>
              </View>
            </View>

            {/* Prevention */}
            <View style={styles.preventionCard}>
              <Text style={styles.remedyTitle}>✅ Prevention Tips</Text>
              {result.prevention.map((tip, i) => (
                <View key={i} style={styles.preventionItem}>
                  <Text style={styles.preventionBullet}>▸</Text>
                  <Text style={styles.preventionText}>{tip}</Text>
                </View>
              ))}
            </View>

            {/* Analyze Again */}
            <TouchableOpacity style={styles.retryButton} onPress={reset} activeOpacity={0.7}>
              <Text style={styles.retryText}>🔄 Analyze Another Image</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* How it Works */}
        <View style={styles.howItWorks}>
          <Text style={styles.howTitle}>✨ How Crop Doctor Works</Text>
          {[
            'Upload a photo of the affected leaf',
            'Our CNN model analyzes patterns',
            'Get disease ID + safe remedy',
          ].map((step, i) => (
            <View key={i} style={styles.howStep}>
              <View style={styles.howStepNum}>
                <Text style={styles.howStepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.howStepText}>{step}</Text>
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
    backgroundColor: Colors.amber[600],
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 26, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  headerDesc: { fontSize: 14, color: Colors.amber[100], fontWeight: '500' },

  scrollContent: { padding: 20, paddingBottom: 40 },

  // Upload
  uploadArea: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.slate[200],
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadTitle: { fontSize: 18, fontWeight: '700', color: Colors.slate[700], marginBottom: 4 },
  uploadDesc: { fontSize: 13, color: Colors.slate[400], marginBottom: 20 },
  uploadActions: { flexDirection: 'row', gap: 12 },
  cameraButton: {
    backgroundColor: Colors.green[600],
    paddingHorizontal: 20, paddingVertical: 14,
    borderRadius: 14,
  },
  cameraButtonText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
  galleryButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20, paddingVertical: 14,
    borderRadius: 14, borderWidth: 1.5, borderColor: Colors.green[600],
  },
  galleryButtonText: { color: Colors.green[700], fontWeight: '700', fontSize: 14 },

  // Preview
  imagePreview: {
    borderRadius: 24, overflow: 'hidden',
    marginBottom: 20, height: 240,
    backgroundColor: Colors.green[50],
  },
  previewImage: { width: '100%', height: '100%' },
  resetButton: {
    position: 'absolute', top: 12, right: 12,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
    elevation: 3,
  },

  // Analyze
  analyzeButton: {
    backgroundColor: Colors.amber[500],
    paddingVertical: 18, borderRadius: 18,
    alignItems: 'center', marginBottom: 20,
    shadowColor: Colors.amber[600],
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10,
    elevation: 5,
  },
  analyzeButtonDisabled: { opacity: 0.6 },
  analyzeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  analyzeText: { color: Colors.white, fontSize: 17, fontWeight: '700' },

  // Results
  resultsSection: { gap: 12 },
  resultCard: {
    backgroundColor: Colors.white, borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: Colors.slate[100],
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8,
    elevation: 3,
  },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  diseaseName: { fontSize: 22, fontWeight: '800', color: Colors.slate[900] },
  cropText: { fontSize: 13, color: Colors.slate[500], marginTop: 2 },
  confidence: { fontSize: 22, fontWeight: '800', color: Colors.green[600] },
  severityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginTop: 4 },
  severityText: { fontSize: 10, fontWeight: '700' },
  diseaseDesc: { fontSize: 14, color: Colors.slate[600], lineHeight: 20 },

  remedyCardOrganic: {
    backgroundColor: Colors.green[50], borderRadius: 18, padding: 18,
    borderWidth: 1, borderColor: Colors.green[200],
  },
  remedyTitle: { fontSize: 15, fontWeight: '700', color: Colors.slate[800], marginBottom: 8 },
  remedyTextOrganic: { fontSize: 13, color: Colors.green[700], lineHeight: 20 },

  remedyCardChemical: {
    backgroundColor: Colors.amber[50], borderRadius: 18, padding: 18,
    borderWidth: 1, borderColor: Colors.amber[200],
  },
  remedyTextChemical: { fontSize: 13, color: Colors.amber[700], lineHeight: 20, marginBottom: 12 },
  withdrawalBanner: {
    backgroundColor: Colors.red[50], borderRadius: 10, padding: 10,
    borderWidth: 1, borderColor: Colors.red[200],
  },
  withdrawalText: { fontSize: 12, fontWeight: '600', color: Colors.red[600] },

  preventionCard: {
    backgroundColor: Colors.white, borderRadius: 18, padding: 18,
    borderWidth: 1, borderColor: Colors.slate[100],
  },
  preventionItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  preventionBullet: { color: Colors.green[500], fontSize: 14, marginTop: 1 },
  preventionText: { fontSize: 13, color: Colors.slate[600], flex: 1, lineHeight: 19 },

  retryButton: {
    borderWidth: 1.5, borderColor: Colors.green[600],
    paddingVertical: 14, borderRadius: 16, alignItems: 'center', marginTop: 8,
  },
  retryText: { color: Colors.green[700], fontWeight: '700', fontSize: 15 },

  // How it Works
  howItWorks: {
    backgroundColor: Colors.slate[50], borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: Colors.slate[100], marginTop: 24,
  },
  howTitle: { fontSize: 16, fontWeight: '700', color: Colors.slate[800], marginBottom: 16 },
  howStep: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14 },
  howStepNum: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.green[600],
    alignItems: 'center', justifyContent: 'center',
  },
  howStepNumText: { color: Colors.white, fontSize: 12, fontWeight: '800' },
  howStepText: { fontSize: 14, color: Colors.slate[600], flex: 1, marginTop: 4 },
});
