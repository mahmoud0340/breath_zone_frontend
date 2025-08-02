import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 الملف الشخصي</Text>
      <Text style={styles.text}>هنا سيتم عرض بيانات المستخدم مثل الاسم، البريد، الإعدادات الشخصية..</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#E3F2FD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
