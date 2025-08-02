import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';

const LibraryDetailScreen = () => {
  type LibraryDetailScreenRouteParams = {
    item?: {
      title: { [key: string]: string };
      topics?: { title: { [key: string]: string } }[];
    };
  };

  const route = useRoute<{
    key: string;
    name: string;
    params: LibraryDetailScreenRouteParams;
  }>();
  type NavigationProp = StackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();
  const language = 'ar';

  // تأكد أن route.params موجود وأن item موجود بداخله
  // إذا لم يكونا موجودين، ستكون قيمة 'item' هي undefined
  const item = route.params?.item;

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          عذراً، لا توجد بيانات لهذا التصنيف. الرجاء العودة للصفحة الرئيسية.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // أو navigation.navigate('LibraryScreen')
        >
          <Text style={styles.backButtonText}>العودة</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.title[language]}</Text>
        {item.topics && item.topics.length > 0 ? ( // فحص لضمان وجود topics
          item.topics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={styles.topicItem}
              onPress={() => navigation.navigate('LibraryContentScreen')}
            >
              <Text style={styles.topicText}>• {topic.title[language]}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTopicsText}>
            لا توجد مواضيع متاحة في هذا التصنيف.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center', // توسيط المحتوى عند ظهور رسالة الخطأ
    alignItems: 'center',
  },
  categoryContainer: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    width: '100%', // لضمان أن الـ categoryContainer يملأ العرض
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'right',
  },
  topicItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  topicText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'right',
  },
  noTopicsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF', // لون أزرق جذاب
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LibraryDetailScreen;
