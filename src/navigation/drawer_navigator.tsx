import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/auth_context';
import BreathingSession from '../screens/BreathingSession';
import AboutScreen from '../screens/AboutUsScreen';
import LibraryScreen from '../screens/LibraryContentScreen';
import StatsScreen from '../screens/StatsScreen';
import TherapyPathScreen from '../screens/TherapyPathScreen';
import SmartChatScreen from '../screens/SmartChatScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="تسجيل الخروج"
        onPress={handleLogout}
        style={{ marginLeft: 16, marginRight: 16 }}
      />
      <DrawerItem
        label="من نحن"
        onPress={() => {
          navigation.navigate('AboutScreen');
        }}
        style={{ marginLeft: 16, marginRight: 16 }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="BreathingSession" component={BreathingSession} />
      <Drawer.Screen name="AboutScreen" component={AboutScreen} />
      <Drawer.Screen name="LibraryScreen" component={LibraryScreen} />
      <Drawer.Screen name="StatsScreen" component={StatsScreen} />
      <Drawer.Screen name="ThearbyScreen" component={TherapyPathScreen} />
      <Drawer.Screen name="SmartChat" component={SmartChatScreen} />
      {/* Add more authenticated screens here */}
    </Drawer.Navigator>
  );
}
