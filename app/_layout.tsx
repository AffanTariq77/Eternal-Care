import { Slot } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden />
      <Slot />
    </>
  );
}

const styles = StyleSheet.create({});
