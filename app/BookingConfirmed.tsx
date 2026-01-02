import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";

export default function BookingConfirmed() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.checkWrap}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.sub}>
          Thank you for your purchase. You will get email soon.
        </Text>

        <View style={{ flex: 1 }} />

        <Pressable
          style={styles.next}
          onPress={() => (router as any).replace("Home")}
        >
          <Text style={styles.nextIcon}>{">"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff" },
  container: { flex: 1, alignItems: "center", padding: 28 },
  checkWrap: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#2db32d",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  checkMark: { color: "#fff", fontSize: 72, fontWeight: "700" },
  title: { fontSize: 22, fontWeight: "800", marginTop: 28, color: "#164A40" },
  sub: { textAlign: "center", color: "#164A40", marginTop: 12 },
  next: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#164A40",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  nextIcon: { color: "#fff", fontSize: 28 },
});
