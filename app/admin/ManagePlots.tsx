import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";

interface Plot { id: string; code: string; status: string; price: number; section: string }

// TODO: fetch from api.adminGetPlots(graveyardId). For now show all plots across graveyards.
const MOCK_PLOTS: Plot[] = [
  { id: "p1", code: "A1", status: "available", price: 15000, section: "Section A" },
  { id: "p2", code: "A2", status: "occupied", price: 15000, section: "Section A" },
  { id: "p3", code: "B1", status: "reserved", price: 16000, section: "Section B" },
  { id: "p4", code: "B2", status: "available", price: 16000, section: "Section B" },
  { id: "p5", code: "C1", status: "occupied", price: 14000, section: "Section C" },
];

const STATUS_COLOR: Record<string, string> = {
  available: "#22c55e", occupied: "#ef4444", reserved: "#f59e0b",
};

export default function ManagePlots() {
  const router = useRouter();
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { setPlots(MOCK_PLOTS); setLoading(false); }, 400);
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert("Remove Plot", "Remove this plot from the system?", [
      { text: "Cancel" },
      { text: "Remove", style: "destructive", onPress: () => setPlots((p) => p.filter((x) => x.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Manage Plots</Text>
        <Pressable style={styles.addBtn} onPress={() => (router as any).push({ pathname: "/admin/PlotForm", params: { mode: "create" } })}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </Pressable>
      </View>

      {loading ? <ActivityIndicator style={{ marginTop: 40 }} color="#164A40" /> : (
        <FlatList
          data={plots}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={[styles.statusDot, { backgroundColor: STATUS_COLOR[item.status] || "#999" }]} />
              <View style={styles.info}>
                <Text style={styles.code}>{item.code}</Text>
                <Text style={styles.sub}>{item.section} · PKR {item.price.toLocaleString()} · {item.status}</Text>
              </View>
              <View style={styles.actions}>
                <Pressable
                  style={styles.editBtn}
                  onPress={() => (router as any).push({ pathname: "/admin/PlotForm", params: { mode: "edit", id: item.id, code: item.code, status: item.status, price: String(item.price) } })}
                >
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>
                <Pressable style={styles.delBtn} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.delText}>Del</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingTop: 8, marginTop: 16, marginBottom: 16 },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  backText: { color: "#fff", fontWeight: "700" },
  headerTitle: { flex: 1, marginLeft: 12, fontSize: 18, fontWeight: "800" },
  addBtn: { backgroundColor: "#164A40", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  addBtnText: { color: "#fff", fontWeight: "700" },
  list: { paddingHorizontal: 18, paddingBottom: 30 },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 10, flexDirection: "row", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  statusDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  info: { flex: 1 },
  code: { fontSize: 15, fontWeight: "700", color: "#111" },
  sub: { color: "#666", fontSize: 12, marginTop: 2 },
  actions: { flexDirection: "row", gap: 8 },
  editBtn: { backgroundColor: "#dbeafe", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  editText: { color: "#1e40af", fontWeight: "600", fontSize: 13 },
  delBtn: { backgroundColor: "#fee2e2", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  delText: { color: "#dc2626", fontWeight: "600", fontSize: 13 },
});
