import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const dates = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const times = [
  '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm',
  '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm',
  '6:00 pm', '7:00 pm', '8:00 pm'
];

export default function QuranRecitation() {
  const router = useRouter();
  const [month, setMonth] = useState('March');
  const [date, setDate] = useState('15');
  const [time, setTime] = useState('4:00 pm');

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
        <TouchableOpacity>
          <Ionicons name="search" size={22} color="#0a3d3d" />
        </TouchableOpacity>
      </View>
      {/* Image */}
      <Image source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }} style={styles.mainImg} />
      {/* Title and Description */}
      <Text style={styles.title}>Quran Recitation</Text>
      <Text style={styles.desc}>
        We provide dignified Quran and Dua recitation services to offer peace, blessings, and spiritual comfort.\nEach recitation is delivered with sincerity and devotion, bringing solace during moments of remembrance.\nOur services honor tradition while offering emotional and spiritual support.\nA meaningful way to connect with the Divine and express heartfelt prayers.
      </Text>
      {/* Book a Slot */}
      <Text style={styles.slotLabel}>Book a Slot</Text>
      <View style={styles.slotRow}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={date}
            onValueChange={setDate}
            style={styles.picker}
            dropdownIconColor="#0a3d3d"
            itemStyle={styles.pickerItem}
          >
            {dates.map(d => <Picker.Item key={d} label={d} value={d} />)}
          </Picker>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={month}
            onValueChange={setMonth}
            style={styles.picker}
            dropdownIconColor="#0a3d3d"
            itemStyle={styles.pickerItem}
          >
            {months.map(m => <Picker.Item key={m} label={m} value={m} />)}
          </Picker>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={time}
            onValueChange={setTime}
            style={styles.picker}
            dropdownIconColor="#0a3d3d"
            itemStyle={styles.pickerItem}
          >
            {times.map(t => <Picker.Item key={t} label={t} value={t} />)}
          </Picker>
        </View>
      </View>
      <TouchableOpacity style={styles.bookNowBtn} onPress={() => router.push({ pathname: '/BookingDetails', params: { source: 'QuranRecitation' } })}>
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
  mainImg: { width: '92%', height: 140, borderRadius: 14, alignSelf: 'center', marginBottom: 12, marginTop: 2 },
  title: { fontWeight: 'bold', fontSize: 17, color: '#222', textAlign: 'center', marginTop: 8, marginBottom: 4 },
  desc: { color: '#444', fontSize: 13, textAlign: 'center', marginHorizontal: 18, marginBottom: 12, lineHeight: 18 },
  slotLabel: { fontWeight: 'bold', fontSize: 15, color: '#222', marginLeft: 18, marginTop: 8, marginBottom: 8 },
  slotRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 18 },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#0a3d3d',
    marginHorizontal: 6,
    flex: 1,
    overflow: 'hidden',
  },
  picker: {
    height: 48,
    minWidth: '100%',
    color: '#0a3d3d',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  pickerItem: {
    fontSize: 16,
    color: '#0a3d3d',
    height: 48,
  },
  bookNowBtn: { backgroundColor: '#0a3d3d', borderRadius: 10, marginHorizontal: 80, marginTop: 8, paddingVertical: 14, alignItems: 'center', marginBottom: 18 },
  bookNowBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
}); 