import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import SocialSvg from "../components/ui/social-svg";
import { Colors } from "../constants/theme";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Text style={styles.backChevron}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Go ahead and setup{`\n`}your account.</Text>

        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <Pressable
              style={[styles.toggleBtn, styles.toggleActive]}
              onPress={() => {}}
            >
              <Text style={[styles.toggleText, styles.toggleTextActive]}>
                LOG IN
              </Text>
            </Pressable>
            <Pressable
              style={styles.toggleBtn}
              onPress={() => (router as any).push("/Signup")}
            >
              <Text style={styles.toggleText}>SIGN UP</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputRow}>
            <View style={{ marginRight: 8 }}>
              <SocialSvg
                source={require("../assets/images/emailblackpng.svg")}
                size={20}
              />
            </View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder=""
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <View style={{ marginRight: 8 }}>
              <SocialSvg
                source={require("../assets/images/lock.svg")}
                size={18}
              />
            </View>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder=""
              secureTextEntry={!showPassword}
              style={styles.input}
              autoCapitalize="none"
            />
            <Pressable
              onPress={() => setShowPassword((s) => !s)}
              style={styles.eyeBtn}
            >
              <SocialSvg
                source={require("../assets/images/hide.svg")}
                size={18}
              />
            </Pressable>
          </View>

          <Pressable
            style={styles.actionBtn}
            onPress={() => (router as any).push("/Home")}
          >
            <Text style={styles.actionText}>LOG IN</Text>
          </Pressable>

          <Text style={styles.orText}>OR LOGIN WITH</Text>

          <View style={styles.socialRow}>
            <View style={styles.social}>
              <SocialSvg
                source={require("../assets/images/facebook1.svg")}
                size={36}
              />
            </View>
            <View style={styles.social}>
              <SocialSvg
                source={require("../assets/images/mail1.svg")}
                size={36}
              />
            </View>
            <View style={styles.social}>
              <SocialSvg
                source={require("../assets/images/google1.svg")}
                size={36}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background || "#fff",
    padding: 24,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  backChevron: { color: "#fff", fontWeight: "700" },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0b251f",
    marginTop: 20,
  },
  card: {
    marginTop: 24,
    backgroundColor: "#164A40",
    borderRadius: 20,
    padding: 20,
    paddingBottom: 36,
  },
  toggleRow: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#0b251f",
    padding: 8,
    borderRadius: 40,
    marginBottom: 18,
    paddingHorizontal: 6,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 28,
    backgroundColor: "transparent",
  },
  toggleActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  toggleTextActive: {
    color: "#000",
  },
  label: { color: "#fff", marginTop: 6, marginBottom: 8, fontWeight: "700" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: "100%" },
  eyeBtn: { padding: 6 },
  actionBtn: {
    marginTop: 12,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  actionText: { color: "#fff", fontWeight: "700" },
  orText: { color: "#fff", textAlign: "center", marginTop: 12, opacity: 0.8 },
  socialRow: { flexDirection: "row", justifyContent: "center", marginTop: 12 },
  social: { width: 36, height: 36, marginHorizontal: 8 },
  scrollContent: {
    paddingBottom: 40,
  },
});
