import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
};

export default function AnonChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const connectedUsers = Math.floor(Math.random() * 10) + 3; // عدد وهمي

  const replies = [
    '🙂 أنا معك، كمل كلامك',
    '🤝 شجاع إنك شاركت ده',
    '👂 سامعك، إحكي براحتك',
    '💭 شاركنا اللي حاسس بيه',
    '📣 كلنا هنا علشان نسمعك',
    '🫂 لست وحدك، إحنا معك',
  ];

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'me',
    };
    setMessages(prev => [newMessage, ...prev]);

    // رد عشوائي بعد ثانية ونص
    setTimeout(() => {
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const reply: Message = {
        id: Date.now() + 1,
        text: randomReply,
        sender: 'other',
      };
      setMessages(prev => [reply, ...prev]);
    }, 1500);

    setInput('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.message,
        item.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <SafeAreaView>
      <View style={styles.headerBox}>
        <Text style={styles.header}>💬 الدردشة المجهولة</Text>
        <Text style={styles.subHeader}>👥 يوجد الآن {connectedUsers} أشخاص في الغرفة</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="اكتب مشاعرك بدون اسم..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>إرسال</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  headerBox: {
    paddingVertical: 16,
    backgroundColor: '#BBDEFB',
    alignItems: 'center',
    borderBottomColor: '#90CAF9',
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  subHeader: {
    color: '#333',
    marginTop: 4,
  },
  message: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#BBDEFB',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#C8E6C9',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    borderColor: '#90CAF9',
    borderWidth: 1,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#64B5F6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
