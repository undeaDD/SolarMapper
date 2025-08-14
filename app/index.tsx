import { useGlobal } from "@/provider/GlobalStateProvider";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Canvas from "./canvas";
import Sidebar from "./sidebar";

export default function RootView() {
  const { sidebarOpen, toggleSidebar } = useGlobal();

  const sidebarAnim = useRef(new Animated.Value(sidebarOpen ? 0 : -250)).current;
  const overlayAnim = useRef(new Animated.Value(sidebarOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarOpen ? 0 : -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(overlayAnim, {
      toValue: sidebarOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [overlayAnim, sidebarAnim, sidebarOpen]);

  return (
    <View style={styles.container}>
      {/* Sidebar view */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: sidebarAnim }],
            opacity: overlayAnim,
          },
        ]}
        pointerEvents={sidebarOpen ? "auto" : "none"}
      >
        <Sidebar />
      </Animated.View>

      {/* Canvas view */}
      <View style={styles.canvasWrapper}>
        <Canvas />
        <Animated.View
          style={[
            styles.overlay,
            { opacity: overlayAnim },
          ]}
          pointerEvents={sidebarOpen ? "auto" : "none"}
        >
          {sidebarOpen && (
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={toggleSidebar} />
          )}
        </Animated.View>
      </View>

      {/* Top left sidebar button */}
      <View style={[{ left: sidebarOpen ? 265 : 15 }, styles.sidebarButtonWrapper]}>
        <BlurView style={styles.sidebarButton} intensity={90}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Image
              source={sidebarOpen ? require("./../assets/close.png") : require("./../assets/open.png")}
              style={styles.sidebarButtonIcon}
            />
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 30,
    width: 250,
    backgroundColor: "#151515",
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  canvasWrapper: {
    zIndex: 5,
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  sidebarButtonWrapper: {
    zIndex: 20,
    position: "absolute",
    top: 35,
    borderRadius: 15,
    overflow: "hidden",
  },
  sidebarButton: {
    padding: 10,
  },
  sidebarButtonIcon: {
    width: 30,
    height: 30,
    tintColor: "orange",
  },
});