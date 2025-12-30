import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SocialSvg from "../components/ui/social-svg";
import { Colors } from "../constants/theme";

export default function Payment() {
  const router = useRouter();
  const { getBooking } = require("../utils/bookingStore");
  const params = getBooking();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [visaSelected, setVisaSelected] = useState(true);
  const [saveCard, setSaveCard] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <View style={styles.headerRight}>
          <SocialSvg
            source={require("../assets/images/profile.svg")}
            size={36}
          />
          <SocialSvg source={require("../assets/images/bell.svg")} size={20} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Payment</Text>

        <View style={styles.box}>
          <Text style={styles.sub}>Debit Card</Text>

          <View style={styles.cardRow}>
            <Pressable
              onPress={() => setVisaSelected((s) => !s)}
              style={styles.checkboxOuter}
            >
              {visaSelected ? <View style={styles.checkboxInner} /> : null}
            </Pressable>
            <Text style={styles.cardLabel}>Visa</Text>
            <Text style={[styles.cardLabel, { marginLeft: 28 }]}>
              Master card
            </Text>
          </View>

          <TextInput
            placeholder="Name on your card"
            placeholderTextColor="#9AA"
            style={styles.input}
            value={cardName}
            onChangeText={setCardName}
          />
          <TextInput
            placeholder="Card number"
            placeholderTextColor="#9AA"
            style={styles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
          />

          <View style={styles.rowTwo}>
            <TextInput
              placeholder="expiry"
              placeholderTextColor="#9AA"
              style={[styles.input, styles.smallInput]}
              value={expiry}
              onChangeText={setExpiry}
            />
            <TextInput
              placeholder="cvv"
              placeholderTextColor="#9AA"
              style={[styles.input, styles.smallInput]}
              value={cvv}
              onChangeText={setCvv}
            />
          </View>

          <View style={styles.saveRow}>
            <Pressable
              onPress={() => setSaveCard((s) => !s)}
              style={styles.checkboxOuter}
            >
              {saveCard ? <View style={styles.checkboxInner} /> : null}
            </Pressable>
            <Text style={styles.saveLabel}>
              Save your card information for later use
            </Text>
          </View>

          <Text style={styles.heading2}>Details</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>{params.detail ?? "—"}</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>
              Price: {params.price ?? "—"} Rs.
            </Text>
          </View>

          <View style={styles.confirmWrap}>
            <Pressable
              style={styles.confirmBtn}
              onPress={() => (router as any).push("/BookingConfirmed")}
            >
              <Text style={styles.confirmText}>Confirm Payment</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff" },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  heading: { fontSize: 24, fontWeight: "800", marginTop: 20, color: "#111" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 8,
    marginTop: 16,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { color: "#fff", fontWeight: "700" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  box: {
    borderWidth: 1,
    borderColor: "#164A40",
    borderRadius: 12,
    padding: 18,
    marginTop: 12,
  },
  sub: { fontSize: 18, fontWeight: "600", color: "#111" },
  cardRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 18,
    height: 18,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  cardLabel: { marginLeft: 10, color: "#0b0b0b" },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#164A40",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 12,
    backgroundColor: "#fff",
  },
  rowTwo: { flexDirection: "row", justifyContent: "space-between" },
  smallInput: { width: "48%" },
  saveRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  saveLabel: { marginLeft: 8, color: "#111" },
  heading2: { fontSize: 18, fontWeight: "700", marginTop: 18, color: "#111" },
  detailBox: {
    borderWidth: 1,
    borderColor: "#164A40",
    borderRadius: 8,
    padding: 14,
    marginTop: 12,
    backgroundColor: "#fff",
  },
  detailText: { color: "#0b4b41" },
  confirmWrap: { alignItems: "center", marginTop: 18 },
  confirmBtn: {
    backgroundColor: "#164A40",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
    minWidth: 180,
    alignItems: "center",
  },
  confirmText: { color: "#fff", fontWeight: "700" },
});
