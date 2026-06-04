import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../constants/theme";
import { getToken } from "../../utils/authStore";

const API = process.env.EXPO_PUBLIC_API_URL ?? "";

const QUICK_LINKS = [
  { label: "Bookings", sub: "Approve & manage all bookings", route: "/admin/ManageBookings", accent: "#164A40" },
  { label: "Graveyards", sub: "Add, edit or remove graveyards", route: "/admin/ManageGraveyards", accent: "#164A40" },
  { label: "Plots", sub: "View & manage plots", route: "/admin/ManagePlots", accent: "#164A40" },
  { label: "Providers", sub: "Quran & memorial care team", route: "/admin/ManageServiceProviders", accent: "#164A40" },
  { label: "Deceased Records", sub: "Search & update records", route: "/admin/DeceasedRecords", accent: "#164A40" },
  { label: "Reports", sub: "Revenue & occupancy reports", route: "/admin/Reports", accent: "#164A40" },
];

interface Stats {
  bookingsToday: number;
  pendingApprovals: number;
  availablePlots: number;
  revenue: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setStats(await res.json());
    } catch {}
    setLoading(false);
    setRefreshing(false);
  };

  useFocusEffect(useCallback(() => { fetchStats(); }, []));

  const tiles = stats
    ? [
        { label: "Bookings Today", sub: "Total received", value: stats.bookingsToday, color: "#164A40" },
        { label: "Pending Approvals", sub: "Awaiting review", value: stats.pendingApprovals, color: "#f59e0b" },
        { label: "Available Plots", sub: "Ready to book", value: stats.availablePlots, color: "#22c55e" },
        { label: "Revenue (MTD)", sub: "This month", value: `PKR ${stats.revenue.toLocaleString()}`, color: "#7c3aed" },
      ]
    : [];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#164A40" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchStats(true); }} />}
        >
          <View style={styles.tilesGrid}>
            {tiles.map((t) => (
              <View key={t.label} style={[styles.tile, { backgroundColor: t.color }]}>
                <Text style={styles.tileValue}>{t.value}</Text>
                <Text style={styles.tileLabel}>{t.label}</Text>
                <Text style={styles.tileSub}>{t.sub}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.linksGrid}>
            {QUICK_LINKS.map((l) => (
              <Pressable key={l.label} style={styles.linkCard} onPress={() => (router as any).push(l.route)}>
                <View style={styles.linkLeft}>
                  <Text style={styles.linkText}>{l.label}</Text>
                  <Text style={styles.linkSub}>{l.sub}</Text>
                </View>
                <Text style={styles.linkArrow}>›</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingTop: 8, marginTop: 16, marginBottom: 20 },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  backText: { color: "#fff", fontWeight: "700" },
  headerTitle: { flex: 1, marginLeft: 12, fontSize: 20, fontWeight: "800" },
  content: { paddingHorizontal: 18, paddingBottom: 40 },
  tilesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 28 },
  tile: { width: "47%", borderRadius: 14, padding: 18 },
  tileValue: { color: "#fff", fontSize: 26, fontWeight: "900", marginBottom: 2 },
  tileLabel: { color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: "600" },
  tileSub: { color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 12 },
  linksGrid: { gap: 10 },
  linkCard: {
    backgroundColor: "#fff", borderRadius: 14, paddingHorizontal: 18, paddingVertical: 16,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
    borderLeftWidth: 4, borderLeftColor: "#164A40",
  },
  linkLeft: { flex: 1 },
  linkText: { fontSize: 15, fontWeight: "700", color: "#111" },
  linkSub: { fontSize: 12, color: "#888", marginTop: 2 },
  linkArrow: { fontSize: 22, color: "#164A40", marginLeft: 10 },
});
