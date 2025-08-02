// screens/MyLibraryScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyLibraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>مكتبتي الشخصية</Text>
      <Text style={styles.message}>
        هنا ستجد المحتوى الذي قمت بحفظه أو المفضل لديك.
      </Text>
    </View>
  );
};

export default MyLibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
