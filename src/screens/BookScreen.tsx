import React from 'react';
import { View, Text, StyleSheet, ScrollView, I18nManager } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  BookScreen: {
    title: string;
    content: string;
    language: 'ar' | 'en';
  };
};

type BookScreenRouteProp = RouteProp<RootStackParamList, 'BookScreen'>;

export default function BookScreen() {
  const route = useRoute<BookScreenRouteProp>();
  const { title, content, language } = route.params;

  // ضبط اتجاه النص حسب اللغة
  React.useEffect(() => {
    I18nManager.forceRTL(language === 'ar');
  }, [language]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.content}>{content}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 20,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  content: {
    fontSize: 18,
    color: '#3E2723',
    lineHeight: 28,
    textAlign: 'justify',
  },
});
