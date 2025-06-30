import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HelpCenter() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.replace('/Home')}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <View style={styles.topBarRight}>
          <TouchableOpacity onPress={() => router.push('/Profile')}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/HelpCenter')}>
            <Ionicons name="headset-outline" size={24} color="#222" style={{ marginLeft: 16 }} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Title */}
      <Text style={styles.needHelp}>Need Help?</Text>
      <Text style={styles.helpCenter}>Help Center</Text>
      {/* Illustration */}
      <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/support-2029366_1280.png' }} style={styles.illustration} />
      {/* Prompt */}
      <Text style={styles.prompt}>Tell us how we can help?</Text>
      {/* Form */}
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholder="First Name"
          placeholderTextColor="#888"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, { flex: 1, marginLeft: 8 }]}
          placeholder="Last Name"
          placeholderTextColor="#888"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.messageBox}>
        <TextInput
          style={styles.messageInput}
          placeholder="Leave us a message"
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 8 },
  needHelp: { color: '#0a3d3d', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 8 },
  helpCenter: { color: '#222', fontWeight: 'bold', fontSize: 26, textAlign: 'center', marginTop: 2, marginBottom: 8 },
  illustration: { width: 180, height: 120, alignSelf: 'center', marginVertical: 8, resizeMode: 'contain' },
  prompt: { color: '#222', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 8, marginBottom: 10 },
  row: { flexDirection: 'row', marginHorizontal: 18, marginBottom: 12 },
  input: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#0a3d3d', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, fontSize: 15, marginBottom: 12 },
  messageBox: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#0a3d3d', borderRadius: 12, marginHorizontal: 18, marginBottom: 18, minHeight: 80, padding: 0, justifyContent: 'flex-end' },
  messageInput: { paddingVertical: 12, paddingHorizontal: 16, fontSize: 15, minHeight: 60, color: '#222' },
  sendBtn: { position: 'absolute', right: 16, bottom: 10 },
  sendText: { color: '#0a3d3d', fontWeight: 'bold', fontSize: 15 },
  backBtn: { backgroundColor: '#0a3d3d', borderRadius: 10, marginHorizontal: 100, marginTop: 8, paddingVertical: 12, alignItems: 'center' },
  backBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  topBarRight: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
}); 