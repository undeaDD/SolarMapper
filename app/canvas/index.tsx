import DocumentView from "@/components/DocumentView";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Document } from "../_layout";

export type CanvasScreenProps = {
  selectedDocument: Document | null;
};

export default function CanvasScreen({
  selectedDocument,
}: CanvasScreenProps) {
  const [selectedTool, setSelectedTool] = useState<number | null>(0);
  const [showEllipses, setShowEllipses] = useState<boolean>(true);

  const tools = [
    { id: 0, label: "Planeten", icon: require("./../../assets/planet.png") },
    { id: 1, label: "Monde", icon: require("./../../assets/moon.png") },
    { id: 2, label: "Bahnen", icon: require("./../../assets/ring.png") },
    { id: 3, label: "Objekte", icon: require("./../../assets/rocket.png") },
    { id: 4, label: "Unbekannt", icon: require("./../../assets/unknown.png") },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {selectedDocument && (
        <>

          {/* Main canvas view */}
          <GestureHandlerRootView>
            <DocumentView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              uri={selectedDocument.url}
              selectedTool={selectedTool}
              showEllipses={showEllipses}
            />
          </GestureHandlerRootView>

          {/* Bottom left tool panel */}
          <View style={styles.buttonPanelWrapper}>
            <BlurView style={styles.buttonPanel} intensity={90}>
              <Text style={styles.buttonPanelTitle}>ApplePencil Tools:</Text>
              <View style={styles.buttonPanelRow}>
                {tools.map(({ id, label, icon }) => (
                  <TouchableOpacity
                    key={id}
                    style={styles.button}
                    onPress={() =>
                      setSelectedTool(selectedTool === id ? null : id)
                    }
                  >
                    <Image
                      source={icon}
                      style={{
                        width: 35,
                        height: 35,
                        tintColor: selectedTool === id ? "orange" : "white",
                      }}
                    />
                    <Text
                      style={[
                        { color: selectedTool === id ? "orange" : "white" },
                        styles.buttonTitle,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </BlurView>
          </View>

          {/* Top right action group */}
          <View style={styles.actionButtonWrapper}>
            <BlurView style={styles.actionButton} intensity={90}>
              <TouchableOpacity onPress={() => {
                setShowEllipses(!showEllipses);
              }}>
                <Image
                  source={showEllipses ? require("./../../assets/hide.png") : require("./../../assets/show.png")}
                  style={{ width: 30, height: 30, tintColor: "orange" }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={require("./../../assets/info.png")}
                  style={{ width: 30, height: 30, tintColor: "orange" }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={require("./../../assets/save.png")}
                  style={{ width: 30, height: 30, tintColor: "orange" }}
                />
              </TouchableOpacity>
            </BlurView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sidebarButtonWrapper: {
    position: "absolute",
    top: 35,
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
    paddingHorizontal: 10,
  },
  buttonPanelRow: {
    flexDirection: "row",
    gap: 10,
  },
  buttonPanelTitle: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 5,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 55,
  },
  actionButtonWrapper: {
    position: "absolute",
    top: 35,
    right: 15,
    zIndex: 10,
    overflow: "hidden",
    borderRadius: 15,
  },
  actionButton: {
    flexDirection: "row",
    gap: 20,
    padding: 10,
  },
});
