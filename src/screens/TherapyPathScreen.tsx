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
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// --- Dummy Data for the Therapy Path ---
const therapyPathSteps = [
  {
    step: 1,
    icon: 'user-astronaut', // Represents 'Discover Yourself'
    title: 'اكتشف نمطك الشخصي',
    description: 'أجب عن بعض الأسئلة لفهم أعمق لشخصيتك حسب نموذج كارل يونغ.',
    status: 'completed', // 'completed', 'current', 'locked'
    cta: 'عرض تقريري',
  },
  {
    step: 2,
    icon: 'compass',
    title: 'خطة التنفس الأولى',
    description: 'تعلم تقنية التنفس الصندوقي لتهدئة الجهاز العصبي وتقليل التوتر.',
    status: 'current',
    cta: 'ابدأ التمرين (5 دقائق)',
  },
  {
    step: 3,
    icon: 'book-reader',
    title: 'مقدمة في الوعي الذهني',
    description: 'اقرأ مقالًا مبسطًا عن كيفية تطبيق الوعي في حياتك اليومية.',
    status: 'locked',
    cta: 'ابدأ القراءة',
  },
  {
    step: 4,
    icon: 'pen-fancy',
    title: 'يومياتك الأولى',
    description: 'اكتب عن مشاعرك اليوم. لا توجد إجابات خاطئة، فقط مساحة آمنة للتعبير.',
    status: 'locked',
    cta: 'افتح اليوميات',
  },
    {
    step: 5,
    icon: 'running',
    title: 'الممارسة اليومية',
    description: 'اجعل التنفس والتأمل جزءًا من روتينك اليومي لنتائج مستدامة.',
    status: 'locked',
    cta: 'استكشف الروتين',
  },
];

// --- Main Component ---
export default function TherapyPathScreen() {
    
  // Card for the introduction
  const IntroCard = () => (
    <View style={styles.introCard}>
      <View style={styles.introIconContainer}>
        <FontAwesome5 name="sitemap" size={30} color="#5A67D8" />
      </View>
      <Text style={styles.introTitle}>مسارك العلاجي الشخصي</Text>
      <Text style={styles.introSubtitle}>
        خطوات مصممة لمساعدتك على فهم ذاتك وتطوير عادات صحية جديدة. كل خطوة تقربك أكثر لهدوئك الداخلي.
      </Text>
    </View>
  );

  // Component for each step in the timeline
  const PathStep = ({ item, isLast }: { item: typeof therapyPathSteps[0], isLast: boolean }) => {
    const isLocked = item.status === 'locked';
    const isCurrent = item.status === 'current';
    
    return (
      <View style={styles.stepContainer}>
        {/* The Timeline Vertical Line */}
        {!isLast && <View style={styles.timelineLine} />}
        
        {/* The Icon and its Circle */}
        <View style={[styles.stepIconWrapper, isLocked && styles.lockedIconWrapper, isCurrent && styles.currentIconWrapper]}>
          {isLocked ? (
            <Ionicons name="lock-closed" size={24} color="#A0AEC0" />
          ) : (
            <FontAwesome5 name={item.icon} size={24} color={isCurrent ? '#FFFFFF' : '#5A67D8'} />
          )}
        </View>
        
        {/* The Content Card */}
        <View style={[styles.stepCard, isLocked && styles.lockedCard]}>
          <Text style={styles.stepTitle}>{item.title}</Text>
          <Text style={styles.stepDescription}>{item.description}</Text>
          {!isLocked && (
            <TouchableOpacity style={[styles.stepButton, isCurrent && styles.currentStepButton]}>
              <Text style={[styles.stepButtonText, isCurrent && styles.currentStepButtonText]}>{item.cta}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>المسار العلاجي</Text>
          <TouchableOpacity>
            <Ionicons name="close" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        {/* --- Intro Card --- */}
        <IntroCard />

        {/* --- Path Timeline --- */}
        <View style={styles.timelineContainer}>
          {therapyPathSteps.map((step, index) => (
            <PathStep key={step.step} item={step} isLast={index === therapyPathSteps.length - 1} />
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  introCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#2C3A61',
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  introIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  introSubtitle: {
    fontSize: 15,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 22,
  },
  timelineContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  stepContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    minHeight: 120,
  },
  timelineLine: {
    position: 'absolute',
    top: 50,
    right: 24, // center of the icon (50/2 - 1)
    bottom: -20,
    width: 2,
    backgroundColor: '#E2E8F0',
    zIndex: -1,
  },
  stepIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E9E1F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    zIndex: 1,
  },
  currentIconWrapper: {
    backgroundColor: '#5A67D8',
    elevation: 4,
    shadowColor: '#5A67D8',
    shadowOpacity: 0.3,
  },
  lockedIconWrapper: {
    backgroundColor: '#E2E8F0',
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  lockedCard: {
    backgroundColor: '#F8FAFC',
    opacity: 0.8,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'right',
  },
  stepDescription: {
    fontSize: 14,
    color: '#718096',
    marginTop: 6,
    textAlign: 'right',
    lineHeight: 21,
  },
  stepButton: {
    backgroundColor: '#F0F4FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  currentStepButton: {
    backgroundColor: '#5A67D8',
  },
  stepButtonText: {
    color: '#5A67D8',
    fontWeight: 'bold',
    fontSize: 14,
  },
  currentStepButtonText: {
    color: '#FFFFFF',
  },
});