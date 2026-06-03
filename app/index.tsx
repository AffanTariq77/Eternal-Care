import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { getCachedAssetUri, preloadAsset } from "../utils/assetCache";

const logoSource = require("../assets/images/Eternal-Care-logo-black3.svg");

export default function SplashScreen() {
  const router = useRouter();
  const [svgUri, setSvgUri] = useState<string | null>(() => getCachedAssetUri(logoSource));

  useEffect(() => {
    if (svgUri) return;
    preloadAsset(logoSource).then((uri) => {
      if (uri) setSvgUri(uri);
    });
  }, []);

  return (
    <View style={styles.container}>
      {svgUri && (
        <View style={styles.logo}>
          <SvgUri uri={svgUri} width="100%" height="100%" />
        </View>
      )}

      <Pressable style={styles.button} onPress={() => router.push("/second")}>
        <View style={styles.chevron} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
    opacity: 1,
    transform: [{ rotate: "0deg" }],
    marginBottom: 80,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#114A3A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  chevron: {
    width: 20,
    height: 20,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    marginLeft: -4,
    borderColor: "#FFFFFF",
    transform: [{ rotate: "-45deg" }],
  },
});
