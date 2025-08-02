import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 الشروط والأحكام</Text>
      <Text style={styles.text}>هنا ستُعرض سياسات الخصوصية والشروط الخاصة باستخدام التطبيق.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F3E5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
