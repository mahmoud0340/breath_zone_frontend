import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingBottom: Platform.OS === 'android' ? 40 : 0,
  },
});
