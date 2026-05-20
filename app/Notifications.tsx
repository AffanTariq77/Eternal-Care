import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarButton from "../components/ui/avatar-button";
import { Colors } from "../constants/theme";

interface Notif {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "booking" | "payment" | "service" | "system";
}

const MOCK_NOTIFS: Notif[] = [
  { id: "n1", title: "Booking Confirmed", body: "Your grave booking for Plot A3 has been confirmed.", time: "2 mins ago", read: false, type: "booking" },
  { id: "n2", title: "Payment Received", body: "PKR 15,000 payment received for booking #B1.", time: "5 mins ago", read: false, type: "payment" },
  { id: "n3", title: "Service Completed", body: "Memorial care for Weekly Plan has been completed. View your report.", time: "1 day ago", read: true, type: "service" },
  { id: "n4", title: "Booking Reminder", body: "You have a Quran Recitation session tomorrow at 9:00 AM.", time: "2 days ago", read: true, type: "booking" },
  { id: "n5", title: "Welcome to Eternal Care", body: "Thank you for joining. We are here for you.", time: "5 days ago", read: true, type: "system" },
];

const TYPE_COLOR: Record<Notif["type"], string> = {
  booking: "#164A40",
  payment: "#059669",
  service: "#7c3aed",
  system: "#6b7280",
};

export default function Notifications() {
  const router = useRouter();
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <AvatarButton size={36} />
      </View>

      {unreadCount > 0 && (
        <Pressable style={styles.markAllWrap} onPress={markAllRead}>
          <Text style={styles.markAllText}>Mark all as read ({unreadCount})</Text>
        </Pressable>
      )}

      <FlatList
        data={notifs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, !item.read && styles.cardUnread]}
            onPress={() => setNotifs((prev) => prev.map((n) => n.id === item.id ? { ...n, read: true } : n))}
          >
            <View style={[styles.typeDot, { backgroundColor: TYPE_COLOR[item.type] }]} />
            <View style={styles.cardBody}>
              <Text style={[styles.title, !item.read && styles.titleBold]}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notifications.</Text>}
      />
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
  markAllWrap: { paddingHorizontal: 18, paddingBottom: 10, alignItems: "flex-end" },
  markAllText: { color: "#164A40", fontWeight: "600", fontSize: 13 },
  list: { paddingHorizontal: 18, paddingBottom: 30 },
  card: {
    backgroundColor: "#fff", borderRadius: 14, padding: 14, marginBottom: 10,
    flexDirection: "row", alignItems: "flex-start",
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardUnread: { backgroundColor: "#f0faf5" },
  typeDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4, marginRight: 12 },
  cardBody: { flex: 1 },
  title: { fontSize: 14, color: "#333", marginBottom: 3 },
  titleBold: { fontWeight: "700", color: "#111" },
  body: { color: "#555", fontSize: 13, lineHeight: 19, marginBottom: 4 },
  time: { color: "#aaa", fontSize: 11 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#164A40", marginLeft: 8, marginTop: 4 },
  empty: { textAlign: "center", color: "#999", marginTop: 40 },
});
