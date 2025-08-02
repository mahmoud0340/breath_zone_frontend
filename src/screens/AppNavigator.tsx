// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from 'react';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
//   DrawerItemList,
// } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';

// // استيراد جميع الشاشات
// import HomeScreen from './HomeScreen';
// import AboutUsScreen from './AboutUsScreen';
// import SettingsScreen from './SettingsScreen';
// import BreathingSession from './BreathingSession';
// import SmartChatScreen from './SmartChatScreen';
// import AnonChatScreen from './AnonChatScreen';
// import TherapyPathScreen from './TherapyPathScreen';
// // ******** إضافة شاشة LibraryScreen هنا ********
// import LibraryScreen from './LibraryScreen'; // <--- تأكد من وجود هذا الملف في نفس المجلد
// import LibraryDetailScreen from './LibraryDetailScreen';
// import InstantReliefScreen from './InstantReliefScreen';
// import StatsScreen from './StatsScreen';
// import LibraryContentScreen from './LibraryContentScreen'; // <--- تأكد من استيرادها أيضاً
// import LoginScreen from './LoginScreen';
// import FeedbackScreen from './FeedbackScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// // ******** تعريف RootStackParamList هنا (هذا هو المفتاح!) ********
// // هذا التعريف هو المصدر الوحيد والحقيقي لأنواع التنقل
// export type RootStackParamList = {
//   Home: undefined; // شاشة Home لا تستقبل أي parameters
//   BreathingSession: { duration: number }; // تستقبل duration كـ number
//   SessionComplete: undefined; // لا تستقبل parameters (إذا كانت موجودة)
//   Stats: undefined; // لا تستقبل parameters
//   SmartChatScreen: undefined; // لا تستقبل parameters
//   AnonChatScreen: undefined; // لا تستقبل parameters
//   InstantReliefScreen: undefined; // لا تستقبل parameters
//   TherapyPathScreen: undefined; // لا تستقبل parameters
//   MyLibraryScreen: undefined; // <--- شاشة قائمة المكتبة لا تستقبل parameters عند الانتقال إليها
//   LibraryDetailScreen: { item: any }; // <--- شاشة تفاصيل المكتبة تستقبل 'item'
//   LibraryContentScreen: { topic: any }; // <--- شاشة محتوى المكتبة تستقبل 'topic'
//   // أضف أي شاشات أخرى هنا بنفس الطريقة
// };
// // ***************************************************************

// function AppNavigator() {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await AsyncStorage.getItem('token');
//       setIsAuthenticated(!!token);
//     };
//     checkAuth();
//   }, []);

//   if (!isAuthenticated) {
//     // Only show LoginScreen, no drawer/appbar
//     return (
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }

//   // Main app with drawer
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         initialRouteName="Main"
//         drawerContent={(props) => <CustomDrawerContent {...props} />}
//       >
//         <Drawer.Screen
//           name="Main"
//           component={MainStackNavigator}
//           options={{ title: 'الرئيسية' }}
//         />
//         {/* ...other Drawer screens */}
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppNavigator;
