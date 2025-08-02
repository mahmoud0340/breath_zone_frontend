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
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

// --- Dummy Data ---
const weeklyChartData1 = [3, 4, 3.8, 2, 4.5, 5, 5.2];
const weeklyChartData2 = [2.5, 3.5, 4, 3, 3.5, 4, 4.5];
const weekDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const statsGridData = [
  { icon: 'om', value: 45, change: 8, label: 'دقائق التأمل', color: '#8B5CF6', changeColor: 'green' },
  { icon: 'wind', value: 12, change: 3, label: 'جلسات التنفس', color: '#3B82F6', changeColor: 'green' },
  { icon: 'chatbubble-ellipses-outline', value: 9, change: -1, label: 'محادثات المساعد', color: '#10B981', changeColor: 'red' },
  { icon: 'reader-outline', value: 7, change: 2, label: 'المقالات المقروءة', color: '#F59E0B', changeColor: 'green' },
];

const moodTrackerData = [
    { day: 'الأحد', mood: 'happy-outline' },
    { day: 'الإثنين', mood: 'happy-outline' },
    { day: 'الثلاثاء', mood: 'happy' },
    { day: 'الأربعاء', mood: 'sad-outline' },
    { day: 'الخميس', mood: 'happy' },
    { day: 'الجمعة', mood: 'happy-outline' },
    { day: 'السبت', mood: 'happy-outline' },
];

const monthlyGoalsData = [
    { label: 'جلسات التنفس اليومية', current: 12, total: 20, color: '#3B82F6' },
    { label: 'دقائق التأمل', current: 45, total: 60, color: '#8B5CF6' },
    { label: 'قراءة المقالات', current: 7, total: 10, color: '#F59E0B' },
];

