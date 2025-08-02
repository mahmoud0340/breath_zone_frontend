import 'react-native-gesture-handler'; // important for drawer
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/auth_context';
import AppNavigator from './src/navigation/app_navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
