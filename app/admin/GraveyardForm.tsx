import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";
import { adminCreateGraveyard, adminUpdateGraveyard } from "../utils/api";

export default function GraveyardForm() {
  const router = useRouter();
  const { mode, id, name: initName, city: initCity } = useLocalSearchParams<{
    mode: string; id?: string; name?: string; city?: string;
  }>();

  const nameRef = useRef(initName || "");
  const cityRef = useRef(initCity || "");
  const addressRef = useRef("");
  const latRef = useRef("");
  const lngRef = useRef("");
  const totalPlotsRef = useRef("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!nameRef.current.trim() || !cityRef.current.trim()) {
      alert("Name and city are required.");
      return;
    }
    setSaving(true);
    try {
      const payload: any = {
        name: nameRef.current.trim(),
        city: cityRef.current.trim(),
        address: addressRef.current.trim() || undefined,
        lat: latRef.current ? Number(latRef.current) : undefined,
        lng: lngRef.current ? Number(lngRef.current) : undefined,
        total_plots: totalPlotsRef.current ? Number(totalPlotsRef.current) : undefined,
      };
      if (mode === 'edit' && id) {
        await adminUpdateGraveyard(id, payload);
      } else {
        await adminCreateGraveyard(payload);
      }
      (router as any).back();
    } catch (e: any) {
      alert(e?.error || "Failed to save graveyard.");
    } finally {
      setSaving(false);
    }
  };

  const Field = ({ label, ref: r, placeholder, keyboardType }: any) => (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9AA"
        defaultValue={r.current}
        onChangeText={(v) => { r.current = v; }}
        keyboardType={keyboardType}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => (router as any).back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{mode === "edit" ? "Edit Graveyard" : "Add Graveyard"}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Field label="Name *" ref={nameRef} placeholder="e.g. Karachi Muslim Graveyard" />
        <Field label="City *" ref={cityRef} placeholder="e.g. Karachi" />
        <Field label="Address" ref={addressRef} placeholder="Full address" />
        <Field label="Latitude" ref={latRef} placeholder="e.g. 24.8607" keyboardType="decimal-pad" />
        <Field label="Longitude" ref={lngRef} placeholder="e.g. 67.0011" keyboardType="decimal-pad" />
        <Field label="Total Plots" ref={totalPlotsRef} placeholder="e.g. 200" keyboardType="numeric" />

        <Pressable style={[styles.saveBtn, saving && { opacity: 0.6 }]} onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save Graveyard</Text>}
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
  fieldWrap: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, color: "#555", marginBottom: 6, fontWeight: "600" },
  input: {
    borderWidth: 1, borderColor: "#164A40", borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#111",
  },
  saveBtn: {
    backgroundColor: "#164A40", borderRadius: 24, paddingVertical: 16,
    alignItems: "center", marginTop: 10,
  },
  saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
