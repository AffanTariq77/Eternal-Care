import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarButton from "../components/ui/avatar-button";
import { Colors } from "../constants/theme";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const TIME_SLOTS = ["9:00 AM","10:30 AM","12:00 PM","2:00 PM","4:00 PM","6:00 PM"];

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

export default function ReciterDetail() {
  const router = useRouter();
  const { id, name, price, language } = useLocalSearchParams<{
    id: string; name: string; price: string; language: string;
  }>();

  const [selectedDay, setSelectedDay] = useState(DAYS[0].iso);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);

  const handleBook = () => {
    const { setBooking } = require("../utils/bookingStore");
    setBooking({
      service: "Quran Recitation",
      detail: `Session with ${name}`,
      packageId: `quran_${id}_${selectedTime.replace(/\s|:/g, "")}`,
      date: selectedDay,
      providerId: id,
      providerName: name,
      slotTime: selectedTime,
      price: price || "1200",
    });
    (router as any).push("/Form");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Reciter Profile</Text>
        <AvatarButton size={36} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{(name || "R")[0]}</Text>
          </View>
          <Text style={styles.reciterName}>{name}</Text>
          <Text style={styles.reciterLang}>{language}</Text>
          <Text style={styles.reciterPrice}>PKR {Number(price || 1200).toLocaleString()} / session</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Date</Text>
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

        <Text style={styles.sectionTitle}>Select Time Slot</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((t) => (
            <Pressable
              key={t}
              style={[styles.timeBtn, selectedTime === t && styles.timeBtnActive]}
              onPress={() => setSelectedTime(t)}
            >
              <Text style={[styles.timeText, selectedTime === t && styles.timeTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.bookBtn} onPress={handleBook}>
          <Text style={styles.bookBtnText}>Book Session</Text>
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
  content: { paddingHorizontal: 18, paddingBottom: 40 },
  profileCard: {
    backgroundColor: "#164A40", borderRadius: 16, padding: 24,
    alignItems: "center", marginBottom: 24,
  },
  avatar: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: "#cfe9d8",
    alignItems: "center", justifyContent: "center", marginBottom: 12,
  },
  avatarLetter: { color: "#164A40", fontSize: 28, fontWeight: "900" },
  reciterName: { color: "#fff", fontSize: 20, fontWeight: "800" },
  reciterLang: { color: "#cfe9d8", fontSize: 14, marginTop: 4 },
  reciterPrice: { color: "#fff", fontSize: 16, fontWeight: "700", marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12, marginTop: 8 },
  dayScroll: { marginBottom: 16 },
  dayBtn: {
    borderWidth: 1, borderColor: "#164A40", borderRadius: 10,
    paddingVertical: 8, paddingHorizontal: 14, marginRight: 8,
  },
  dayBtnActive: { backgroundColor: "#164A40" },
  dayText: { color: "#164A40", fontWeight: "600", fontSize: 13 },
  dayTextActive: { color: "#fff" },
  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  timeBtn: {
    borderWidth: 1, borderColor: "#164A40", borderRadius: 10,
    paddingVertical: 10, paddingHorizontal: 16,
  },
  timeBtnActive: { backgroundColor: "#164A40" },
  timeText: { color: "#164A40", fontWeight: "600" },
  timeTextActive: { color: "#fff" },
  bookBtn: {
    backgroundColor: "#164A40", borderRadius: 24, paddingVertical: 16, alignItems: "center",
  },
  bookBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
