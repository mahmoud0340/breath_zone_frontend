import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomDrawer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>القائمة الجانبية</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomDrawer;
