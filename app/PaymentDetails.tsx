import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PaymentDetails() {
  const [isVisa, setIsVisa] = useState(true);
  const [isMaster, setIsMaster] = useState(false);
  const [saveCard, setSaveCard] = useState(true);
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
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
      <Text style={styles.title}>Payment</Text>
      {/* Form Card */}
      <View style={styles.formCard}>
        <Text style={styles.sectionLabel}>Debit Card</Text>
        <View style={styles.cardTypeRow}>
          <TouchableOpacity style={styles.cardType} onPress={() => { setIsVisa(true); setIsMaster(false); }}>
            <View style={[styles.checkboxBox, isVisa && styles.checkboxBoxChecked]}>
              {isVisa && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.cardTypeLabel}>Visa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardType} onPress={() => { setIsVisa(false); setIsMaster(true); }}>
            <View style={[styles.checkboxBox, isMaster && styles.checkboxBoxChecked]}>
              {isMaster && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.cardTypeLabel}>Master card</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.input} placeholder="Name on your card" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Card number" placeholderTextColor="#888" keyboardType="numeric" />
        <View style={styles.row}>
          <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} placeholder="expiry" placeholderTextColor="#888" />
          <TextInput style={[styles.input, { flex: 1, marginLeft: 8 }]} placeholder="cvv" placeholderTextColor="#888" keyboardType="numeric" />
        </View>
        <View style={styles.checkboxRow}>
          <TouchableOpacity style={styles.checkbox} onPress={() => setSaveCard(v => !v)}>
            <View style={[styles.checkboxBox, saveCard && styles.checkboxBoxChecked]}>
              {saveCard && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>Save your card information for later use</Text>
          </TouchableOpacity>
        </View>
        {/* Details Section */}
        <Text style={styles.detailsLabel}>Details</Text>
        <TextInput style={styles.detailInput} value="Meadow Cemetary Plot no. F8" editable={false} />
        <TextInput style={styles.detailInput} value="Price: 57000 Rs." editable={false} />
        <TouchableOpacity style={styles.confirmBtn} onPress={() => router.push('/BookingConfirmed')}>
          <Text style={styles.confirmBtnText}>Confirm Payment</Text>
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
  sectionLabel: { fontWeight: 'bold', fontSize: 15, color: '#222', marginBottom: 8 },
  cardTypeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardType: { flexDirection: 'row', alignItems: 'center', marginRight: 18 },
  cardTypeLabel: { color: '#222', fontSize: 15, marginLeft: 4 },
  checkboxBox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: '#0a3d3d', marginRight: 8, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  checkboxBoxChecked: { backgroundColor: '#0a3d3d', borderColor: '#0a3d3d' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0a3d3d', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 14, fontSize: 15, marginBottom: 12, color: '#222' },
  row: { flexDirection: 'row', marginBottom: 12 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  checkbox: { flexDirection: 'row', alignItems: 'center' },
  checkboxLabel: { color: '#222', fontSize: 14 },
  detailsLabel: { fontWeight: 'bold', fontSize: 15, color: '#222', marginTop: 12, marginBottom: 8 },
  detailInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#0a3d3d', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 14, fontSize: 15, marginBottom: 10, color: '#0a3d3d', fontWeight: 'bold' },
  confirmBtn: { backgroundColor: '#0a3d3d', borderRadius: 10, marginTop: 8, paddingVertical: 12, alignItems: 'center' },
  confirmBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 