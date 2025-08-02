import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export default function InstantReliefScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.4, duration: 3000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
      ]).start(() => loop());
    };
    loop();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🆘 جلسة طمأنة فورية</Text>

      <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.breathText}>خُد نفس عميق</Text>
      </Animated.View>

      <Text style={styles.helperText}>
        أنت مش لوحدك، كل حاجة هتعدي. استمر في التنفس واهدأ...  
      </Text>

      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneText}>تم</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#0D47A1',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#B3E5FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  breathText: {
    fontSize: 20,
    color: '#01579B',
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  doneButton: {
    backgroundColor: '#64B5F6',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  doneText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
