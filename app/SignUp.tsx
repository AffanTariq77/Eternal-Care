import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#222" />
      </TouchableOpacity>
      <Text style={styles.heading}>Go ahead and setup{"\n"}your account.</Text>
      <View style={styles.formCard}>
        <View style={styles.tabRow}>
          <TouchableOpacity style={styles.tabBtn} onPress={() => router.replace('/Login')}>
            <Text style={styles.tabText}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabBtn, styles.tabBtnActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Your Full Name</Text>
          <View style={styles.inputField}>
            <Ionicons name="person-outline" size={18} color="#222" style={{ marginRight: 8 }} />
            <TextInput placeholder="Your Full Name" style={styles.input} placeholderTextColor="#888" />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Your Email</Text>
          <View style={styles.inputField}>
            <FontAwesome name="envelope-o" size={18} color="#222" style={{ marginRight: 8 }} />
            <TextInput placeholder="Your Email" style={styles.input} placeholderTextColor="#888" />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Create Password</Text>
          <View style={styles.inputField}>
            <Ionicons name="lock-closed-outline" size={18} color="#222" style={{ marginRight: 8 }} />
            <TextInput placeholder="Create Password" style={styles.input} placeholderTextColor="#888" secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={() => setShowPassword(v => !v)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR LOGIN WITH</Text>
        <View style={styles.socialRow}>
          <FontAwesome name="facebook" size={24} color="#1877f3" style={styles.socialIcon} />
          <FontAwesome name="google" size={24} color="#ea4335" style={styles.socialIcon} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  backBtn: { marginTop: 16, marginLeft: 16, width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#111', marginTop: 16, marginLeft: 24, marginBottom: 24 },
  formCard: { backgroundColor: '#0a3d3d', borderRadius: 18, marginHorizontal: 16, padding: 20, marginTop: 0 },
  tabRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  tabBtnActive: { backgroundColor: '#fff' },
  tabText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  tabTextActive: { color: '#0a3d3d' },
  inputGroup: { marginBottom: 16 },
  inputLabel: { color: '#fff', marginBottom: 6, marginLeft: 2, fontSize: 13 },
  inputField: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, height: 40 },
  input: { flex: 1, color: '#222', fontSize: 15 },
  loginBtn: { backgroundColor: '#222', borderRadius: 8, marginTop: 16, paddingVertical: 10, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  orText: { color: '#fff', textAlign: 'center', marginVertical: 16, fontSize: 13, letterSpacing: 1 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 0 },
  socialIcon: { marginHorizontal: 12 },
}); 