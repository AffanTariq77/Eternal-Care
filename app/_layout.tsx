import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { preloadCommonAssets } from "../utils/assetCache";
import { getToken, clearToken, clearUser } from "../utils/authStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await preloadCommonAssets();
      } catch { /* non-critical */ }

      // Check if stored JWT has expired (decode claim locally — no network needed)
      try {
        const token = await getToken();
        if (token) {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            if (payload.exp && payload.exp * 1000 < Date.now()) {
              await clearToken();
              await clearUser();
            }
          }
        }
      } catch { /* malformed token or parse error — leave token as-is */ }

      setAppIsReady(true);
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide splash screen once assets are loaded and layout is ready
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Don't render anything until assets are loaded
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar hidden />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({});
