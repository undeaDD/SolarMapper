import React, { useState } from "react";
import { StatusBar, View } from "react-native";
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
    <View style={{ flex: 1, flexDirection: "row" }}>
      {sidebarOpen && (
        <View
          style={{
            zIndex: 10,
            width: 250,
            backgroundColor: "#151515",
            borderTopEndRadius: 20,
            borderBottomEndRadius: 20,
          }}
        >
          <Sidebar selectedDocument={selectedDocument} setSelectedDocument={setSelectedDocument} />
        </View>
      )}

      <View style={{ zIndex: 5, flex: 1, backgroundColor: "#000" }}>
        <Canvas toggleSideBar={toggleSideBar} selectedDocument={selectedDocument} />
      </View>

      <StatusBar barStyle="light-content" />
    </View>
  );
}
