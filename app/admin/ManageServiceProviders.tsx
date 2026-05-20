import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";

interface Provider { id: string; name: string; type: string; contact: string; available: boolean }

// TODO: replace with api.adminGetProviders()
const MOCK: Provider[] = [
  { id: "r1", name: "Qari Abdul Rahman", type: "quran_recitation", contact: "03001234567", available: true },
  { id: "r2", name: "Maulana Tariq Ahmed", type: "quran_recitation", contact: "03111234567", available: true },
  { id: "gc1", name: "Clean Graves Team A", type: "gravecare", contact: "03211234567", available: false },
];

const TYPE_LABELS: Record<string, string> = {
  quran_recitation: "Quran Recitation",
  gravecare: "Memorial Care",
};

export default function ManageServiceProviders() {
  const router = useRouter();
  const [items, setItems] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { setItems(MOCK); setLoading(false); }, 400);
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert("Remove Provider", "Remove this service provider?", [
      { text: "Cancel" },
      { text: "Remove", style: "destructive", onPress: () => { setItems((p) => p.filter((x) => x.id !== id)); } },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Service Providers</Text>
        <Pressable style={styles.addBtn} onPress={() => (router as any).push({ pathname: "/admin/ProviderForm", params: { mode: "create" } })}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </Pressable>
      </View>

      {loading ? <ActivityIndicator style={{ marginTop: 40 }} color="#164A40" /> : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={[styles.avDot, { backgroundColor: item.available ? "#22c55e" : "#ef4444" }]} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>{TYPE_LABELS[item.type] || item.type} · {item.contact}</Text>
              </View>
              <View style={styles.actions}>
                <Pressable
                  style={styles.editBtn}
                  onPress={() => (router as any).push({ pathname: "/admin/ProviderForm", params: { mode: "edit", id: item.id, name: item.name, type: item.type, contact: item.contact } })}
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
  avDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "700", color: "#111" },
  sub: { color: "#666", fontSize: 12, marginTop: 2 },
  actions: { flexDirection: "row", gap: 8 },
  editBtn: { backgroundColor: "#dbeafe", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  editText: { color: "#1e40af", fontWeight: "600", fontSize: 13 },
  delBtn: { backgroundColor: "#fee2e2", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  delText: { color: "#dc2626", fontWeight: "600", fontSize: 13 },
});
