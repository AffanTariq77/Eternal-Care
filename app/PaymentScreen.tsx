import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { getToken } from "../utils/authStore";
import { getBooking, clearBooking } from "../utils/bookingStore";

const API = process.env.EXPO_PUBLIC_API_URL ?? "";
const STRIPE_KEY = process.env.EXPO_PUBLIC_STRIPE_KEY ?? "";

function PaymentForm() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    amount: string;
    description: string;
    returnPath: string;
  }>();

  const amount = parseFloat(params.amount ?? "0");
  const description = params.description ?? "Eternal Care booking";
  const returnPath = params.returnPath ?? "/Home";

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [intentId, setIntentId] = useState<string | null>(null);

  useEffect(() => {
    setupPaymentSheet();
  }, []);

  const setupPaymentSheet = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API}/payments/create-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount, description }),
      });
      if (!res.ok) {
        const body = await res.json();
        Alert.alert("Payment Error", body.error ?? "Could not initialise payment.");
        return;
      }
      const { clientSecret, intentId: id } = await res.json();
      setIntentId(id ?? null);
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Eternal Care",
        style: "alwaysLight",
        defaultBillingDetails: { name: "" },
      });
      if (error) {
        Alert.alert("Setup Error", error.message);
        return;
      }
      setReady(true);
    } catch {
      Alert.alert("Error", "Could not reach the payment server.");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async () => {
    if (!ready) return;
    const { error } = await presentPaymentSheet();
    if (error) {
      if (error.code !== "Canceled") {
        Alert.alert("Payment Failed", error.message);
      }
      return;
    }
    await confirmBooking();
  };

  const confirmBooking = async () => {
    const token = await getToken();
    const ctx = getBooking();

    // 1. Create the booking record
    let bookingId: string | null = null;
    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          packageId: ctx.packageId ?? "direct_payment",
          date: ctx.date ?? new Date().toISOString(),
          serviceType: ctx.service ?? description,
          graveyardId: ctx.graveyardId ?? null,
          plotId: ctx.plotId ?? null,
          providerId: ctx.providerId ?? null,
          amount,
          meta: { description, ...ctx },
        }),
      });
      if (res.ok) {
        const body = await res.json();
        bookingId = body.booking?.id ?? null;
      }
    } catch {
      // booking creation failed — still navigate to confirmed so user knows payment went through
    }

    // 2. Mark the booking paid
    if (bookingId) {
      try {
        await fetch(`${API}/bookings/${bookingId}/pay`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ amount, method: "stripe", receipt: intentId }),
        });
      } catch {
        // payment record creation failed — non-blocking
      }
    }

    clearBooking();
    (router as any).replace("/BookingConfirmed");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.title}>Payment</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Amount Due</Text>
        <Text style={styles.amount}>PKR {amount.toLocaleString()}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Secure Payment via Stripe</Text>
        <Text style={styles.infoText}>
          Your card details are encrypted and processed securely by Stripe. Eternal Care never stores your payment information.
        </Text>
      </View>

      <View style={styles.bottom}>
        {loading ? (
          <ActivityIndicator color="#164A40" />
        ) : (
          <Pressable
            style={[styles.payBtn, !ready && styles.payBtnDisabled]}
            onPress={handlePay}
            disabled={!ready}
          >
            <Text style={styles.payBtnText}>Pay PKR {amount.toLocaleString()}</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

export default function PaymentScreen() {
  return (
    <StripeProvider publishableKey={STRIPE_KEY} merchantIdentifier="com.eternalcare.app">
      <PaymentForm />
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 18, paddingVertical: 14,
  },
  back: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: "#000",
    alignItems: "center", justifyContent: "center",
  },
  backText: { color: "#fff", fontWeight: "700" },
  title: { fontSize: 18, fontWeight: "800", color: "#111" },
  card: {
    margin: 18, backgroundColor: "#164A40", borderRadius: 20,
    padding: 24, alignItems: "center",
  },
  label: { color: "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 6 },
  amount: { color: "#fff", fontSize: 36, fontWeight: "900", marginBottom: 6 },
  desc: { color: "rgba(255,255,255,0.8)", fontSize: 14, textAlign: "center" },
  infoBox: {
    marginHorizontal: 18, backgroundColor: "#fff", borderRadius: 16,
    padding: 18, borderLeftWidth: 4, borderLeftColor: "#164A40",
  },
  infoTitle: { fontWeight: "700", fontSize: 14, color: "#164A40", marginBottom: 6 },
  infoText: { color: "#555", fontSize: 13, lineHeight: 20 },
  bottom: { position: "absolute", bottom: 40, left: 18, right: 18 },
  payBtn: {
    backgroundColor: "#164A40", borderRadius: 16,
    paddingVertical: 18, alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 8, elevation: 4,
  },
  payBtnDisabled: { opacity: 0.5 },
  payBtnText: { color: "#fff", fontWeight: "800", fontSize: 17 },
});
