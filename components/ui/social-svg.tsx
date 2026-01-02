import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { getCachedAssetUri } from "../../utils/assetCache";

type Props = {
  source: any; // require(...) of svg
  size?: number | string;
  style?: any;
};

export default function SocialSvg({ source, size = 36, style }: Props) {
  // Use useMemo to get cached URI instantly (synchronous, no state updates)
  // This ensures SVG renders immediately when component mounts
  const uri = useMemo(() => getCachedAssetUri(source), [source]);

  // If URI is not available (shouldn't happen if assets are preloaded), return null
  // This prevents placeholder flicker and ensures SVGs appear instantly
  if (!uri) {
    // Return null instead of placeholder to avoid layout shift
    // Assets should always be preloaded, so this is a fallback
    return null;
  }

  // Wrap SvgUri in a clipping View so borderRadius is enforced across renderers.
  const clipStyle: any = {};
  if (style && style.borderRadius)
    clipStyle.borderRadius = style.borderRadius;
  else if (typeof size === "number") clipStyle.borderRadius = Number(size) / 2;

  return (
    <View
      style={[
        {
          overflow: "hidden",
          width: typeof size === "number" ? size : "100%",
          height: typeof size === "number" ? size : "100%",
          borderRadius: clipStyle.borderRadius,
        },
        style,
      ]}
    >
      <SvgUri
        uri={uri}
        width={"100%" as any}
        height={"100%" as any}
        // ensure svg scales to fill and gets clipped on iOS
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: "transparent",
  },
});
