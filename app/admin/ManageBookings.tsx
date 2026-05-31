import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../constants/theme";
import { adminGetBookings, adminUpdateBooking } from "../utils/api";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
interface AdminBooking { id: string; user: string; service: string; date: string; status: BookingStatus; price: string }

const STATUS_STYLE: Record<BookingStatus, { bg: string; text: string }> = {
  pending: { bg: "#fef3c7", text: "#92400e" },
  confirmed: { bg: "#d1fae5", text: "#065f46" },
  completed: { bg: "#dbeafe", text: "#1e40af" },
  cancelled: { bg: "#fee2e2", text: "#991b1b" },
};

const FILTERS: (BookingStatus | "all")[] = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function ManageBookings() {
  const router = useRouter();
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      (async () => {
        try {
          const raw: any[] = await adminGetBookings();
          if (active) setBookings(raw.map((b) => ({
            id: b.id,
            user: b.users?.name || b.user_name || b.user_id || 'Unknown',
            service: b.meta?.serviceType || b.meta?.service || b.package_id || 'Service',
            date: (b.date || b.created_at || '').substring(0, 10),
            status: (b.status === 'paid' ? 'confirmed' : b.status) as BookingStatus,
            price: String(b.meta?.price || b.amount || 0),
          })));
        } catch { /* show empty */ }
        if (active) setLoading(false);
      })();
      return () => { active = false; };
    }, [])
  );

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const updateStatus = async (id: string, newStatus: BookingStatus) => {
    try {
      await adminUpdateBooking(id, { status: newStatus });
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
    } catch (e: any) {
      Alert.alert("Error", e?.error || "Update failed.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Manage Bookings</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {FILTERS.map((f) => (
          <Pressable key={f} style={[styles.filterBtn, filter === f && styles.filterBtnActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {loading ? <ActivityIndicator style={{ marginTop: 40 }} color="#164A40" /> : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const sc = STATUS_STYLE[item.status];
            return (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.user}>{item.user}</Text>
                  <View style={[styles.badge, { backgroundColor: sc.bg }]}>
                    <Text style={[styles.badgeText, { color: sc.text }]}>{item.status}</Text>
                  </View>
                </View>
                <Text style={styles.service}>{item.service} · {item.date}</Text>
                <Text style={styles.price}>PKR {Number(item.price).toLocaleString()}</Text>
                {item.status === "pending" && (
                  <View style={styles.actionRow}>
                    <Pressable style={styles.approveBtn} onPress={() => updateStatus(item.id, "confirmed")}>
                      <Text style={styles.approveTxt}>Approve</Text>
                    </Pressable>
                    <Pressable style={styles.rejectBtn} onPress={() => updateStatus(item.id, "cancelled")}>
                      <Text style={styles.rejectTxt}>Reject</Text>
                    </Pressable>
                  </View>
                )}
                {item.status === "confirmed" && (
                  <Pressable style={styles.completeBtn} onPress={() => updateStatus(item.id, "completed")}>
                    <Text style={styles.completeTxt}>Mark Complete</Text>
                  </Pressable>
                )}
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingTop: 8, marginTop: 16, marginBottom: 10 },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  backText: { color: "#fff", fontWeight: "700" },
  headerTitle: { flex: 1, marginLeft: 12, fontSize: 18, fontWeight: "800" },
  filterScroll: { paddingHorizontal: 18, marginBottom: 12, flexGrow: 0 },
  filterBtn: { borderWidth: 1, borderColor: "#164A40", borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14, marginRight: 8 },
  filterBtnActive: { backgroundColor: "#164A40" },
  filterText: { color: "#164A40", fontWeight: "600", fontSize: 13 },
  filterTextActive: { color: "#fff" },
  list: { paddingHorizontal: 18, paddingBottom: 30 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 5, elevation: 2 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  user: { fontSize: 15, fontWeight: "700", color: "#111" },
  badge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 12, fontWeight: "600" },
  service: { color: "#666", fontSize: 13, marginBottom: 2 },
  price: { color: "#164A40", fontWeight: "700", fontSize: 14, marginBottom: 10 },
  actionRow: { flexDirection: "row", gap: 10 },
  approveBtn: { flex: 1, backgroundColor: "#d1fae5", borderRadius: 10, paddingVertical: 9, alignItems: "center" },
  approveTxt: { color: "#065f46", fontWeight: "700" },
  rejectBtn: { flex: 1, backgroundColor: "#fee2e2", borderRadius: 10, paddingVertical: 9, alignItems: "center" },
  rejectTxt: { color: "#dc2626", fontWeight: "700" },
  completeBtn: { backgroundColor: "#dbeafe", borderRadius: 10, paddingVertical: 9, alignItems: "center" },
  completeTxt: { color: "#1e40af", fontWeight: "700" },
});
