import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { SvgUri } from "react-native-svg";
import { getCachedAssetUri, preloadAsset } from "../../utils/assetCache";

type Props = {
  source: any; // require(...) of svg
  size?: number | string;
  style?: any;
};

export default function SocialSvg({ source, size = 36, style }: Props) {
  const [uri, setUri] = useState<string | null>(() => getCachedAssetUri(source));

  useEffect(() => {
    if (uri) return;
    let cancelled = false;
    preloadAsset(source).then((loaded) => {
      if (!cancelled && loaded) setUri(loaded);
    });
    return () => { cancelled = true; };
  }, [source]);

  if (!uri) return null;

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
