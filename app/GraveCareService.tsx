import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GraveCareService() {
  const [selected, setSelected] = useState('Weekly');
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
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput placeholder="Search graveyard....." placeholderTextColor="#888" style={styles.searchInput} />
        <TouchableOpacity style={styles.filterBtn}>
          <Feather name="sliders" size={18} color="#0a3d3d" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color="#0a3d3d" />
        </TouchableOpacity>
      </View>
      {/* Image */}
      <Image source={{ uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80' }} style={styles.mainImg} />
      {/* Title and Description */}
      <Text style={styles.title}>Grave Care Service</Text>
      <Text style={styles.desc}>
        We offer professional grave cleaning and maintenance services carried out with the utmost respect and care. Our team ensures each resting place is kept clean, dignified, and well-maintained. We understand the emotional value of these sites and treat every grave with the reverence it deserves. Trust us to preserve the memory of your loved ones with compassion and dedication.
      </Text>
      {/* Book a Package */}
      <Text style={styles.slotLabel}>Book a Package</Text>
      <View style={styles.slotRow}>
        {['1 day', 'Weekly', 'Monthly'].map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.slotPill, selected === option && styles.slotPillActive]}
            onPress={() => setSelected(option)}
          >
            <Text style={[styles.slotPillText, selected === option && styles.slotPillTextActive]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.bookNowBtn} onPress={() => router.push({ pathname: '/BookingDetails', params: { source: 'GraveCareService' } })}>
        <Text style={styles.bookNowBtnText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 8 },
  topBarRight: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#eee' },
  searchSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f6f6f6', borderRadius: 12, marginHorizontal: 16, marginBottom: 10, paddingHorizontal: 10, paddingVertical: 6 },
  searchInput: { flex: 1, color: '#222', fontSize: 15, paddingVertical: 6 },
  filterBtn: { backgroundColor: '#fff', borderRadius: 8, padding: 4, marginRight: 8, marginLeft: 4 },
  mainImg: { width: '92%', height: 140, borderRadius: 14, alignSelf: 'center', marginBottom: 12, marginTop: 2 },
  title: { fontWeight: 'bold', fontSize: 17, color: '#222', textAlign: 'center', marginTop: 8, marginBottom: 4 },
  desc: { color: '#444', fontSize: 13, textAlign: 'center', marginHorizontal: 18, marginBottom: 12, lineHeight: 18 },
  slotLabel: { fontWeight: 'bold', fontSize: 15, color: '#222', marginLeft: 18, marginTop: 8, marginBottom: 8 },
  slotRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 18 },
  slotPill: { backgroundColor: '#fff', borderRadius: 18, paddingVertical: 8, paddingHorizontal: 22, marginHorizontal: 6, borderWidth: 1.5, borderColor: '#0a3d3d' },
  slotPillActive: { backgroundColor: '#0a3d3d' },
  slotPillText: { color: '#0a3d3d', fontWeight: 'bold', fontSize: 15 },
  slotPillTextActive: { color: '#fff' },
  bookNowBtn: { backgroundColor: '#0a3d3d', borderRadius: 10, marginHorizontal: 80, marginTop: 8, paddingVertical: 14, alignItems: 'center', marginBottom: 18 },
  bookNowBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
}); 