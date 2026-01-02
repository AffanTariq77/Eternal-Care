import { Asset } from "expo-asset";

// Cache to store preloaded asset URIs
const assetCache = new Map<any, string>();
let preloadPromise: Promise<void> | null = null;

// Preload a single asset (optimized to avoid duplicate downloads)
export async function preloadAsset(source: any): Promise<string | null> {
  // Check if already cached (synchronous check for instant return)
  if (assetCache.has(source)) {
    return assetCache.get(source) || null;
  }

  try {
    const asset = Asset.fromModule(source);
    await asset.downloadAsync();
    const uri = (asset as any).localUri ?? asset.uri;
    if (uri) {
      assetCache.set(source, uri);
      return uri;
    }
    return null;
  } catch (error) {
    console.error("Error preloading asset:", error);
    return null;
  }
}

// Get cached asset URI (synchronous, returns immediately if cached)
export function getCachedAssetUri(source: any): string | null {
  return assetCache.get(source) || null;
}

// Preload multiple assets in parallel (faster)
export async function preloadAssets(sources: any[]): Promise<void> {
  // Preload all assets in parallel for maximum speed
  await Promise.all(sources.map((source) => preloadAsset(source)));
}

// Preload all common SVG assets at app startup
// This function is idempotent - can be called multiple times safely
export async function preloadCommonAssets(): Promise<void> {
  // If already preloading or preloaded, return the existing promise
  if (preloadPromise) {
    return preloadPromise;
  }

  preloadPromise = (async () => {
    // Preload ALL SVG assets used in the app, including larger ones
    // This ensures instant rendering when navigating to any page
    const commonAssets = [
      require("../assets/images/Eternal-Care-logo-black3.svg"), // Large logo
      require("../assets/images/bell.svg"),
      require("../assets/images/booking.svg"),
      require("../assets/images/circle.svg"),
      require("../assets/images/edit.svg"),
      require("../assets/images/emailblackpng.svg"),
      require("../assets/images/facebook1.svg"),
      require("../assets/images/filter.svg"),
      require("../assets/images/Get-in-touch-bro.svg"), // Large illustration
      require("../assets/images/google1.svg"),
      require("../assets/images/grave-booking.svg"), // Large banner SVG
      require("../assets/images/grave-care.svg"), // Large banner SVG
      require("../assets/images/hide.svg"),
      require("../assets/images/lock.svg"),
      require("../assets/images/mail1.svg"),
      require("../assets/images/memoreal.svg"),
      require("../assets/images/profile.svg"),
      require("../assets/images/quran-recitation.svg"), // Large banner SVG
      require("../assets/images/search.svg"),
      require("../assets/images/spertual.svg"),
      require("../assets/images/support.svg"),
    ];

    // Preload all assets in parallel for fastest loading
    // Larger SVGs load first to ensure they're ready
    await preloadAssets(commonAssets);
  })();

  return preloadPromise;
}

