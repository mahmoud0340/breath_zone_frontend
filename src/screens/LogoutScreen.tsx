// screens/LogoutScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const LogoutScreen = () => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('Logged out') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logout Screen</Text>
      <Button title="Confirm Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
