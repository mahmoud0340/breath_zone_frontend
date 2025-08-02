import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TermsConditionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Terms & Conditions</Text>
    </View>
  );
};

export default TermsConditionsScreen;

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
