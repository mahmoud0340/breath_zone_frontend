import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  BreathingSession: { duration: number };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'BreathingSession'>;

export default function SelectDurationScreen() {
  const navigation = useNavigation<NavigationProp>();

  const durations = [
    { label: '1 دقيقة', value: 60 },
    { label: '3 دقائق', value: 180 },
    { label: '5 دقائق', value: 300 },
  ];

  const startSession = (duration: number) => {
    navigation.navigate('BreathingSession', { duration });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختر مدة الجلسة</Text>
      {durations.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => startSession(item.value)}
        >
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1976D2',
  },
  button: {
    backgroundColor: '#64B5F6',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
