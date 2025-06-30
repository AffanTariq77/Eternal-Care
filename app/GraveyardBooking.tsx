import { Feather, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GraveyardBooking() {
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [service, setService] = useState('');
  const [selectedPlot, setSelectedPlot] = useState('F8');
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
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
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput placeholder="Search graveyard....." placeholderTextColor="#888" style={styles.searchInput} />
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
          <Feather name="sliders" size={18} color="#0a3d3d" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color="#0a3d3d" />
        </TouchableOpacity>
      </View>
      {/* Filter Modal */}
      {showFilter && (
        <View style={styles.filterOverlay}>
          <Pressable style={styles.overlayTouchable} onPress={() => setShowFilter(false)} />
          <View style={styles.filterCardModal}>
            <Picker
              selectedValue={city}
              onValueChange={setCity}
              style={styles.picker}
              dropdownIconColor="#0a3d3d"
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select City" value="" />
              <Picker.Item label="City 1" value="city1" />
              <Picker.Item label="City 2" value="city2" />
            </Picker>
            <Picker
              selectedValue={area}
              onValueChange={setArea}
              style={styles.picker}
              dropdownIconColor="#0a3d3d"
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Area" value="" />
              <Picker.Item label="Area 1" value="area1" />
              <Picker.Item label="Area 2" value="area2" />
            </Picker>
            <Picker
              selectedValue={service}
              onValueChange={setService}
              style={styles.picker}
              dropdownIconColor="#0a3d3d"
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Service" value="" />
              <Picker.Item label="Service 1" value="service1" />
              <Picker.Item label="Service 2" value="service2" />
            </Picker>
            <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilter(false)}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Section Title */}
      <Text style={styles.sectionTitle}>GRAVEYARD BOOKING</Text>
      {/* Graveyard Image */}
      <Image source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }} style={styles.graveImg} />
      {/* Description */}
      <Text style={styles.cemeteryTitle}>Meadow Cemetary</Text>
      <Text style={styles.cemeteryDesc}>
        Meadow Cemetery offers a serene and respectful final resting place amidst nature's quiet beauty. Designed for peace and remembrance, it provides thoughtfully maintained grounds for honoring loved ones.
      </Text>
      {/* Book a Plot */}
      <Text style={styles.bookPlotTitle}>Book a Plot</Text>
      <View style={styles.plotRow}>
        {['F8', 'D5', 'N6', 'C2'].map(plot => (
          <TouchableOpacity
            key={plot}
            style={[styles.plotBtn, selectedPlot === plot && styles.plotBtnActive]}
            onPress={() => setSelectedPlot(plot)}
          >
            <Text style={[styles.plotBtnText, selectedPlot === plot && styles.plotBtnTextActive]}>{plot}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.bookNowBtn} onPress={() => router.push('/BookingDetails')}>
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
  filterOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  filterCardModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '85%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    zIndex: 11,
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
  applyBtn: { backgroundColor: '#0a3d3d', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 18, alignSelf: 'flex-start' },
  applyBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  sectionTitle: { fontWeight: 'bold', fontSize: 15, color: '#222', marginLeft: 18, marginTop: 8, marginBottom: 8 },
  graveImg: { width: '92%', height: 140, borderRadius: 14, alignSelf: 'center', marginBottom: 12, marginTop: 2 },
  cemeteryTitle: { fontWeight: 'bold', fontSize: 16, color: '#111', marginLeft: 18, marginTop: 8 },
  cemeteryDesc: { color: '#444', fontSize: 13, marginHorizontal: 18, marginTop: 6, marginBottom: 12 },
  bookPlotTitle: { fontWeight: 'bold', fontSize: 15, color: '#222', marginLeft: 18, marginTop: 8, marginBottom: 8 },
  plotRow: { flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 18, marginBottom: 18 },
  plotBtn: { borderWidth: 1.5, borderColor: '#0a3d3d', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 18, marginRight: 14, backgroundColor: '#fff', elevation: 1 },
  plotBtnActive: { backgroundColor: '#0a3d3d', elevation: 4 },
  plotBtnText: { color: '#0a3d3d', fontWeight: 'bold', fontSize: 16 },
  plotBtnTextActive: { color: '#fff' },
  bookNowBtn: { backgroundColor: '#0a3d3d', borderRadius: 10, marginHorizontal: 18, marginTop: 8, paddingVertical: 14, alignItems: 'center', marginBottom: 18 },
  bookNowBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
}); 