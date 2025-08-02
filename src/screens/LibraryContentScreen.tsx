import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { allContentData, ContentItem } from '../data/lib_content'; // Adjust path as needed
import { Ionicons } from '@expo/vector-icons'; // Assuming you use Expo icons
import { useNavigation } from '@react-navigation/native';

// --- Filter Categories ---
const filterCategories = [
  { key: 'all', label: 'الكل' },
  { key: 'motivational_stories', label: 'قصص ملهمة' },
  { key: 'literary_excerpts', label: 'مقتطفات أدبية' },
  { key: 'book_summaries', label: 'خلاصة الكتب' },
  { key: 'psychological_messages', label: 'رسائل نفسية' },
];

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;


export interface ContentItem {
  id: string;
  title: string;
  description: string;
  readTime: number;
  imageUri: string;
  body: string;
}

// Define your stack and the params each screen expects
export type RootStackParamList = {
  LibraryContent: undefined; // This screen doesn't expect any params
  LibraryContentDetail: { item: ContentItem }; // This screen REQUIRES an 'item' object of type ContentItem
};



// --- Main Component ---
export default function LibraryContentScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredContent, setFilteredContent] =
    useState<ContentItem[]>(allContentData);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredContent(allContentData);
    } else {
      const filtered = allContentData.filter(
        (item) => item.categoryKey === selectedCategory,
      );
      setFilteredContent(filtered);
    }
  }, [selectedCategory]);

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity>
        <Ionicons name="arrow-back" size={26} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>مكتبة الهدوء</Text>
      <TouchableOpacity>
        <Ionicons name="search" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const PromoBanner = () => (
    <ImageBackground
      source={{
        uri: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/bb6063dd8f-f72abd1178fd24c6e1bb.png',
      }}
      style={styles.promoBanner}
      imageStyle={{ borderRadius: 20 }}
    >
      <View style={styles.promoTextContainer}>
        <Text style={styles.promoTitle}>اكتشف مكتبتنا</Text>
        <Text style={styles.promoSubtitle}>
          محتوى علاجي على لمساعدتك في رحلة السكينة الداخلية
        </Text>
      </View>
    </ImageBackground>
  );

  const FilterChips = () => (
    <View style={{ height: 60 }}>
      <FlatList
        data={filterCategories}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.chip,
              selectedCategory === item.key
                ? styles.activeChip
                : styles.inactiveChip,
            ]}
            onPress={() => setSelectedCategory(item.key)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === item.key
                  ? styles.activeChipText
                  : styles.inactiveChipText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const navigation = useNavigation()

  const ContentCard = ({ item }: { item: ContentItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => {
      navigation.navigate('LibraryContentDetail', { item: item });
    }}>
      <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={1}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardReadTime}>دقائق {item.readTime}</Text>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={20} color="#5A67D8" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredContent}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <>
            <Header />
            <PromoBanner />
            <FilterChips />
          </>
        }
        renderItem={({ item }) => <ContentCard item={item} />}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF', // Light lavender-blue background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  promoBanner: {
    height: 150,
    marginHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 20,
    marginTop: 10,
    backgroundColor: '#C3DAFE', // Fallback color
  },
  promoTextContainer: {
    maxWidth: '65%',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#EBF4FF',
    marginTop: 8,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: '#5A67D8', // Active indigo color
  },
  inactiveChip: {
    backgroundColor: '#E2E8F0', // Inactive light gray
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  inactiveChipText: {
    color: '#4A5568',
  },
  card: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#2C3A61',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardImage: {
    width: '100%',
    height: 110,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'right',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'right',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
    paddingTop: 8,
  },
  cardReadTime: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
  },
});
