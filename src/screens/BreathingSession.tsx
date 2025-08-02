import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BreathingSession(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const { duration } = route.params as { duration: number };
  const [timeLeft, setTimeLeft] = useState(duration);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          saveSession();
          navigation.navigate('Home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const loop = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]).start(() => loop());
    };
    loop();

    return () => clearInterval(interval);
  }, [isFocused, props]);

  const saveSession = async () => {
    const s = await AsyncStorage.getItem('breath_sessions');
    const t = await AsyncStorage.getItem('breath_time');
    await AsyncStorage.setItem('breath_sessions', `${parseInt(s || '0') + 1}`);
    await AsyncStorage.setItem(
      'breath_time',
      `${parseInt(t || '0') + duration}`,
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}
      >
        <Text style={styles.timer}>{timeLeft} ثانية</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#90caf9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
