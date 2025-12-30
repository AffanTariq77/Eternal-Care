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

export default function Form() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    address: "",
    city: "",
    postal: "",
  });
  const [saveInfo, setSaveInfo] = useState(true);
  const [agree, setAgree] = useState(true);
  // booking info (set by Book Now buttons) will be read from bookingStore when needed

  const Input: React.FC<{
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
  }> = ({ placeholder, value, onChange }) => (
    <View style={styles.inputWrap}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9AA"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );

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

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>EnterYour details</Text>

        <View style={styles.box}>
          <Input
            placeholder="Your Full Name"
            value={form.name}
            onChange={(v) => setForm((s) => ({ ...s, name: v }))}
          />
          <Input
            placeholder="Your Email"
            value={form.email}
            onChange={(v) => setForm((s) => ({ ...s, email: v }))}
          />
          <Input
            placeholder="Your Phone Number"
            value={form.phone}
            onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
          />
          <Input
            placeholder="Your CNIC Number"
            value={form.cnic}
            onChange={(v) => setForm((s) => ({ ...s, cnic: v }))}
          />
          <Input
            placeholder="Your Address"
            value={form.address}
            onChange={(v) => setForm((s) => ({ ...s, address: v }))}
          />
          <Input
            placeholder="Your City"
            value={form.city}
            onChange={(v) => setForm((s) => ({ ...s, city: v }))}
          />
          <Input
            placeholder="Postal Code"
            value={form.postal}
            onChange={(v) => setForm((s) => ({ ...s, postal: v }))}
          />

          <View style={styles.checkboxRow}>
            <Pressable
              onPress={() => setSaveInfo((s) => !s)}
              style={styles.checkbox}
            >
              {saveInfo && <View style={styles.checked} />}
            </Pressable>
            <Text style={styles.checkboxText}>
              Save your information for later use
            </Text>
          </View>

          <View style={styles.checkboxRow}>
            <Pressable
              onPress={() => setAgree((s) => !s)}
              style={styles.checkbox}
            >
              {agree && <View style={styles.checked} />}
            </Pressable>
            <Text style={styles.checkboxText}>
              I have read all the terms and condition
            </Text>
          </View>

          <View style={styles.nextWrap}>
            <Pressable
              style={styles.nextBtn}
              onPress={() => {
                const {
                  setBooking,
                  getBooking,
                } = require("../utils/bookingStore");
                const prev = getBooking();
                setBooking({ ...prev, ...form });
                (router as any).push("/Payment");
              }}
            >
              <Text style={styles.nextText}>Next</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff" },
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
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  heading: { fontSize: 28, fontWeight: "800", marginTop: 20, marginBottom: 12 },
  box: {
    borderWidth: 1,
    borderColor: "#164A40",
    borderRadius: 8,
    padding: 14,
    marginTop: 6,
  },
  inputWrap: { marginVertical: 8 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#164A40",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checked: { width: 18, height: 18, backgroundColor: "#fff", borderRadius: 2 },
  checkboxText: { flex: 1 },
  nextWrap: { alignItems: "center", marginTop: 18 },
  nextBtn: {
    backgroundColor: "#164A40",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 20,
  },
  nextText: { color: "#fff", fontWeight: "700" },
});
