import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SocialSvg from "../components/ui/social-svg";
import { Colors } from "../constants/theme";

export default function Support() {
  const router = useRouter();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

          <Text style={styles.helpSmall}>Need Help?</Text>
          <Text style={styles.helpTitle}>Help Center</Text>

          <View style={styles.illustrationWrap}>
            <SocialSvg
              source={require("../assets/images/Get-in-touch-bro.svg")}
              size={180}
            />
          </View>

          <Text style={styles.ask}>Tell us how we can help?</Text>

          <View style={styles.formWrap}>
            <View style={styles.row}>
              <TextInput
                placeholder="First Name"
                value={first}
                onChangeText={setFirst}
                style={[styles.input, styles.half]}
              />
              <TextInput
                placeholder="Last Name"
                value={last}
                onChangeText={setLast}
                style={[styles.input, styles.half]}
              />
            </View>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            <TextInput
              placeholder="Leave us a message"
              value={message}
              onChangeText={setMessage}
              style={[styles.input, styles.textarea]}
              multiline
            />

            <View style={styles.formButtons}>
              <Pressable
                style={styles.sendBtn}
                onPress={() => {
                  /* send logic */
                }}
              >
                <Text style={styles.sendText}>Send</Text>
              </Pressable>

              <Pressable style={styles.backBtn} onPress={() => router.back()}>
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.light.background || "#fff",
    paddingHorizontal: 28,
  },
  container: { paddingTop: 24, paddingBottom: 120, alignItems: "center" },
  header: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerRightSmall: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  back: {
    alignSelf: "flex-start",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  backChevron: { color: "#fff", fontWeight: "700" },
  helpSmall: {
    color: "#164A40",
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },
  helpTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginVertical: 8,
    textAlign: "center",
  },
  illustrationWrap: { marginVertical: 8, alignItems: "center" },
  ask: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 8,
    textAlign: "center",
  },
  row: { flexDirection: "row", width: "100%", justifyContent: "space-between" },
  formWrap: { width: "90%", alignSelf: "center" },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#164A40",
    marginBottom: 12,
  },
  half: { width: "48%" },
  textarea: { height: 140, textAlignVertical: "top" },
  sendBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#164A40",
    borderRadius: 20,
    marginRight: 8,
  },
  sendText: { color: "#fff" },
  backBtn: {
    backgroundColor: "#164A40",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  backBtnText: { color: "#fff" },
});
