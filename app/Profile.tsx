import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/HelpCenter')}>
          <Ionicons name="headset-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>
      {/* Avatar and Edit */}
      <View style={styles.avatarSection}>
        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Text style={styles.editLabel}>Edit Profile</Text>
          <Feather name="edit-2" size={16} color="#0a3d3d" style={{ marginLeft: 6 }} />
        </View>
      </View>
      {/* Profile Fields */}
      <View style={styles.fieldBox}><Text style={styles.fieldLabel}>Name</Text><Text style={styles.fieldValue}>Muhammad John</Text></View>
      <View style={styles.fieldBox}><Text style={styles.fieldLabel}>Email</Text><Text style={styles.fieldValue}>john786@gmail.com</Text></View>
      <View style={styles.fieldBox}><Text style={styles.fieldLabel}>Phone</Text><Text style={styles.fieldValue}>+44 7413 013779</Text></View>
      <View style={styles.fieldBox}><Text style={styles.fieldLabel}>Address</Text><Text style={styles.fieldValue}>64-A Lawrence Road Lahore</Text></View>
      <View style={styles.fieldBox}><Text style={styles.fieldLabel}>Payment</Text><Text style={styles.fieldValue}>Debit Card</Text></View>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn}>
        <Text style={styles.backBtnText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 18, paddingBottom: 8 },
  avatarSection: { alignItems: 'center', marginTop: 12, marginBottom: 18 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#eee' },
  editLabel: { color: '#0a3d3d', fontWeight: 'bold', fontSize: 16 },
  fieldBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#0a3d3d', borderRadius: 12, marginHorizontal: 18, marginBottom: 16, paddingVertical: 14, paddingHorizontal: 16, backgroundColor: '#fff' },
  fieldLabel: { fontWeight: 'bold', color: '#0a3d3d', fontSize: 15, width: 90 },
  fieldValue: { color: '#222', fontSize: 15, marginLeft: 8, flex: 1 },
  backBtn: { backgroundColor: '#0a3d3d', borderRadius: 10, marginHorizontal: 100, marginTop: 18, paddingVertical: 12, alignItems: 'center' },
  backBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 