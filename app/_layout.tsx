import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import Canvas from "./canvas";
import Sidebar from "./sidebar";

export type Document = {
  id: number;
  title: string;
  url: string;
}

export default function Layout() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <View style={{ flex: 1 }}>
      {sidebarOpen && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 10,
            width: 250,
            backgroundColor: "#151515",
            borderTopEndRadius: 20,
            borderBottomEndRadius: 20,
          }}
        >
          <Sidebar selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} setSidebarOpen={setSidebarOpen} />
        </View>
      )}

      <View style={{ zIndex: 5, flex: 1, backgroundColor: "#000" }}>
        <Canvas selectedDocument={selectedDocument} />
        {sidebarOpen && <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.8)" }} />}
      </View>

      {/* Top left sidebar button */}
      <View style={[{left: sidebarOpen ? 265 : 15 }, styles.sidebarButtonWrapper]}>
        <BlurView style={styles.sidebarButton} intensity={90}>
          <TouchableOpacity onPress={toggleSideBar}>
            <Image
              source={sidebarOpen ? require("./../assets/close.png") : require("./../assets/open.png")}
              style={{ width: 30, height: 30, tintColor: "orange" }}
            />
          </TouchableOpacity>
        </BlurView>
      </View>

      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  sidebarButtonWrapper: {
    position: "absolute",
    top: 35,
    overflow: "hidden",
    borderRadius: 15,
    zIndex: 500,
  },
  sidebarButton: {
    padding: 10,
  }
});