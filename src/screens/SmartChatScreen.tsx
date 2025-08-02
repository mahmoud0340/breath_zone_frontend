import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import global_styles from '../core/global_styles';

// --- Types and Dummy Data ---
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'أهلاً بك. أنا صديقك الداعم هنا في Breath Zone. كيف تشعر اليوم؟ أنا هنا للاستماع.',
    sender: 'assistant',
  },
];

const suggestionPrompts = [
  'أشعر ببعض القلق',
  'أريد أن أتحدث عن يومي',
  'كيف يمكنني الاسترخاء؟',
];

// --- Main Component ---
export default function SmartChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      text: inputText,
      sender: 'user',
    };

    // Use functional update to get the latest state
    setMessages((prevMessages) => [userMessage, ...prevMessages]);
    setInputText('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const assistantResponse: Message = {
        id: Math.random().toString(),
        text: 'شكراً لمشاركتي هذا. هل يمكنك إخباري المزيد عن هذا الشعور؟',
        sender: 'assistant',
      };
      setMessages((prevMessages) => [assistantResponse, ...prevMessages]);
    }, 1000);
  };

  const handleSuggestionPress = (prompt: string) => {
    setInputText(prompt);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageRow,
          { justifyContent: isUser ? 'flex-end' : 'flex-start' },
        ]}
      >
        {!isUser && (
          <View style={styles.avatar}>
            <FontAwesome5 name="robot" size={20} color="#5A67D8" />
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.assistantBubble,
          ]}
        >
          <Text
            style={
              isUser ? styles.userMessageText : styles.assistantMessageText
            }
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={global_styles.droidSafeArea}>
      {/* --- Header --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>المساعد الذكي</Text>
        <TouchableOpacity>
          <Ionicons name="close" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.chatArea}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10 }}
          inverted // This is key for chat UIs
        />

        {/* --- Suggestion Chips --- */}
        <View style={styles.suggestionContainer}>
          {suggestionPrompts.map((prompt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => handleSuggestionPress(prompt)}
            >
              <Text style={styles.suggestionText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- Input Bar --- */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="اكتب رسالتك هنا..."
            placeholderTextColor="#A0AEC0"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  chatArea: {
    flex: 1,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E9E1F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#5A67D8',
    borderBottomRightRadius: 5,
  },
  assistantBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 5,
    elevation: 1,
    shadowColor: '#2C3A61',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
  },
  assistantMessageText: {
    color: '#2D3748',
    fontSize: 15,
    lineHeight: 22,
  },
  suggestionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  suggestionChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  suggestionText: {
    color: '#4A5568',
    fontSize: 13,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2D3748',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5A67D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
