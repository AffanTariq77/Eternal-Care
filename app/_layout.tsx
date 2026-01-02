import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { preloadCommonAssets } from "../utils/assetCache";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Preload all SVG assets BEFORE allowing app to render
        await preloadCommonAssets();
      } catch (e) {
        console.warn("Error preloading assets:", e);
      } finally {
        // Assets are now loaded, allow app to render
        setAppIsReady(true);
      }
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
