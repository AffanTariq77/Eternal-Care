import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

export default function SecondSplash() {
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
        // localUri exists on native, fallback to uri
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
      {/* Top graphic (tree) - positioned to mimic the reference */}
      {svgUri ? (
        <View style={styles.topGraphic} pointerEvents="none">
          {/* scale the svg and nudge it so only the right portion (tree) shows */}
          <SvgUri uri={svgUri} width={720} height={560} />
          {/*
              white mask rectangle overlay to hide parts of the SVG
              adjust `maskRect` style (top/left/width/height) to hide the portion you like
            */}
          <View style={styles.maskRect} pointerEvents="none" />
        </View>
      ) : null}

      <View style={styles.content}>
        <Text style={styles.smallTitle}>OUR MOTTO</Text>
        <Text style={styles.bigTitle}>
          “Honoring Memories{`\n`}Embracing Peace”
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => (router as any).push("/Login")}
      >
        <View style={styles.chevron} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  // overlay rectangle to hide part of the svg; tweak values to control the hidden area
  maskRect: {
    position: "absolute",
    // relative to the topGraphic wrapper
    left: 100,
    top: 320,
    width: 720,
    height: 720,
    backgroundColor: "#FFFFFF",
    zIndex: 10,
  },
  topGraphic: {
    position: "absolute",
    top: -40,
    right: -150,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  smallTitle: {
    fontSize: 12,
    letterSpacing: 1,
    color: "#000000",
    fontWeight: "700",
    marginBottom: 12,
  },
  bigTitle: {
    fontSize: 30,
    lineHeight: 40,
    textAlign: "center",
    color: "#114A3A",
    fontWeight: "800",
    marginTop: 6,
    marginBottom: 20,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#114A3A",
    position: "absolute",
    bottom: 72,
    left: "50%",
    marginLeft: -28,
    alignItems: "center",
    justifyContent: "center",
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
