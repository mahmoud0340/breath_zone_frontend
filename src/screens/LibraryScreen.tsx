import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import libraryData from '../../data/library.json'; // هذا السطر يستورد البيانات
import useLanguage from '../../utils/useLanguage';
import BookCard from '../../components/BookCard';
import { RootStackParamList } from './AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

const LibraryScreen = () => {
  const language = useLanguage();
  type NavigationProp = StackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  // لا نحتاج لـ screenWidth في هذا السياق الآن
  // const screenWidth = Dimensions.get('window').width;

  // ******************************************************
  // ************* فحص البيانات التشخيصي (هام جداً) *************
  // ******************************************************
  // هذا السطر سيعرض لك قيمة libraryData على الشاشة مباشرة باللون الأزرق
  console.log('LibraryScreen: Loaded libraryData:', libraryData); // سنضع console.log هنا أيضاً

  if (!libraryData || libraryData.length === 0) {
    console.log('LibraryScreen: libraryData is empty or not loaded correctly!'); // للتشخيص في الكونسول

    return (
      <View style={styles.container}>
        {/* هذا النص سيظهر إذا كانت البيانات فارغة */}
        <Text style={styles.diagnosticText}>
          بيانات المكتبة (تشخيص): {JSON.stringify(libraryData)}
        </Text>
        <Text style={styles.emptyDataMessage}>
          عذراً، لا توجد بيانات لعرضها في المكتبة حالياً.
        </Text>
      </View>
    );
  }
  // ******************************************************

  return (
    <View style={styles.container}>
      {/* هذا السطر سيظهر قيمة libraryData على الشاشة بشكل مؤقت للتأكد من أنها محملة */}

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {libraryData.map(
          (
            category, // هنا 'category' هو العنصر الكامل من libraryData
          ) => (
            <View key={category.id} style={styles.categoryRow}>
              <Text style={styles.categoryTitle}>
                {category.title[language]}
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bookshelfContent}
              >
                {category.topics.map((topic, index) => (
                  <BookCard
                    key={index}
                    title={topic.title[language]} // عنوان الموضوع للكارت
                    onPress={() => {
                      // ****** التعديل الحاسم هنا ******
                      // يجب أن نرسل الـ 'category' بالكامل إلى LibraryDetailScreen
                      // وليس الـ 'topic' فقط أو أي شيء آخر.
                      console.log(
                        'LibraryScreen: Navigating with category:',
                        category,
                      );
                      navigation.navigate('LibraryDetailScreen', {
                        item: category,
                      });
                      // ********************************
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          ),
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  categoryRow: {
    marginBottom: 24,
    paddingVertical: 10,
  },
  bookshelfContent: {
    paddingHorizontal: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4B3F33',
    textAlign: 'left',
    paddingHorizontal: 8,
  },
  diagnosticText: {
    color: 'blue',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyDataMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LibraryScreen;
