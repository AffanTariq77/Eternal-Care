import { Asset } from "expo-asset";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";

type Props = {
  source: any; // require(...) of svg
  size?: number | string;
  style?: any;
};

export default function SocialSvg({ source, size = 36 }: Props) {
  const [uri, setUri] = useState<string | null>(null);
  const styleProp = (arguments[0] as any)?.style ?? null;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const asset = Asset.fromModule(source);
        await asset.downloadAsync();
        const u = (asset as any).localUri ?? asset.uri;
        if (mounted) setUri(u ?? null);
      } catch (e) {
        if (mounted) setUri(null);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [source]);

  if (!uri) {
    const placeholderStyle: any =
      typeof size === "number"
        ? { width: size, height: size, borderRadius: Number(size) / 2 }
        : { width: "100%", height: "100%" };
    return <View style={[styles.placeholder, placeholderStyle, styleProp]} />;
  }

  // Wrap SvgUri in a clipping View so borderRadius is enforced across renderers.
  const clipStyle: any = {};
  if (styleProp && styleProp.borderRadius)
    clipStyle.borderRadius = styleProp.borderRadius;
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
        styleProp,
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
