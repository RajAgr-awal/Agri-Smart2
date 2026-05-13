import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/Colors';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌿</Text>
      <Text style={styles.title}>Agri-Smart</Text>
      <Text style={styles.version}>Version 1.0.0</Text>
      <View style={styles.separator} />
      <Text style={styles.desc}>
        Farm-to-Fork Intelligence Platform{'\n'}
        Empowering farmers with direct market access,{'\n'}
        AI-driven crop health analysis, and transparency.
      </Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.background,
  },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.green[800], marginBottom: 4 },
  version: { fontSize: 13, color: Colors.slate[400], fontWeight: '500' },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '60%',
    backgroundColor: Colors.slate[200],
  },
  desc: {
    fontSize: 14,
    color: Colors.slate[500],
    textAlign: 'center',
    lineHeight: 22,
  },
});
