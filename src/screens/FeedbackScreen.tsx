import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

const StarRating = ({ rating, onChange }: { rating: number; onChange: (r: number) => void }) => (
    <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => onChange(star)}>
                <Text style={star <= rating ? styles.starSelected : styles.star}>★</Text>
            </TouchableOpacity>
        ))}
    </View>
);

export default function FeedbackScreen() {
    const [feedback, setFeedback] = useState('');
    const [name, setName] = useState('');
    const [stars, setStars] = useState(0);

    const handleSubmit = () => {
        if (!feedback.trim()) {
            Alert.alert('تنبيه', 'يرجى كتابة تجربتك أو رأيك قبل الإرسال.');
            return;
        }
        if (stars === 0) {
            Alert.alert('تنبيه', 'يرجى اختيار عدد النجوم للتقييم.');
            return;
        }
        // هنا يمكنك إرسال المراجعة إلى السيرفر أو حفظها محلياً
        Alert.alert('شكراً لك!', 'تم إرسال تقييمك بنجاح.');
        setFeedback('');
        setName('');
        setStars(0);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.box}>
                <Text style={styles.title}>📝 شاركنا تجربتك مع التطبيق</Text>
                <Text style={styles.label}>اسمك (اختياري):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="اكتب اسمك هنا..."
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>عدد النجوم:</Text>
                <StarRating rating={stars} onChange={setStars} />
                <Text style={styles.label}>تقييمك أو تجربتك:</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="اكتب رأيك أو تجربتك بصراحة..."
                    value={feedback}
                    onChangeText={setFeedback}
                    multiline
                    numberOfLines={5}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>إرسال التقييم</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 350,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1976D2',
        marginBottom: 18,
        textAlign: 'center',
    },
    label: {
        fontSize: 15,
        color: '#333',
        marginBottom: 6,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#BBDEFB',
        color: '#333',
    },
    textArea: {
        minHeight: 90,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#1976D2',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        marginTop: 4,
    },
    star: {
        fontSize: 28,
        color: '#BBDEFB',
        marginHorizontal: 2,
    },
    starSelected: {
        fontSize: 28,
        color: '#FFD700',
        marginHorizontal: 2,
    },
});