// --- Main Component ---
export default function StatsScreen() {

  // Reusable Card component for consistent styling
  const Card = ({ children, style }: { children: React.ReactNode, style?: object }) => (
    <View style={[styles.card, style]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>إحصائياتي</Text>
          <TouchableOpacity>
            <Ionicons name="arrow-forward-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* --- Welcome Card --- */}
        <Card>
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeText}>
              <Text style={styles.welcomeTitle}>مرحباً، أحمد</Text>
              <Text style={styles.welcomeSubtitle}>أسبوعك يبدو أفضل من الأسبوع الماضي!</Text>
            </View>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={24} color="#8B5CF6" />
            </View>
          </View>
          <View style={styles.moodSummary}>
            <Text style={styles.moodText}>حالتك المزاجية</Text>
            <View style={styles.moodIcons}>
                <Ionicons name="happy" size={22} color="green" style={{marginHorizontal: 2}}/>
                <Ionicons name="happy" size={22} color="green" style={{marginHorizontal: 2}}/>
                <Ionicons name="happy" size={22} color="green" style={{marginHorizontal: 2}}/>
            </View>
            <Text style={styles.moodImprovement}>تحسن بنسبة %12</Text>
          </View>
        </Card>

        {/* --- Weekly Progress Chart --- */}
        <Card>
            <Text style={styles.cardTitle}>تقدمك الأسبوعي</Text>
            <View style={{ height: 200, flexDirection: 'row', padding: 10 }}>
                <YAxis
                    data={weeklyChartData1}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{ fontSize: 10, fill: 'grey' }}
                    numberOfTicks={4}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={weeklyChartData1}
                        svg={{ stroke: '#A78BFA', strokeWidth: 3 }}
                        contentInset={{ top: 20, bottom: 20 }}
                        curve={shape.curveNatural}
                    />
                    <LineChart
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        data={weeklyChartData2}
                        svg={{ stroke: '#BFDBFE', strokeWidth: 3 }}
                        contentInset={{ top: 20, bottom: 20 }}
                        curve={shape.curveNatural}
                    />
                    <Grid svg={{ stroke: '#E5E7EB', strokeDasharray: '2,2' }} />
                </View>
            </View>
            <XAxis
                style={{ marginHorizontal: 10, marginTop: 10 }}
                data={weeklyChartData1}
                formatLabel={(value, index) => weekDays[index]}
                contentInset={{ left: 30, right: 30 }}
                svg={{ fontSize: 10, fill: 'grey' }}
            />
        </Card>

        {/* --- Stats Grid --- */}
        <View style={styles.statsGrid}>
            {statsGridData.map((item, index) => (
                <Card key={index} style={styles.statCard}>
                    <View style={[styles.statIconContainer, { backgroundColor: `${item.color}20` }]}>
                       {item.icon === 'om' || item.icon === 'wind' ? 
                         <FontAwesome5 name={item.icon} size={20} color={item.color} /> : 
                         <Ionicons name={item.icon as any} size={22} color={item.color}/>}
                    </View>
                    <Text style={styles.statValue}>{item.value}</Text>
                    <Text style={styles.statLabel}>{item.label}</Text>
                    <Text style={[styles.statChange, { color: item.changeColor }]}>
                        {item.change > 0 ? `+${item.change}` : item.change} عن الأسبوع الماضي
                    </Text>
                </Card>
            ))}
        </View>

        {/* --- Mood Tracker --- */}
        <Card>
            <Text style={styles.cardTitle}>تتبع المزاج</Text>
            <View style={styles.moodTrackerContainer}>
                {moodTrackerData.map((item, index) => (
                    <View key={index} style={styles.moodDay}>
                        <Text style={styles.moodDayLabel}>{item.day.substring(0,3)}</Text>
                        <Ionicons name={item.mood as any} size={28} color={item.mood.includes('sad') ? '#EF4444' : item.mood.includes('happy') ? '#22C55E' : '#F59E0B'} />
                    </View>
                ))}
            </View>
        </Card>

        {/* --- Monthly Goals --- */}
        <Card>
            <Text style={styles.cardTitle}>أهدافك الشهرية</Text>
            <View style={{marginTop: 15}}>
                {monthlyGoalsData.map((goal, index) => (
                    <View key={index} style={styles.goalRow}>
                        <View style={{flex: 1}}>
                            <View style={styles.goalTextContainer}>
                                <Text style={styles.goalLabel}>{goal.label}</Text>
                                <Text style={styles.goalProgressText}>{goal.current}/{goal.total}</Text>
                            </View>
                            <View style={styles.progressBarBackground}>
                                <View style={[styles.progressBarFill, {width: `${(goal.current/goal.total)*100}%`, backgroundColor: goal.color}]}/>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </Card>
      </ScrollView>
       {/* --- Custom Tab Bar Placeholder --- */}
       <View style={styles.customTabBar}><Text style={{color: '#718096'}}>Custom Tab Bar Placeholder</Text></View>
    </SafeAreaView>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F5FE',
    },
    scrollContent: {
        paddingBottom: 100,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        elevation: 1,
        shadowColor: '#2C3A61',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
        textAlign: 'right',
    },
    welcomeContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    welcomeText: {
        flex: 1,
        alignItems: 'flex-end',
    },
    welcomeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: '#718096',
        marginTop: 4,
    },
    profileIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EDE9FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    moodSummary: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F7FAFC',
        borderRadius: 15,
        padding: 15,
        marginTop: 20,
    },
    moodText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568',
    },
    moodIcons: {
        flexDirection: 'row',
    },
    moodImprovement: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#22C55E',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statCard: {
        width: (Dimensions.get('window').width - 44) / 2, // 16*2 for screen padding + 12 for gap
        alignItems: 'flex-end',
    },
    statIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    statLabel: {
        fontSize: 14,
        color: '#4A5568',
        fontWeight: '600',
        marginTop: 4,
    },
    statChange: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 8,
    },
    moodTrackerContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    moodDay: {
        alignItems: 'center',
    },
    moodDayLabel: {
        fontSize: 12,
        color: '#718096',
        marginBottom: 8,
    },
    goalRow: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 20,
    },
    goalTextContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    goalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568',
    },
    goalProgressText: {
        fontSize: 13,
        color: '#718096',
    },
    progressBarBackground: {
        height: 10,
        backgroundColor: '#E2E8F0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 5,
    },
    customTabBar: {
      height: 85,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F5FE',
      borderTopWidth: 1,
      borderTopColor: '#E2E8F0'
    }
});