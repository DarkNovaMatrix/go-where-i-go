/**
 * Central place for distribution links. Drop the real store / APK URLs here and
 * every download button across the site picks them up.
 */
export const APP_DOWNLOADS = {
  /** Direct APK download. Replace with the hosted build URL or /dravik.apk in /public. */
  androidApk: "/downloads/dravik-latest.apk",
  playStore: "",
  appStore: "",
  version: "1.4.0",
  sizeMb: 48,
  minAndroid: "8.0",
  minIos: "15.0",
} as const;

export const SUPPORT_EMAIL = "field@dravik.app";
