import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";

interface Tile { label: string; value: string | number; color: string }

// TODO: replace with api.adminGetDashboard()
const MOCK_TILES: Tile[] = [
  { label: "Bookings Today", value: 12, color: "#164A40" },
  { label: "Pending Approvals", value: 4, color: "#f59e0b" },
  { label: "Available Plots", value: 165, color: "#22c55e" },
  { label: "Revenue (MTD)", value: "PKR 284,000", color: "#7c3aed" },
];

const QUICK_LINKS = [
  { label: "Graveyards", route: "/admin/ManageGraveyards" },
  { label: "Plots", route: "/admin/ManagePlots" },
  { label: "Bookings", route: "/admin/ManageBookings" },
  { label: "Providers", route: "/admin/ManageServiceProviders" },
  { label: "Deceased", route: "/admin/DeceasedRecords" },
  { label: "Reports", route: "/admin/Reports" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.tilesGrid}>
            {MOCK_TILES.map((t) => (
              <View key={t.label} style={[styles.tile, { backgroundColor: t.color }]}>
                <Text style={styles.tileValue}>{t.value}</Text>
                <Text style={styles.tileLabel}>{t.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.linksGrid}>
            {QUICK_LINKS.map((l) => (
              <Pressable
                key={l.label}
                style={styles.linkCard}
                onPress={() => (router as any).push(l.route)}
              >
                <Text style={styles.linkText}>{l.label}</Text>
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
  header: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 18, paddingTop: 8, marginTop: 16, marginBottom: 20,
  },
  back: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: "#000",
    alignItems: "center", justifyContent: "center",
  },
  backText: { color: "#fff", fontWeight: "700" },
  headerTitle: { flex: 1, marginLeft: 12, fontSize: 20, fontWeight: "800" },
  content: { paddingHorizontal: 18, paddingBottom: 40 },
  tilesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 28 },
  tile: {
    width: "47%", borderRadius: 14, padding: 18,
  },
  tileValue: { color: "#fff", fontSize: 24, fontWeight: "900", marginBottom: 4 },
  tileLabel: { color: "rgba(255,255,255,0.8)", fontSize: 13 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 12 },
  linksGrid: { gap: 10 },
  linkCard: {
    backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 18, paddingVertical: 16,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  linkText: { fontSize: 15, fontWeight: "600", color: "#111" },
  linkArrow: { fontSize: 22, color: "#164A40" },
});
