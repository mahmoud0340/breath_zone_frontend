import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RateAppScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rate the App</Text>
    </View>
  );
};

export default RateAppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
