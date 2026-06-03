import { useLocalSearchParams, useRouter } from "expo-router";
import React, { Component, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Colors } from "../constants/theme";

const API = process.env.EXPO_PUBLIC_API_URL ?? "";

interface GraveyardData {
  lat: number;
  lng: number;
  city: string;
  available_plots: number;
  total_plots: number;
  address?: string;
}

class MapErrorBoundary extends Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() { this.props.onError(); }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function GraveyardMap() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const [graveyard, setGraveyard] = useState<GraveyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mapAvailable, setMapAvailable] = useState(true);

  useEffect(() => {
    fetch(`${API}/graveyards/${id}`)
      .then((r) => r.json())
      .then((g) =>
        setGraveyard({
          lat: parseFloat(g.lat) || 24.8607,
          lng: parseFloat(g.lng) || 67.0011,
          city: g.city ?? "",
          available_plots: g.available_plots ?? 0,
          total_plots: g.total_plots ?? 0,
          address: g.address,
        })
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const region = graveyard
    ? { latitude: graveyard.lat, longitude: graveyard.lng, latitudeDelta: 0.02, longitudeDelta: 0.02 }
    : undefined;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{name || "Graveyard Map"}</Text>
      </View>

      {loading || !graveyard ? (
        <View style={styles.centered}>
          {loading ? (
            <ActivityIndicator color="#164A40" size="large" />
          ) : (
            <Text style={styles.errorText}>Could not load graveyard location.</Text>
          )}
        </View>
      ) : (
        <>
          <MapErrorBoundary onError={() => setMapAvailable(false)}>
            {mapAvailable ? (
              <MapView
                style={styles.map}
                provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
                initialRegion={region}
                showsUserLocation
                showsMyLocationButton
              >
                <Marker
                  coordinate={{ latitude: graveyard.lat, longitude: graveyard.lng }}
                  pinColor="#164A40"
                >
                  <Callout tooltip>
                    <View style={styles.callout}>
                      <Text style={styles.calloutTitle}>{name}</Text>
                      {graveyard.city ? <Text style={styles.calloutSub}>{graveyard.city}</Text> : null}
                      {graveyard.address ? <Text style={styles.calloutAddr}>{graveyard.address}</Text> : null}
                      <View style={styles.calloutBadge}>
                        <Text style={styles.calloutBadgeText}>{graveyard.available_plots} plots available</Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              </MapView>
            ) : (
              <View style={styles.centered}>
                <Text style={styles.errorText}>Map not available. Use a development build to view the map.</Text>
              </View>
            )}
          </MapErrorBoundary>

          <View style={styles.infoPanel}>
            <Text style={styles.infoPanelName}>{name}</Text>
            {graveyard.city ? <Text style={styles.infoPanelCity}>{graveyard.city}</Text> : null}
            {graveyard.address ? <Text style={styles.infoPanelAddr}>{graveyard.address}</Text> : null}
            <View style={styles.infoStats}>
              <View style={styles.statBadge}>
                <Text style={styles.statBadgeText}>{graveyard.available_plots} available</Text>
              </View>
              <Text style={styles.statTotal}>{graveyard.total_plots} total plots</Text>
            </View>
            <Pressable
              style={styles.detailBtn}
              onPress={() => (router as any).back()}
            >
              <Text style={styles.detailBtnText}>Back to Plots</Text>
            </Pressable>
          </View>
        </>
      )}
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
  map: { flex: 1 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  errorText: { color: "#666", textAlign: "center", fontSize: 14 },
  callout: {
    backgroundColor: "#fff", borderRadius: 12, padding: 12,
    width: 200, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 6,
  },
  calloutTitle: { fontWeight: "800", fontSize: 14, color: "#111", marginBottom: 2 },
  calloutSub: { color: "#666", fontSize: 12, marginBottom: 4 },
  calloutAddr: { color: "#888", fontSize: 11, marginBottom: 8 },
  calloutBadge: {
    backgroundColor: "#d7efe6", borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3, alignSelf: "flex-start",
  },
  calloutBadgeText: { color: "#164A40", fontSize: 12, fontWeight: "600" },
  infoPanel: {
    backgroundColor: "#fff", padding: 20,
    borderTopWidth: 1, borderTopColor: "#eee",
  },
  infoPanelName: { fontSize: 18, fontWeight: "800", color: "#111", marginBottom: 2 },
  infoPanelCity: { fontSize: 13, color: "#666", marginBottom: 2 },
  infoPanelAddr: { fontSize: 12, color: "#888", marginBottom: 10 },
  infoStats: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  statBadge: {
    backgroundColor: "#d7efe6", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4,
  },
  statBadgeText: { color: "#164A40", fontSize: 13, fontWeight: "600" },
  statTotal: { color: "#888", fontSize: 13 },
  detailBtn: {
    backgroundColor: "#164A40", borderRadius: 24,
    paddingVertical: 12, alignItems: "center",
  },
  detailBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
