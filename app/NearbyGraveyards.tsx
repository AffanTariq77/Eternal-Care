import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarButton from "../components/ui/avatar-button";
import SocialSvg from "../components/ui/social-svg";
import { Colors } from "../constants/theme";

// TODO: replace with real expo-location call once expo-location is installed
const MOCK_GRAVEYARDS = [
  { id: "g1", name: "Karachi Muslim Graveyard", city: "Karachi", distance: "1.2 km", availablePlots: 42, totalPlots: 200 },
  { id: "g2", name: "Gizri Cemetery", city: "Karachi", distance: "3.5 km", availablePlots: 18, totalPlots: 120 },
  { id: "g3", name: "Miani Sahib Graveyard", city: "Lahore", distance: "5.1 km", availablePlots: 75, totalPlots: 350 },
  { id: "g4", name: "H-8 Graveyard", city: "Islamabad", distance: "7.8 km", availablePlots: 30, totalPlots: 180 },
];

export default function NearbyGraveyards() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [graveyards, setGraveyards] = useState<typeof MOCK_GRAVEYARDS>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: request location permission then call api.getGraveyards(lat, lng)
    setTimeout(() => {
      setGraveyards(MOCK_GRAVEYARDS);
      setLoading(false);
    }, 600);
  }, []);

  const filtered = graveyards.filter(
    (g) =>
      g.name.toLowerCase().includes(query.toLowerCase()) ||
      g.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Nearby Graveyards</Text>
        <View style={styles.headerRight}>
          <AvatarButton size={36} />
        </View>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or city..."
          placeholderTextColor="#9AA"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
        <SocialSvg source={require("../assets/images/search.svg")} size={18} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#164A40" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => (router as any).push({ pathname: "/GraveyardDetail", params: { id: item.id, name: item.name } })}
            >
              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardCity}>{item.city}</Text>
                <View style={styles.statsRow}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.availablePlots} available</Text>
                  </View>
                  <Text style={styles.totalText}>{item.totalPlots} total plots</Text>
                </View>
              </View>
              <View style={styles.distanceWrap}>
                <Text style={styles.distanceText}>{item.distance}</Text>
                <Text style={styles.arrow}>›</Text>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No graveyards found.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 8,
    marginTop: 16,
    marginBottom: 12,
  },
  back: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: "#000",
    alignItems: "center", justifyContent: "center",
  },
  backText: { color: "#fff", fontWeight: "700" },
  headerTitle: { flex: 1, marginLeft: 12, fontSize: 18, fontWeight: "800" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  searchWrap: {
    flexDirection: "row", alignItems: "center",
    marginHorizontal: 18, marginBottom: 12,
    borderWidth: 1, borderColor: "#164A40", borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10,
    backgroundColor: "#fff",
  },
  searchInput: { flex: 1, color: "#111", fontSize: 14 },
  list: { paddingHorizontal: 18, paddingBottom: 30 },
  card: {
    backgroundColor: "#fff", borderRadius: 14,
    padding: 16, marginBottom: 14,
    flexDirection: "row", alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 6,
    elevation: 3,
  },
  cardBody: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: "700", color: "#111", marginBottom: 2 },
  cardCity: { fontSize: 13, color: "#666", marginBottom: 8 },
  statsRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  badge: { backgroundColor: "#d7efe6", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { color: "#164A40", fontSize: 12, fontWeight: "600" },
  totalText: { color: "#888", fontSize: 12 },
  distanceWrap: { alignItems: "flex-end" },
  distanceText: { color: "#164A40", fontWeight: "700", fontSize: 13 },
  arrow: { fontSize: 22, color: "#164A40", marginTop: 4 },
  empty: { textAlign: "center", color: "#999", marginTop: 40 },
});
