import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SocialSvg from "../components/ui/social-svg";
import { Colors } from "../constants/theme";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Pressable style={styles.back} onPress={() => router.back()}>
              <Text style={styles.backChevron}>{"<"}</Text>
            </Pressable>
            <View style={styles.headerRightSmall}>
              <SocialSvg
                source={require("../assets/images/bell.svg")}
                size={20}
              />
            </View>
          </View>

          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <SocialSvg
                source={require("../assets/images/profile.svg")}
                size={80}
              />
            </View>
            <Text style={styles.editTitle}>Edit Profile</Text>
            <Pressable
              style={styles.editIcon}
              onPress={() => {
                /* edit action */
              }}
            >
              <SocialSvg
                source={require("../assets/images/edit.svg")}
                size={18}
              />
            </Pressable>
          </View>

          <View style={styles.rows}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Name</Text>
              <Text
                style={styles.rowValue}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Muhammad John
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Email</Text>
              <Text
                style={styles.rowValue}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                john786@gmail.com
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Phone</Text>
              <Text
                style={styles.rowValue}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                +44 7413 013779
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Address</Text>
              <Text
                style={styles.rowValue}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                64-A Lawrence Road Lahore
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Payment</Text>
              <Text
                style={styles.rowValue}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Debit Card
              </Text>
            </View>
          </View>

          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backBtnText}>Back</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.light.background || "#fff",
    paddingTop: 28,
    paddingHorizontal: 28,
  },
  container: { paddingBottom: 120 },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  backChevron: { color: "#fff", fontWeight: "700" },
  header: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 25,
  },
  headerRightSmall: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  avatarWrap: { alignItems: "center", marginTop: 28, marginBottom: 18 },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#d7efe6",
    alignItems: "center",
    justifyContent: "center",
  },
  editTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
    color: "#164A40",
  },
  editIcon: { marginTop: 8 },
  rows: { marginTop: 12, alignItems: "center" },
  row: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#164A40",
    marginBottom: 12,
  },
  rowLabel: { fontWeight: "800", fontSize: 18 },
  rowValue: { color: "#333", fontSize: 16, flexShrink: 1, textAlign: "right" },
  backBtn: {
    alignSelf: "center",
    marginTop: 18,
    backgroundColor: "#164A40",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  backBtnText: { color: "#fff" },
});
