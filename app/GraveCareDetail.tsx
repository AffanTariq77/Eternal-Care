import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarButton from "../components/ui/avatar-button";
import { Colors } from "../constants/theme";
import { getToken } from "../utils/authStore";

const API = process.env.EXPO_PUBLIC_API_URL ?? "";

const PKG_DAYS: Record<string, number> = {
  gravecare_1d: 1, gravecare_weekly: 7, gravecare_monthly: 30,
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function buildDays(count = 14) {
  const days: { label: string; iso: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push({ label: `${d.getDate()} ${MONTHS[d.getMonth()]}`, iso: d.toISOString() });
  }
  return days;
}

const DAYS = buildDays();

const PACKAGES = [
  {
    id: "gravecare_1d",
    label: "One-Time Clean",
    price: 2500,
    includes: ["Full grave cleaning", "Weeding and trimming", "Photo report sent to family"],
  },
  {
    id: "gravecare_weekly",
    label: "Weekly Care",
    price: 8000,
    includes: ["Weekly grave cleaning", "Fresh flower placement", "Monthly photo report", "Priority scheduling"],
    recommended: true,
  },
  {
    id: "gravecare_monthly",
    label: "Monthly Plan",
    price: 4500,
    includes: ["Monthly deep clean", "Grave stone polishing", "Photo report after service"],
  },
];

export default function GraveCareDetail() {
  const router = useRouter();
  const [selectedPkg, setSelectedPkg] = useState(PACKAGES[1].id);
  const [selectedDay, setSelectedDay] = useState(DAYS[0].iso);
  const [activePlan, setActivePlan] = useState<{ label: string; expiry: Date } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API}/bookings/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const { bookings } = await res.json();
        for (const b of bookings ?? []) {
          const pid: string = b.packageId || b.meta?.packageId || "";
          const days = PKG_DAYS[pid];
          if (!days) continue;
          const expiryStr = b.meta?.packageExpiry || (() => {
            const d = new Date(b.created_at || b.date || Date.now());
            d.setDate(d.getDate() + days);
            return d.toISOString();
          })();
          const expiry = new Date(expiryStr);
          if (expiry > new Date()) {
            const pkg = PACKAGES.find((p) => p.id === pid);
            setActivePlan({ label: pkg?.label ?? pid, expiry });
            break;
          }
        }
      } catch { /* non-critical */ }
    })();
  }, []);

  const handleConfirm = () => {
    const { setBooking } = require("../utils/bookingStore");
    const pkg = PACKAGES.find((p) => p.id === selectedPkg)!;
    setBooking({
      service: "Memorial Care",
      detail: pkg.label,
      packageId: pkg.id,
      date: selectedDay,
      price: String(pkg.price),
    });
    (router as any).push("/Form");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Memorial Care</Text>
        <AvatarButton size={36} />
      </View>

      {activePlan && (
        <View style={styles.activeBanner}>
          <View style={styles.activeBannerLeft}>
            <Text style={styles.activeBannerTitle}>Active Plan: {activePlan.label}</Text>
            <Text style={styles.activeBannerSub}>
              Valid until {activePlan.expiry.toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
            </Text>
          </View>
          <View style={styles.activeDot} />
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.desc}>
          Professional grave cleaning and maintenance carried out with respect, care, and devotion. Choose a plan that suits your needs.
        </Text>

        <Text style={styles.sectionTitle}>Choose a Package</Text>
        {PACKAGES.map((pkg) => (
          <Pressable
            key={pkg.id}
            style={[styles.pkgCard, selectedPkg === pkg.id && styles.pkgCardActive]}
            onPress={() => setSelectedPkg(pkg.id)}
          >
            <View style={styles.pkgHeader}>
              <View>
                <Text style={[styles.pkgLabel, selectedPkg === pkg.id && styles.pkgLabelActive]}>{pkg.label}</Text>
                {pkg.recommended && (
                  <View style={styles.recBadge}><Text style={styles.recText}>Recommended</Text></View>
                )}
              </View>
              <Text style={[styles.pkgPrice, selectedPkg === pkg.id && styles.pkgPriceActive]}>
                PKR {pkg.price.toLocaleString()}
              </Text>
            </View>
            <View style={styles.includesList}>
              {pkg.includes.map((item) => (
                <Text key={item} style={[styles.includeItem, selectedPkg === pkg.id && styles.includeItemActive]}>
                  • {item}
                </Text>
              ))}
            </View>
          </Pressable>
        ))}

        <Text style={styles.sectionTitle}>Select First Service Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScroll}>
          {DAYS.map((d) => (
            <Pressable
              key={d.iso}
              style={[styles.dayBtn, selectedDay === d.iso && styles.dayBtnActive]}
              onPress={() => setSelectedDay(d.iso)}
            >
              <Text style={[styles.dayText, selectedDay === d.iso && styles.dayTextActive]}>{d.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmBtnText}>Confirm Package</Text>
        </Pressable>
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
  activeBanner: {
    marginHorizontal: 18, marginBottom: 10,
    backgroundColor: "#d7efe6", borderRadius: 14, padding: 14,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderWidth: 1, borderColor: "#164A40",
  },
  activeBannerLeft: { flex: 1 },
  activeBannerTitle: { color: "#164A40", fontWeight: "800", fontSize: 14 },
  activeBannerSub: { color: "#164A40", fontSize: 12, marginTop: 2, opacity: 0.8 },
  activeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#22c55e", marginLeft: 10 },
  content: { paddingHorizontal: 18, paddingBottom: 40 },
  desc: { color: "#555", lineHeight: 22, marginBottom: 20, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12, marginTop: 8 },
  pkgCard: {
    borderWidth: 2, borderColor: "#e5e7eb", borderRadius: 14, padding: 16, marginBottom: 14,
    backgroundColor: "#fff",
  },
  pkgCardActive: { borderColor: "#164A40", backgroundColor: "#164A40" },
  pkgHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  pkgLabel: { fontSize: 16, fontWeight: "700", color: "#111" },
  pkgLabelActive: { color: "#fff" },
  pkgPrice: { fontSize: 15, fontWeight: "800", color: "#164A40" },
  pkgPriceActive: { color: "#cfe9d8" },
  recBadge: { backgroundColor: "#fef3c7", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4, alignSelf: "flex-start" },
  recText: { fontSize: 11, color: "#92400e", fontWeight: "600" },
  includesList: { gap: 4 },
  includeItem: { color: "#444", fontSize: 13, lineHeight: 20 },
  includeItemActive: { color: "#cfe9d8" },
  dayScroll: { marginBottom: 24 },
  dayBtn: {
    borderWidth: 1, borderColor: "#164A40", borderRadius: 10,
    paddingVertical: 8, paddingHorizontal: 14, marginRight: 8,
  },
  dayBtnActive: { backgroundColor: "#164A40" },
  dayText: { color: "#164A40", fontWeight: "600", fontSize: 13 },
  dayTextActive: { color: "#fff" },
  confirmBtn: {
    backgroundColor: "#164A40", borderRadius: 24, paddingVertical: 16, alignItems: "center",
  },
  confirmBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
