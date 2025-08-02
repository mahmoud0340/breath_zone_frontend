import React from 'react';
import { useAuth } from '../contexts/auth_context';
import AuthNavigator from './auth_navigator';
import DrawerNavigator from './drawer_navigator';
import SplashScreen from '../screens/SplashScreen';

export default function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;
  return user ? <DrawerNavigator /> : <AuthNavigator />;
}
