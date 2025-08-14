import { useGlobal } from "@/provider/GlobalStateProvider";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Canvas from "./canvas";
import Sidebar from "./sidebar";

export default function RootView() {
  const { sidebarOpen, toggleSidebar } = useGlobal();

  return (
    <View style={styles.container}>
      
      {/* Sidebar view */}
      {sidebarOpen && (
        <View style={styles.sidebar}>
          <Sidebar />
        </View>
      )}

      {/* Canvas view */}
      <View style={styles.canvasWrapper}>
        <Canvas />
        {sidebarOpen && <View style={styles.overlay} />}
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
    zIndex: 10,
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