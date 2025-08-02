import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface FavoriteItem {
  id: string;
  title: string;
}

const FavoritesScreen = () => {
  // بيانات وهمية للمفضلة، هنربطها لاحقًا بقاعدة بيانات أو AsyncStorage
  const favoriteItems: FavoriteItem[] = [
    { id: '1', title: 'كتاب الهدوء' },
    { id: '2', title: 'تأمل صوتي: استرخاء' },
    { id: '3', title: 'مقال: كيف تنام بعمق' },
  ];

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>مفضلتك</Text>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>لا توجد عناصر مفضلة بعد.</Text>
        }
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  item: {
    padding: 14,
    marginVertical: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
