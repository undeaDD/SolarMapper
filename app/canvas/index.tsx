import DocumentView from "@/components/DocumentView";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Document } from "../_layout";

export type CanvasScreenProps = {
  toggleSideBar: () => void;
  selectedDocument: Document | null;
};

export default function CanvasScreen({ toggleSideBar, selectedDocument }: CanvasScreenProps) {
  const [selectedTool, setSelectedTool] = useState<number | null>(0)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      {/* Top-left sidebar button */}
      <View style={styles.sidebarButtonWrapper}>
        <BlurView 
          style={styles.sidebarButton}
          intensity={90}
        >
          <TouchableOpacity onPress={toggleSideBar}>
            <Image
              source={require("./../../assets/sidebar.png")}
              style={{ width: 30, height: 30, tintColor: "orange" }}
            />
          </TouchableOpacity>
        </BlurView>
      </View>

      {selectedDocument && (
        <>
          
          {/* Main canvas placeholder */}
          <GestureHandlerRootView>
            <DocumentView
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
              uri={selectedDocument.url}
              selectedTool={selectedTool}
            />
          </GestureHandlerRootView>

          {/* Bottom tool panel */}
          <View style={styles.buttonPanelWrapper}>
            <BlurView 
              style={styles.buttonPanel}
              intensity={90}
            >
              <Text style={styles.buttonPanelTitle}>ApplePencil Tools:</Text>
              <View style={styles.buttonPanelRow}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => {
                    setSelectedTool(selectedTool === 0 ? null : 0)
                  }}
                >
                  <Image
                    source={require("./../../assets/planet.png")}
                    style={{ width: 35, height: 35, tintColor: selectedTool === 0 ? "orange" : "white" }}
                  />
                  <Text style={[{color: selectedTool === 0 ? "orange" : "white"}, styles.buttonTitle]}>Planeten</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => {
                    setSelectedTool(selectedTool === 1 ? null : 1)
                  }}
                >
                  <Image
                    source={require("./../../assets/moon.png")}
                    style={{ width: 35, height: 35, tintColor: selectedTool === 1 ? "orange" : "white" }}
                  />
                  <Text style={[{color: selectedTool === 1 ? "orange" : "white"}, styles.buttonTitle]}>Monde</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => {
                    setSelectedTool(selectedTool === 2 ? null : 2)
                  }}
                >
                  <Image
                    source={require("./../../assets/ring.png")}
                    style={{ width: 35, height: 35, tintColor: selectedTool === 2 ? "orange" : "white" }}
                  />
                  <Text style={[{color: selectedTool === 2 ? "orange" : "white"}, styles.buttonTitle]}>Bahnen</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => {
                    setSelectedTool(selectedTool === 3 ? null : 3)
                  }}
                >
                  <Image
                    source={require("./../../assets/rocket.png")}
                    style={{ width: 35, height: 35, tintColor: selectedTool === 3 ? "orange" : "white" }}
                  />
                  <Text style={[{color: selectedTool === 3 ? "orange" : "white"}, styles.buttonTitle]}>Objekte</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => {
                    setSelectedTool(selectedTool === 4 ? null : 4)
                  }}
                >
                  <Image
                    source={require("./../../assets/unknown.png")}
                    style={{ width: 35, height: 35, tintColor: selectedTool === 4 ? "orange" : "white" }}
                  />
                  <Text style={[{color: selectedTool === 4 ? "orange" : "white"}, styles.buttonTitle]}>Unbekannt</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>

          {/* Top right action group */}
          <View style={styles.actionButtonWrapper}>
            <BlurView 
              style={styles.actionButton}
              intensity={90}
            >
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
