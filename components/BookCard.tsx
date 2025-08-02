import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

// تعريف الخصائص (Props) التي سيستقبلها مكون BookCard
interface BookCardProps {
  title: string; // عنوان الكتاب (اسم التصنيف)
  onPress: () => void; // دالة يتم استدعاؤها عند الضغط على الكتاب
}

const BookCard: React.FC<BookCardProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.bookSpine}>
        {/* هذا الجزء يمكن أن يحاكي كعب الكتاب إذا أردنا تفاصيل أكثر مستقبلاً */}
      </View>
      <View style={styles.bookCover}>
        <Text style={styles.bookTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 120, // عرض كل كتاب
    height: 180, // ارتفاع كل كتاب
    marginHorizontal: 8, // مسافة بين الكتب أفقياً
    marginBottom: 16, // مسافة أسفل الكتاب (لأسفل الرف)
    borderRadius: 8, // حواف دائرية للكتاب
    overflow: 'hidden', // مهم لقص أي محتوى يتجاوز الحواف الدائرية
    backgroundColor: '#D4C5B0', // لون بيج/بني فاتح يمثل لون الورق أو الغلاف الأساسي
    // أضف ظلال لإعطاء إحساس بالعمق وكأن الكتاب بارز
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // للأندرويد
    flexDirection: 'row', // لعرض كعب الكتاب بجانب الغلاف
  },
  bookSpine: {
    width: 15, // عرض كعب الكتاب
    height: '100%',
    backgroundColor: '#A08F79', // لون أغمق لكعب الكتاب
    borderRightWidth: 1,
    borderColor: '#8A7B68',
  },
  bookCover: {
    flex: 1, // يأخذ باقي المساحة المتاحة
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default BookCard;