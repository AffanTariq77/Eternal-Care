import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SocialSvg from "../components/ui/social-svg";
import AvatarButton from "../components/ui/avatar-button";
import { Colors } from "../constants/theme";
import api from "./utils/api";

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
  const [paying, setPaying] = useState(false);
  const [bypassing, setBypassing] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <View style={styles.headerRight}>
          <AvatarButton size={36} />
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
              style={[styles.confirmBtn, (paying || bypassing) && styles.confirmBtnDisabled]}
              onPress={async () => {
                if (paying || bypassing) return;
                setPaying(true);
                try {
                  if (!params.id) return alert('Booking id missing. Please go back and try again.');

                  // Ensure booking exists and belongs to user; retry a few times if needed
                  let bookingExists = false;
                  for (let i = 0; i < 3; i++) {
                    try {
                      await api.getBooking(params.id);
                      bookingExists = true;
                      break;
                    } catch (e: any) {
                      console.log('getBooking attempt', i, 'error', e?.error || e?.message || e);
                      // if 404, wait and retry, otherwise rethrow
                      if (e?.error === 'Not found') {
                        await new Promise((r) => setTimeout(r, 250));
                        continue;
                      }
                      throw e;
                    }
                  }

                  // If booking still missing, try to recreate with data from store and use new id
                  if (!bookingExists) {
                    console.log('Booking not found on server — attempting auto-recreate');
                    alert('Booking not found on server — attempting to re-create it and continue payment.');
                    // try to re-create booking from stored params
                    let resp: any = null;
                    try {
                      resp = await api.createBooking(params.packageId || params.packageId, params.date || params.date, params);
                    } catch (e: any) {
                      console.warn('Auto-recreate booking failed', e?.error || e?.message || e);
                      return alert('Booking not found and auto-recreate failed: ' + (e?.error || e?.message || 'unknown'));
                    }

                    if (resp && resp.booking && resp.booking.id) {
                      const { setBooking } = require('../utils/bookingStore');
                      setBooking({ ...params, id: resp.booking.id });
                      params.id = resp.booking.id;
                      console.log('Auto-recreated booking with id', params.id);
                      alert('Booking re-created, proceeding with payment.');
                    } else {
                      console.warn('Auto-recreate booking response missing id', resp);
                      return alert('Booking not found and auto-recreate failed');
                    }
                  }

                  try {
                    await api.payBooking(params.id, { amount: params.price || 0, method: 'card' });
                    (router as any).push('/BookingConfirmed');
                  } catch (e: any) {
                    console.warn('payBooking failed', e);
                    // If server returned Not found, try to re-create booking and retry once
                    if (e?.error === 'Not found') {
                      try {
                        alert('Booking not found on server — attempting to re-create and retry payment');
                        const resp = await api.createBooking(params.packageId || params.packageId, params.date || params.date, params);
                        if (resp && resp.booking && resp.booking.id) {
                          const { setBooking } = require('../utils/bookingStore');
                          setBooking({ ...params, id: resp.booking.id });
                          params.id = resp.booking.id;
                          await api.payBooking(params.id, { amount: params.price || 0, method: 'card' });
                          (router as any).push('/BookingConfirmed');
                          return;
                        }
                        return alert('Payment failed: Booking re-create did not return an id');
                      } catch (re: any) {
                        console.warn('Retry pay after recreate failed', re);
                        return alert('Payment failed after recreate: ' + (re?.error || re?.message || 'unknown'));
                      }
                    }
                    return alert('Payment failed: ' + (e?.error || e?.message || 'unknown'));
                  }
                } catch (err: any) {
                  alert(err?.error || err?.message || 'Payment failed');
                } finally {
                  setPaying(false);
                }
              }}
              disabled={paying || bypassing}
            >
              {paying ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmText}>Confirm Payment</Text>}
            </Pressable>

            <Pressable
              style={[styles.confirmBtn, (paying || bypassing) && styles.confirmBtnDisabled, { marginTop: 12, backgroundColor: '#A00' }]}
              onPress={async () => {
                if (paying || bypassing) return;
                setBypassing(true);
                try {
                  if (!params.id) return alert('Booking id missing. Please go back and try again.');

                  // Ensure booking exists and belongs to user; retry a few times if needed
                  let bookingExists = false;
                  for (let i = 0; i < 3; i++) {
                    try {
                      await api.getBooking(params.id);
                      bookingExists = true;
                      break;
                    } catch (e: any) {
                      if (e?.error === 'Not found') {
                        await new Promise((r) => setTimeout(r, 250));
                        continue;
                      }
                      throw e;
                    }
                  }

                  if (!bookingExists) {
                    const resp = await api.createBooking(params.packageId || params.packageId, params.date || params.date, params);
                    if (resp && resp.booking && resp.booking.id) {
                      const { setBooking } = require('../utils/bookingStore');
                      setBooking({ ...params, id: resp.booking.id });
                      params.id = resp.booking.id;
                    } else {
                      return alert('Booking not found and auto-recreate failed');
                    }
                  }

                  // Bypass payment for testing — hard-coded
                  try {
                    await api.payBooking(params.id, { amount: params.price || 0, method: 'bypass', bypass: true, receipt: { note: 'Test bypass payment' } });
                    (router as any).push('/BookingConfirmed');
                  } catch (e: any) {
                    console.warn('bypass pay failed', e);
                    if (e?.error === 'Not found') {
                      try {
                        alert('Booking not found on server — attempting to re-create and retry bypass payment');
                        const resp = await api.createBooking(params.packageId || params.packageId, params.date || params.date, params);
                        if (resp && resp.booking && resp.booking.id) {
                          const { setBooking } = require('../utils/bookingStore');
                          setBooking({ ...params, id: resp.booking.id });
                          params.id = resp.booking.id;
                          await api.payBooking(params.id, { amount: params.price || 0, method: 'bypass', bypass: true, receipt: { note: 'Test bypass payment' } });
                          (router as any).push('/BookingConfirmed');
                          return;
                        }
                        return alert('Bypass failed: Booking re-create did not return an id');
                      } catch (re: any) {
                        console.warn('Retry bypass after recreate failed', re);
                        return alert('Bypass failed after recreate: ' + (re?.error || re?.message || 'unknown'));
                      }
                    }
                    return alert(e?.error || e?.message || 'Bypass failed');
                  }
                } catch (err: any) {
                  alert(err?.error || err?.message || 'Bypass failed');
                } finally {
                  setBypassing(false);
                }
              }}
              disabled={paying || bypassing}
            >
              {bypassing ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmText}>Bypass Payment (TEST)</Text>}
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
  confirmBtnDisabled: {
    opacity: 0.6,
  },
  confirmText: { color: "#fff", fontWeight: "700" },
});
