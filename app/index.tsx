import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";

export default function SplashScreen() {
  const [svgUri, setSvgUri] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const asset = Asset.fromModule(
          require("../assets/images/Eternal-Care-logo-black3.svg")
        );
        await asset.downloadAsync();
        const uri = (asset as any).localUri ?? asset.uri;
        if (mounted) setSvgUri(uri ?? null);
      } catch (e) {
        if (mounted) setSvgUri(null);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      {svgUri ? (
        <View style={styles.logo}>
          <SvgUri uri={svgUri} width="100%" height="100%" />
        </View>
      ) : (
        <View style={styles.logo} />
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
