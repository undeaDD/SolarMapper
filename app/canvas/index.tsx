import DocumentView from "@/components/DocumentView";
import { useDocuments } from "@/provider/DocumentProvider";
import { useEllipses } from "@/provider/EllipseProvider";
import { useGlobal } from "@/provider/GlobalStateProvider";
import { useTools } from "@/provider/ToolProvider";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CanvasScreen() {
  const { selectedDocument, setSelectedDocument } = useDocuments();
  const { tools, selectedTool, setSelectedTool } = useTools();
  const { showEllipses, toggleEllipses } = useEllipses();
  const { setSidebarOpen } = useGlobal();

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {selectedDocument && (
        <>

          {/* Main canvas view */}
          <GestureHandlerRootView>
            <DocumentView />
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
                      setSelectedTool(selectedTool?.id === id ? null : { id, label, icon })
                    }
                  >
                    <Image
                      source={icon}
                      style={[
                        styles.toolIcon,
                        selectedTool?.id === id && styles.toolIconSelected,
                      ]}
                    />
                    <Text
                      style={[
                        styles.buttonTitle,
                        selectedTool?.id === id && styles.buttonTitleSelected,
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
                toggleEllipses();
              }}>
                <Image
                  source={showEllipses ? require("./../../assets/hide.png") : require("./../../assets/show.png")}
                  style={[styles.actionIcon]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={require("./../../assets/info.png")}
                  style={[styles.actionIcon]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setSelectedDocument(null);
                setSidebarOpen(true)
              }}>
                <Image
                  source={require("./../../assets/save.png")}
                  style={[styles.actionIcon]}
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
    color: "white",
  },
  buttonTitleSelected: {
    color: "orange",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 55,
  },
  toolIcon: {
    width: 35,
    height: 35,
    tintColor: "white",
  },
  toolIconSelected: {
    tintColor: "orange",
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
  actionIcon: {
    width: 30,
    height: 30,
    tintColor: "orange",
  },
});
