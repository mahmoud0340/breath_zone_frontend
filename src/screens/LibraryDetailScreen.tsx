import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// --- Main Component ---
export default function LibraryContentDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params as { item: any }; // Replace 'any' with your ContentItem type

  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* --- Header Image and Title --- */}
        <ImageBackground source={{ uri: item.imageUri }} style={styles.headerImage}>
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </ImageBackground>

        {/* --- Content Body --- */}
        <View style={styles.contentBody}>
            <View style={styles.metaContainer}>
                <Ionicons name="time-outline" size={16} color="#718096" />
                <Text style={styles.metaText}> {item.readTime} دقائق قراءة</Text>
            </View>
            <Text style={styles.bodyText}>
                {item.body}
            </Text>
        </View>

      </ScrollView>

      {/* --- Floating Action Bar --- */}
      <View style={styles.footerBar}>
        <TouchableOpacity style={styles.actionButton} onPress={toggleBookmark}>
            <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={24} color="#5A67D8" />
            <Text style={styles.actionButtonText}>{isBookmarked ? 'تم الحفظ' : 'حفظ المقال'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social-outline" size={24} color="#5A67D8" />
            <Text style={styles.actionButtonText}>مشاركة</Text>
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
    paddingBottom: 100, // Space for the footer bar
  },
  headerImage: {
    width: width,
    height: height * 0.4,
    justifyContent: 'space-between',
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    textAlign: 'right',
  },
  description: {
    fontSize: 16,
    color: '#E2E8F0',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    textAlign: 'right',
  },
  contentBody: {
    backgroundColor: '#F7F9FC',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25, // Creates the curved overlap effect
    padding: 25,
  },
  metaContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingBottom: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  metaText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
    marginRight: 6,
  },
  bodyText: {
    fontSize: 17,
    lineHeight: 30, // Crucial for readability
    color: '#2D3748',
    textAlign: 'right',
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20, // For home indicator on iPhones
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#5A67D8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});