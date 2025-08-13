import DocumentView from "@/components/DocumentView";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type CanvasScreenProps = {
  toggleSideBar: () => void;
};

export default function CanvasScreen({ toggleSideBar }: CanvasScreenProps) {
  const [selectedTool, setSelectedTool] = useState<number | null>(0)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top-left toggle button */}
      <View style={styles.sidebarButtonWrapper}>
        <BlurView 
          style={styles.sidebarButton}
          intensity={80}
        >
          <TouchableOpacity onPress={toggleSideBar}>
            <Image
              source={require("./../../assets/sidebar.png")}
              style={{ width: 35, height: 35, tintColor: "orange" }}
            />
          </TouchableOpacity>
        </BlurView>
      </View>

      {/* Main canvas placeholder */}
      <GestureHandlerRootView>
        <DocumentView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          uri={"https://devsforge.de/temp/demo.jpeg"}
          selectedTool={selectedTool}
        />
      </GestureHandlerRootView>

      <View style={styles.buttonPanelWrapper}>
        <BlurView 
          style={styles.buttonPanel}
          intensity={80}
        >
          <TouchableOpacity onPress={() => {
            setSelectedTool(selectedTool === 0 ? null : 0)
          }}>
            <Image
              source={require("./../../assets/planet.png")}
              style={{ width: 35, height: 35, tintColor: selectedTool === 0 ? "orange" : "gray" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setSelectedTool(selectedTool === 1 ? null : 1)
          }}>
            <Image
              source={require("./../../assets/moon.png")}
              style={{ width: 35, height: 35, tintColor: selectedTool === 1 ? "orange" : "gray" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setSelectedTool(selectedTool === 2 ? null : 2)
          }}>
            <Image
              source={require("./../../assets/ring.png")}
              style={{ width: 35, height: 35, tintColor: selectedTool === 2 ? "orange" : "gray" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setSelectedTool(selectedTool === 3 ? null : 3)
          }}>
            <Image
              source={require("./../../assets/rocket.png")}
              style={{ width: 35, height: 35, tintColor: selectedTool === 3 ? "orange" : "gray" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setSelectedTool(selectedTool === 4 ? null : 4)
          }}>
            <Image
              source={require("./../../assets/unknown.png")}
              style={{ width: 35, height: 35, tintColor: selectedTool === 4 ? "orange" : "gray" }}
            />
          </TouchableOpacity>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sidebarButtonWrapper: {
    position: "absolute",
    top: 35,
    left: 15,
    zIndex: 10,
    overflow: "hidden",
    borderRadius: 15,
  },
  sidebarButton: {
    padding: 10,
  },
  buttonPanelWrapper: {
    position: "absolute",
    bottom: 15,
    left: 15,
    zIndex: 10,
    overflow: "hidden",
    borderRadius: 15,
  },
  buttonPanel: {
    flexDirection: "row",
    gap: 20,
    padding: 10,
  },
});
