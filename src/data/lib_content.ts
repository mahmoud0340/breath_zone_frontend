export interface ContentItem {
  id: string;
  categoryKey:
    | 'motivational_stories'
    | 'literary_excerpts'
    | 'book_summaries'
    | 'psychological_messages';
  title: string;
  description: string;
  readTime: number; // in minutes
  imageUri: string;
}
export const allContentData: ContentItem[] = [
  {
    id: '1',
    categoryKey: 'motivational_stories',
    title: 'رحلة الهدوء الداخلي',
    description: 'قصة ملهمة عن التغلب على القلق',
    readTime: 5,
    imageUri:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/060832eee4-d07e818b27368bb2faa2.png',
  },
  {
    id: '2',
    categoryKey: 'literary_excerpts',
    title: 'حكمة جبران خليل جبران',
    description: 'مقتطفات من كتاب النبي',
    readTime: 7,
    imageUri:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/7e10338efb-491211486794da5fbc59.png',
  },
  {
    id: '3',
    categoryKey: 'book_summaries',
    title: 'فن الحياة البسيطة',
    description: 'خلاصة كتاب تطوير الذات',
    readTime: 10,
    imageUri:
      'https://storage.googleapis.com/uxpilot-auth.appspot.com/3ec350c892-1e1b1402d1ae2f50c0f9.png',
  },
  {
    id: '4',
    categoryKey: 'psychological_messages',
    title: 'رسالة اليوم',
    description: 'كلمات دعم عاطفي يومية',
    readTime: 3,
    imageUri:
      'https://images.unsplash.com/photo-1494178270175-e96de2971df9?w=800&q=80',
  },
  {
    id: '5',
    categoryKey: 'motivational_stories',
    title: 'قوة البدايات الجديدة',
    description: 'كيف تبدأ من جديد بعد الفشل',
    readTime: 8,
    imageUri:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  },
  {
    id: '6',
    categoryKey: 'literary_excerpts',
    title: 'تأملات من الرومي',
    description: 'في الحب والحياة والوجود',
    readTime: 6,
    imageUri:
      'https://images.unsplash.com/photo-1501862702633-49237d16781b?w=800&q=80',
  },
];
