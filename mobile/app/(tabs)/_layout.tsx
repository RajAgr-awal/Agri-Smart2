import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';

function TabIcon({ emoji }: { emoji: string }) {
  return <Text style={{ fontSize: 22 }}>{emoji}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.green[600],
        tabBarInactiveTintColor: Colors.slate[400],
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <TabIcon emoji="🏠" />,
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Market',
          tabBarIcon: () => <TabIcon emoji="🛒" />,
        }}
      />
      <Tabs.Screen
        name="crop-doctor"
        options={{
          title: 'Crop Doc',
          tabBarIcon: () => <TabIcon emoji="🔬" />,
        }}
      />
      <Tabs.Screen
        name="advisory"
        options={{
          title: 'Advisory',
          tabBarIcon: () => <TabIcon emoji="🌤️" />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: () => <TabIcon emoji="💬" />,
          tabBarBadge: 3,
          tabBarBadgeStyle: styles.badge,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.slate[100],
    height: Platform.OS === 'ios' ? 88 : 64,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    paddingTop: 8,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  tabBarLabel: {
    fontWeight: '600',
    fontSize: 10,
  },
  badge: {
    backgroundColor: Colors.green[500],
    fontSize: 10,
    minWidth: 18,
    height: 18,
    lineHeight: 18,
  },
});
