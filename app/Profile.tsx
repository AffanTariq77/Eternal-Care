import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import SocialSvg from "../components/ui/social-svg";
import BellIcon from "../assets/images/bell.svg";
import ProfileIcon from "../assets/images/profile.svg";
import EditIcon from "../assets/images/edit.svg";
import { Colors } from "../constants/theme";
import { getUser, saveUser, getToken } from "../utils/authStore";

const API = process.env.EXPO_PUBLIC_API_URL ?? "";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
}

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    (async () => {
      const cached = await getUser();
      if (cached) {
        setProfile(cached as UserProfile);
        setForm({ name: cached.name, phone: cached.phone ?? "", address: cached.address ?? "" });
      }
      const token = await getToken();
      if (!cached?.id || !token) return;
      try {
        const res = await fetch(`${API}/profile/${cached.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const { user } = await res.json();
          const merged = { ...cached, ...user };
          setProfile(merged);
          setForm({ name: user.name ?? "", phone: user.phone ?? "", address: user.address ?? "" });
          await saveUser(merged);
        }
      } catch {
        // use cached
      }
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Allow access to your photo library to upload a profile picture.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || !result.assets?.[0]) return;
    uploadAvatar(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Allow access to your camera to take a profile photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || !result.assets?.[0]) return;
    uploadAvatar(result.assets[0].uri);
  };

  const showImageOptions = () => {
    Alert.alert("Profile Photo", "Choose an option", [
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Library", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const uploadAvatar = async (uri: string) => {
    if (!profile) return;
    const token = await getToken();
    if (!token) return;
    setUploading(true);
    try {
      const formData = new FormData();
      const filename = uri.split("/").pop() ?? "avatar.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";
      formData.append("avatar", { uri, name: filename, type } as any);

      const res = await fetch(`${API}/avatar/${profile.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json();
        Alert.alert("Upload Failed", body.error ?? "Could not upload image.");
        return;
      }
      const { avatarUrl } = await res.json();
      const updated = { ...profile, avatar_url: avatarUrl };
      setProfile(updated);
      await saveUser(updated);
    } catch {
      Alert.alert("Error", "Could not reach the server.");
    } finally {
      setUploading(false);
    }
  };

  const saveChanges = async () => {
    if (!profile) return;
    const token = await getToken();
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/profile/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: form.name, phone: form.phone, address: form.address }),
      });
      if (!res.ok) {
        const body = await res.json();
        Alert.alert("Error", body.error ?? "Failed to save changes.");
        return;
      }
      const { user } = await res.json();
      const updated = { ...profile, ...user, phone: form.phone, address: form.address };
      setProfile(updated);
      await saveUser(updated);
      setEditing(false);
    } catch {
      Alert.alert("Error", "Could not reach the server.");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator style={{ marginTop: 60 }} color="#164A40" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          <View style={styles.header}>
            <Pressable style={styles.back} onPress={() => router.back()}>
              <Text style={styles.backChevron}>{"<"}</Text>
            </Pressable>
            <View style={styles.headerRight}>
              <SocialSvg Icon={BellIcon} size={20} />
            </View>
          </View>

          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <Pressable style={styles.avatarCircle} onPress={showImageOptions} disabled={uploading}>
              {uploading ? (
                <ActivityIndicator color="#164A40" />
              ) : profile.avatar_url ? (
                <Image source={{ uri: profile.avatar_url }} style={styles.avatarImg} />
              ) : (
                <SocialSvg Icon={ProfileIcon} size={64} />
              )}
              <View style={styles.cameraOverlay}>
                <Text style={styles.cameraIcon}>📷</Text>
              </View>
            </Pressable>
            <Text style={styles.editTitle}>{editing ? "Edit Profile" : "My Profile"}</Text>
            {!editing && (
              <Pressable style={styles.editIconBtn} onPress={() => setEditing(true)}>
                <SocialSvg Icon={EditIcon} size={18} />
              </Pressable>
            )}
          </View>

          <View style={styles.rows}>
            {editing ? (
              <>
                <FieldInput label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Your full name" />
                <FieldInput label="Email" value={profile.email} onChange={() => {}} placeholder="" disabled />
                <FieldInput label="Phone" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="+92 300 0000000" keyboardType="phone-pad" />
                <FieldInput label="Address" value={form.address} onChange={(v) => setForm((f) => ({ ...f, address: v }))} placeholder="Your city / address" />
              </>
            ) : (
              <>
                <Row label="Name" value={profile.name || "—"} />
                <Row label="Email" value={profile.email} />
                <Row label="Phone" value={profile.phone || "—"} />
                <Row label="Address" value={profile.address || "—"} />
              </>
            )}
          </View>

          {editing ? (
            <View style={styles.btnRow}>
              <Pressable style={styles.cancelBtn} onPress={() => { setEditing(false); setForm({ name: profile.name, phone: profile.phone ?? "", address: profile.address ?? "" }); }}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveBtn} onPress={saveChanges} disabled={saving}>
                {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save</Text>}
              </Pressable>
            </View>
          ) : (
            <Pressable style={styles.backBtn} onPress={() => router.back()}>
              <Text style={styles.backBtnText}>Back</Text>
            </Pressable>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={1} ellipsizeMode="tail">{value}</Text>
    </View>
  );
}

