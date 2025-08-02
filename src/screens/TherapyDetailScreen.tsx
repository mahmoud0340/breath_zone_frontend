import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

type TherapyPath = {
  id: string;
  title: string;
  description: string;
  steps: string[];
};

type RootStackParamList = {
  TherapyDetailScreen: { path: TherapyPath };
};

type RouteProps = RouteProp<RootStackParamList, 'TherapyDetailScreen'>;

export default function TherapyDetailScreen() {
  const route = useRoute<RouteProps>();
  const { path } = route.params;

  const handleStart = (step: string) => {
    // حالياً تنبيه تجريبي – لاحقًا نربط كل خطوة بالشاشة المناسبة
    Alert.alert('ابدأ الجلسة', `سيتم تنفيذ: "${step}"`, [{ text: 'حسنًا' }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{path.title}</Text>
      <Text style={styles.description}>{path.description}</Text>

      <FlatList
        data={path.steps}
        keyExtractor={(item, index) => `${path.id}-step-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.stepCard}>
            <Text style={styles.stepText}>🧩 الخطوة {index + 1}: {item}</Text>
            <TouchableOpacity style={styles.startButton} onPress={() => handleStart(item)}>
              <Text style={styles.startButtonText}>ابدأ</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20, paddingTop: 40 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
  },
  stepCard: {
    backgroundColor: '#E1F5FE',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  stepText: {
    fontSize: 16,
    color: '#0277BD',
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#64B5F6',
    paddingVertical: 10,
    borderRadius: 25,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
