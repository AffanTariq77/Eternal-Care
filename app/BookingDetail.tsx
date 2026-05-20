import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarButton from "../components/ui/avatar-button";
import { Colors } from "../constants/theme";

// TODO: replace with api.getBooking(id)
const MOCK: Record<string, any> = {
  b1: { id: "b1", service: "Grave Booking", detail: "Plot A3 — Karachi Muslim Graveyard", date: "2026-06-10", price: "15000", status: "upcoming", packageId: "grave_g1_A3", name: "Muhammad Test", email: "test@example.com", phone: "03001234567" },
  b2: { id: "b2", service: "Quran Recitation", detail: "Session with Qari Abdul Rahman", date: "2026-05-25", price: "1200", status: "upcoming", packageId: "quran_r1_0900AM" },
  b3: { id: "b3", service: "Memorial Care", detail: "Weekly Care Plan", date: "2026-03-01", price: "8000", status: "completed", packageId: "gravecare_weekly" },
};

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  upcoming: { bg: "#d1fae5", text: "#065f46" },
  completed: { bg: "#dbeafe", text: "#1e40af" },
  cancelled: { bg: "#fee2e2", text: "#991b1b" },
};

export default function BookingDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    // TODO: api.getBooking(id).then(d => setBooking(d.booking))
    setTimeout(() => {
      setBooking(MOCK[id] || null);
      setLoading(false);
    }, 300);
  }, [id]);

  const handleCancel = () => {
    Alert.alert("Cancel Booking", "Are you sure you want to cancel this booking?", [
      { text: "No" },
      {
        text: "Yes, Cancel",
        style: "destructive",
        onPress: async () => {
          setCancelling(true);
          // TODO: await api.cancelBooking(id);
          await new Promise((r) => setTimeout(r, 400));
          setCancelling(false);
          (router as any).back();
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color="#164A40" />;

  if (!booking) return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Booking Detail</Text>
        <AvatarButton size={36} />
      </View>
      <Text style={styles.empty}>Booking not found.</Text>
    </SafeAreaView>
  );

  const sc = STATUS_COLOR[booking.status] || STATUS_COLOR.completed;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Booking Detail</Text>
        <AvatarButton size={36} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.statusBanner}>
          <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
            <Text style={[styles.statusText, { color: sc.text }]}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Text>
          </View>
          <Text style={styles.bookingId}>#{booking.id.toUpperCase()}</Text>
        </View>

        <View style={styles.card}>
          {[
            ["Service", booking.service],
            ["Detail", booking.detail],
            ["Date", booking.date],
            ["Package", booking.packageId],
            ["Price", `PKR ${Number(booking.price).toLocaleString()}`],
          ].map(([label, value]) => (
            <View key={label}>
              <View style={styles.row}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
              <View style={styles.divider} />
            </View>
          ))}
        </View>

        {booking.status === "upcoming" && (
          <Pressable
            style={[styles.cancelBtn, cancelling && { opacity: 0.6 }]}
            onPress={handleCancel}
            disabled={cancelling}
          >
            {cancelling
              ? <ActivityIndicator color="#dc2626" />
              : <Text style={styles.cancelBtnText}>Cancel Booking</Text>
            }
          </Pressable>
        )}

        {booking.status === "completed" && booking.service === "Memorial Care" && (
          <Pressable
            style={styles.reportBtn}
            onPress={() => (router as any).push({ pathname: "/ServiceReport", params: { bookingId: id } })}
          >
            <Text style={styles.reportBtnText}>View Service Report</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff" },
  header: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 18, paddingTop: 8, marginTop: 16, marginBottom: 8,
  },
  back: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: "#000",
    alignItems: "center", justifyContent: "center",
  },
  backText: { color: "#fff", fontWeight: "700" },
  headerTitle: { flex: 1, marginLeft: 12, fontSize: 18, fontWeight: "800" },
  content: { paddingHorizontal: 18, paddingBottom: 40 },
  statusBanner: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  statusBadge: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 6 },
  statusText: { fontWeight: "700", fontSize: 14 },
  bookingId: { color: "#aaa", fontSize: 13 },
  card: {
    backgroundColor: "#fff", borderRadius: 16, padding: 18,
    shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 8, elevation: 3, marginBottom: 20,
  },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 13 },
  divider: { height: 1, backgroundColor: "#f0f0f0" },
  label: { color: "#888", fontSize: 14 },
  value: { color: "#111", fontWeight: "600", fontSize: 14, maxWidth: "60%", textAlign: "right" },
  cancelBtn: {
    borderWidth: 2, borderColor: "#dc2626", borderRadius: 24, paddingVertical: 14,
    alignItems: "center", marginBottom: 12,
  },
  cancelBtnText: { color: "#dc2626", fontWeight: "700", fontSize: 15 },
  reportBtn: {
    backgroundColor: "#164A40", borderRadius: 24, paddingVertical: 14, alignItems: "center",
  },
  reportBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  empty: { textAlign: "center", color: "#999", marginTop: 60 },
});
