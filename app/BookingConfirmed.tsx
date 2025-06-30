import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BookingConfirmed() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={64} color="#fff" />
        </View>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Thank you for your purchase.{"\n"}You will get email soon.</Text>
      </View>
      <TouchableOpacity style={styles.nextBtn} onPress={() => router.push('/Home')}>
        <Ionicons name="arrow-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  checkCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#43B02A', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  title: { fontWeight: 'bold', fontSize: 20, color: '#0a3d3d', textAlign: 'center', marginBottom: 6 },
  subtitle: { color: '#0a3d3d', fontSize: 13, textAlign: 'center', marginBottom: 12 },
  nextBtn: { position: 'absolute', bottom: 60, alignSelf: 'center', backgroundColor: '#0a3d3d', borderRadius: 25, padding: 12, alignItems: 'center', justifyContent: 'center' },
}); 