function FieldInput({ label, value, onChange, placeholder, disabled, keyboardType }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; disabled?: boolean; keyboardType?: any;
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, disabled && styles.inputDisabled]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        editable={!disabled}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.light.background || "#fff", paddingTop: 28, paddingHorizontal: 28 },
  container: { paddingBottom: 120 },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#000", alignItems: "center", justifyContent: "center", marginLeft: 8 },
  backChevron: { color: "#fff", fontWeight: "700" },
  header: { width: "95%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8, marginTop: 25 },
  headerRight: { flexDirection: "row", alignItems: "center", marginRight: 8 },

  avatarWrap: { alignItems: "center", marginTop: 28, marginBottom: 18 },
  avatarCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: "#d7efe6", alignItems: "center", justifyContent: "center",
    overflow: "hidden", borderWidth: 3, borderColor: "#164A40",
  },
  avatarImg: { width: 120, height: 120, borderRadius: 60 },
  cameraOverlay: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "rgba(0,0,0,0.35)", alignItems: "center", paddingVertical: 4,
  },
  cameraIcon: { fontSize: 14 },
  editTitle: { marginTop: 14, fontSize: 20, fontWeight: "800", color: "#164A40" },
  editIconBtn: { marginTop: 8 },

  rows: { marginTop: 12, alignItems: "center" },
  row: {
    width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "#fff", borderRadius: 12, paddingVertical: 18, paddingHorizontal: 16,
    borderWidth: 2, borderColor: "#164A40", marginBottom: 12,
  },
  rowLabel: { fontWeight: "800", fontSize: 18 },
  rowValue: { color: "#333", fontSize: 16, flexShrink: 1, textAlign: "right" },

  fieldWrap: { width: "90%", marginBottom: 14 },
  fieldLabel: { fontSize: 13, fontWeight: "700", color: "#164A40", marginBottom: 6 },
  input: { backgroundColor: "#fff", borderWidth: 2, borderColor: "#164A40", borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, fontSize: 16, color: "#111" },
  inputDisabled: { backgroundColor: "#f5f5f5", color: "#999", borderColor: "#ddd" },

  btnRow: { flexDirection: "row", justifyContent: "center", gap: 14, marginTop: 20 },
  cancelBtn: { flex: 1, marginHorizontal: 18, paddingVertical: 14, borderRadius: 24, borderWidth: 2, borderColor: "#164A40", alignItems: "center" },
  cancelBtnText: { color: "#164A40", fontWeight: "700" },
  saveBtn: { flex: 1, marginHorizontal: 18, paddingVertical: 14, borderRadius: 24, backgroundColor: "#164A40", alignItems: "center" },
  saveBtnText: { color: "#fff", fontWeight: "700" },
  backBtn: { alignSelf: "center", marginTop: 18, backgroundColor: "#164A40", paddingVertical: 12, paddingHorizontal: 28, borderRadius: 24 },
  backBtnText: { color: "#fff" },
});
