import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require('../assets/logo.png')} // Replace with your app logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Breath Zone</Text>
        <Text style={styles.version}>Version 1.0.0</Text>

        <Text style={styles.sectionTitle}>About the App</Text>
        <Text style={styles.text}>
          Breath Zone is your personal sanctuary for mental clarity and emotional balance.
          With guided breathing sessions, intelligent support, and soothing resources,
          our mission is to help you reconnect with your inner calm — anytime, anywhere.
        </Text>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          To empower individuals to manage stress, anxiety, and emotional overwhelm through
          technology that feels human, supportive, and deeply personal.
        </Text>

        <Text style={styles.quote}>
          “Within you, there is a stillness and a sanctuary to which you can retreat at any time.”  
          {"\n"}– Hermann Hesse
        </Text>

        <Text style={styles.footer}>© 2025 Breath Zone. All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  appName: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    color: '#2C3E50',
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginTop: 8,
    textAlign: 'left',
  },
  quote: {
    fontStyle: 'italic',
    color: '#888',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
  },
  footer: {
    fontSize: 13,
    color: '#AAA',
    marginTop: 40,
    textAlign: 'center',
  },
});

export default AboutScreen;
