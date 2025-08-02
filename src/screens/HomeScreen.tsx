import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; // Or your preferred icon library
import { useNavigation } from '@react-navigation/native';

// --- Data for the Features Grid ---
const features = [
  {
    icon: 'wind',
    title: 'جلسة تنفس',
    subtitle: 'تمارين تنفس موجهة',
    screen: 'BreathingSession',
  },
  {
    icon: 'robot',
    title: 'المساعد الذكي',
    subtitle: 'داعم AI دردشة مع',
    screen: 'SmartChat',
  },
  {
    icon: 'users',
    title: 'دردشة مجهولة',
    subtitle: 'تواصل مع آخرين بأمان',
    screen: 'AnonChatScreen',
  },
  {
    icon: 'book-open',
    title: 'مكتبة الهدوء',
    subtitle: 'محتوى علاجي غني',
    screen: 'LibraryScreen',
  },
];

// --- Main Component ---
export default function HomeScreen() {
  // Helper to render section titles
  const SectionTitle = ({
    title,
    showSeeMore = false,
  }: {
    title: string;
    showSeeMore?: boolean;
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {showSeeMore && (
        <TouchableOpacity>
          <Text style={styles.seeMoreText}>اكتشف المزيد</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Header --- */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="lungs" size={24} color="#5A67D8" />
            <Text style={styles.logoText}>Breath Zone</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#4A5568"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-outline" size={24} color="#4A5568" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Welcome Message --- */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>مرحباً بك</Text>
          <Text style={styles.welcomeSubtitle}>
            أنت لست وحدك، نحن هنا لدعمك في أي وقت.
          </Text>
        </View>

        {/* --- Instant Calm Card --- */}
        <TouchableOpacity style={styles.instantCalmCard}>
          <View>
            <Text style={styles.instantCalmTitle}>الهدوء الفوري</Text>
            <Text style={styles.instantCalmSubtitle}>
              للحظات القلق والتوتر المفاجئة
            </Text>
          </View>
          <View style={styles.instantCalmIcon}>
            <Ionicons name="flash-outline" size={22} color="#5A67D8" />
          </View>
        </TouchableOpacity>

        {/* --- Breathing Circle --- */}
        <View style={styles.breathingSection}>
          <Text style={styles.sectionTitle}>تنفس معنا</Text>
          <TouchableOpacity style={styles.breathingCircle}>
            <View style={styles.breathingCircleOuter} />
            <View style={styles.breathingCircleInner} />
            <Text style={styles.breathingText}>استنشق... ازفر</Text>
            <Text style={styles.breathingSubtext}>اضغط للبدء</Text>
          </TouchableOpacity>
        </View>

        {/* --- Explore Features Grid --- */}
        <View style={styles.featuresSection}>
          <SectionTitle title="استكشف المميزات" />
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={() => {
                  navigation.navigate(feature.screen);
                }}
              >
                <View style={styles.featureIconContainer}>
                  <FontAwesome5
                    name={feature.icon as any}
                    size={22}
                    color="#5A67D8"
                  />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- Therapy Path Card --- */}
        <View style={styles.therapyPathSection}>
          <SectionTitle title="المسار العلاجي" showSeeMore />
          <TouchableOpacity
            style={styles.therapyPathCard}
            onPress={() => {
              navigation.navigate('ThearbyScreen');
            }}
          >
            <View style={styles.therapyIconContainer}>
              <FontAwesome5 name="sitemap" size={30} color="#5A67D8" />
            </View>
            <View style={styles.therapyTextContainer}>
              <Text style={styles.therapyTitle}>خطة شخصية لك</Text>
              <Text style={styles.therapySubtitle}>
                مخصصة حسب شخصيتك ونمطك النفسي
              </Text>
            </View>
            <TouchableOpacity style={styles.therapyButton}>
              <Text style={styles.therapyButtonText}>ابدأ الآن</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* --- Custom Tab Bar --- */}
      <View style={styles.customTabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#2D3748" />
          <Text style={styles.tabLabelActive}>الرئيسية</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="library-outline" size={24} color="#A0AEC0" />
          <Text style={styles.tabLabel}>المكتبة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centralTabItem}>
          <FontAwesome5 name="lungs" size={26} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="#A0AEC0"
          />
          <Text style={styles.tabLabel}>محادثة</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#A0AEC0" />
          <Text style={styles.tabLabel}>حسابي</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollContent: {
    paddingBottom: 100, // Space for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#718096',
    marginTop: 4,
  },
  instantCalmCard: {
    backgroundColor: '#E9E1F8', // Soft purple
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instantCalmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#44337A',
  },
  instantCalmSubtitle: {
    fontSize: 14,
    color: '#6B4FBC',
    marginTop: 4,
  },
  instantCalmIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#5A67D8',
    fontWeight: '600',
  },
  breathingSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E9E1F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  breathingCircleOuter: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#F0EBFA',
    zIndex: -1,
  },
  breathingCircleInner: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#DCD0F2',
    zIndex: -1,
  },
  breathingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#44337A',
  },
  breathingSubtext: {
    fontSize: 14,
    color: '#6B4FBC',
    marginTop: 8,
  },
  featuresSection: {
    marginTop: 35,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  featureCard: {
    width: (Dimensions.get('window').width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  featureSubtitle: {
    fontSize: 13,
    color: '#718096',
    marginTop: 4,
  },
  therapyPathSection: {
    marginTop: 15,
  },
  therapyPathCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  therapyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  therapyTextContainer: {},
  therapyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  therapySubtitle: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
    marginBottom: 15,
  },
  therapyButton: {
    backgroundColor: '#E9E1F8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  therapyButtonText: {
    color: '#5A67D8',
    fontWeight: 'bold',
    fontSize: 14,
  },
  customTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: 20, // For iPhone home indicator
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 4,
  },
  tabLabelActive: {
    fontSize: 12,
    color: '#2D3748',
    marginTop: 4,
    fontWeight: '600',
  },
  centralTabItem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#5A67D8',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -25 }],
    elevation: 4,
    shadowColor: '#5A67D8',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    borderWidth: 4,
    borderColor: '#F7F9FC',
  },
});
