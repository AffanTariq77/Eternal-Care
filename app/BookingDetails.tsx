import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function BookingDetails() {
  const [saveInfo, setSaveInfo] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const router = useRouter();
  const { source } = useLocalSearchParams();

  const handleBack = () => {
    if (source === 'GraveyardBooking') {
      router.replace('/GraveyardBooking');
    } else if (source === 'QuranRecitation') {
      router.replace('/QuranRecitation');
    } else if (source === 'GraveCareService') {
      router.replace('/GraveCareService');
    } else {
      router.back();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack}>
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
      <Text style={styles.title}>Enter Your details</Text>
      {/* Form */}
      <View style={styles.formCard}>
        <TextInput style={styles.input} placeholder="Your Full Name" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Your Email" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Your Phone Number" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Your CNIC Number" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Your Address" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Your City" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Postal Code" placeholderTextColor="#888" />
        <View style={styles.checkboxRow}>
          <TouchableOpacity style={styles.checkbox} onPress={() => setSaveInfo(v => !v)}>
            <View style={[styles.checkboxBox, saveInfo && styles.checkboxBoxChecked]}>
              {saveInfo && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>Save your information for later use</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxRow}>
          <TouchableOpacity style={styles.checkbox} onPress={() => setAcceptTerms(v => !v)}>
            <View style={[styles.checkboxBox, acceptTerms && styles.checkboxBoxChecked]}>
              {acceptTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>I have read all the terms and condition</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.nextBtn} onPress={() => router.push('/PaymentDetails')}>
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 8 },
  topBarRight: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#eee' },
  title: { fontWeight: 'bold', fontSize: 18, color: '#222', marginLeft: 18, marginTop: 8, marginBottom: 8 },
  formCard: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#0a3d3d', marginHorizontal: 12, marginTop: 0, padding: 16, marginBottom: 18 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0a3d3d', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 14, fontSize: 15, marginBottom: 12, color: '#222' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  checkbox: { flexDirection: 'row', alignItems: 'center' },
  checkboxBox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: '#0a3d3d', marginRight: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  checkboxBoxChecked: { backgroundColor: '#0a3d3d', borderColor: '#0a3d3d' },
  checkboxLabel: { color: '#222', fontSize: 14 },
  nextBtn: { backgroundColor: '#0a3d3d', borderRadius: 10, marginTop: 16, paddingVertical: 12, alignItems: 'center' },
  nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 