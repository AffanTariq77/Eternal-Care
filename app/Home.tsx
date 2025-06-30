import { Feather, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const services = [
  {
    title: 'Respectful Booking',
    desc: 'Seamless grave booking services with respect and care for your loved ones.',
    img: require('../assets/images/service1.png'), // Replace with your own
  },
  {
    title: 'Spiritual Comfort',
    desc: 'Providing dignified Quran and Dua recitation services for peace, blessings, and spiritual comfort',
    img: require('../assets/images/service2.png'), // Replace with your own
  },
  {
    title: 'Memorial Care',
    desc: 'Professional grave cleaning and maintenance with respect and care.',
    img: require('../assets/images/service3.png'), // Replace with your own
  },
];

export default function Home() {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [service, setService] = useState('');

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Feather name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <View style={styles.topBarRight}>
          <TouchableOpacity onPress={() => router.push('/HelpCenter')}>
            <Ionicons name="headset-outline" size={24} color="#222" style={{ marginRight: 12 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/Profile')}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
          </TouchableOpacity>
          <Ionicons name="notifications" size={24} color="#222" style={{ marginLeft: 12 }} />
        </View>
      </View>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <TextInput placeholder="Search graveyard....." placeholderTextColor="#eee" style={styles.searchInput} />
          <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
            <Feather name="sliders" size={18} color="#0a3d3d" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search" size={22} color="#0a3d3d" />
          </TouchableOpacity>
        </View>
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
      {/* Service Cards */}
      <ScrollView contentContainerStyle={styles.cardsScroll} showsVerticalScrollIndicator={false}>
        {services.map((service, idx) => (
          <View key={idx} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.cardDesc}>{service.desc}</Text>
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={
                  idx === 0
                    ? () => router.push('/GraveyardBooking')
                    : idx === 1
                    ? () => router.push('/QuranRecitation')
                    : idx === 2
                    ? () => router.push('/GraveCareService')
                    : undefined
                }
              >
                <Text style={styles.bookBtnText}>Book Now</Text>
              </TouchableOpacity>
            </View>
            <Image source={service.img} style={styles.cardImg} resizeMode="contain" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 8 },
  topBarRight: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#eee' },
  searchSection: { backgroundColor: '#0a3d3d', borderRadius: 18, marginHorizontal: 12, marginBottom: 10, padding: 12, marginTop: 0 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0a3d3d', borderRadius: 12, paddingHorizontal: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 15, paddingVertical: 8 },
  filterBtn: { backgroundColor: '#fff', borderRadius: 8, padding: 4, marginRight: 8, marginLeft: 4 },
  cardsScroll: { paddingHorizontal: 12, paddingBottom: 24 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, marginTop: 16, padding: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8 },
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: '#111', marginBottom: 4 },
  cardDesc: { color: '#444', fontSize: 13, marginBottom: 10 },
  bookBtn: { backgroundColor: '#0a3d3d', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 18, alignSelf: 'flex-start' },
  bookBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  cardImg: { width: 80, height: 80, marginLeft: 12 },
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
}); 