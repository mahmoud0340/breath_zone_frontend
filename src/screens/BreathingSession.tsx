import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// --- Breathing Cycle Configuration (4-4-4-4 Box Breathing) ---
const INHALE_DURATION = 4000;
const HOLD_DURATION = 4000;
const EXHALE_DURATION = 4000;
const POST_EXHALE_PAUSE = 4000;
const CYCLE_DURATION =
  INHALE_DURATION + HOLD_DURATION + EXHALE_DURATION + POST_EXHALE_PAUSE;

const { width } = Dimensions.get('window');

// --- Main Component ---
export default function BreathingSessionScreen({ navigation }) {
  const [instruction, setInstruction] = useState('استعد للبدء...');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timer, setTimer] = useState(60); // Example: 1 minute session
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const animationLoop = useRef<Animated.CompositeAnimation | null>(null);

  // --- Animation Logic ---
  const startAnimation = () => {
    // Ensure any existing animation is stopped before starting a new one
    scaleAnim.setValue(1);
    animationLoop.current?.stop();

    animationLoop.current = Animated.loop(
      Animated.sequence([
        // Inhale
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: INHALE_DURATION,
          useNativeDriver: true,
        }),
        // Hold
        Animated.delay(HOLD_DURATION),
        // Exhale
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: EXHALE_DURATION,
          useNativeDriver: true,
        }),
        // Post-Exhale Pause
        Animated.delay(POST_EXHALE_PAUSE),
      ]),
    );
    animationLoop.current.start();
  };

  // --- State and Timer Management ---
  useEffect(() => {
    let instructionInterval: NodeJS.Timeout;
    let timerInterval: NodeJS.Timeout;

    if (isSessionActive) {
      startAnimation();
      setInstruction('استنشق'); // Initial instruction
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Update instructions based on the cycle
      instructionInterval = setInterval(() => {
        setInstruction('استنشق');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTimeout(() => {
          setInstruction('احبس نفسك');
        }, INHALE_DURATION);
        setTimeout(() => {
          setInstruction('ازفر');
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }, INHALE_DURATION + HOLD_DURATION);
      }, CYCLE_DURATION);

      // Countdown timer
      timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            endSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Clear intervals and stop animation when paused/inactive
      animationLoop.current?.stop();
      clearInterval(instructionInterval);
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(instructionInterval);
      clearInterval(timerInterval);
    };
  }, [isSessionActive]);

  const toggleSession = () => {
    setIsSessionActive((prev) => !prev);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setInstruction('أحسنت صنعًا!');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Navigate to a session complete screen after a delay
    setTimeout(() => navigation.navigate('SessionComplete'), 2000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Close Button --- */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={30} color="#4A5568" />
      </TouchableOpacity>

      {/* --- Main Content --- */}
      <View style={styles.content}>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}
          >
            <View style={styles.circleInner} />
            <View style={styles.circleCore} />
          </Animated.View>
          <Text style={styles.instructionText}>{instruction}</Text>
        </View>

        {/* --- Controls --- */}
        <TouchableOpacity style={styles.controlButton} onPress={toggleSession}>
          <Ionicons
            name={isSessionActive ? 'pause' : 'play'}
            size={32}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },
  timerText: {
    fontSize: 22,
    color: '#A0AEC0',
    fontWeight: '600',
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  instructionText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3748',
    position: 'absolute',
  },
  circle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: 'rgba(215, 204, 242, 0.4)', // Outer-most, most transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    width: '75%',
    height: '75%',
    borderRadius: (width * 0.7 * 0.75) / 2,
    backgroundColor: 'rgba(215, 204, 242, 0.6)', // Middle circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleCore: {
    width: '50%',
    height: '50%',
    borderRadius: (width * 0.7 * 0.5) / 2,
    backgroundColor: 'rgba(215, 204, 242, 1)', // Center, solid color
    position: 'absolute',
  },
  controlButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#5A67D8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#5A67D8',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
