import { Slot } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

import { DocumentProvider } from "@/provider/DocumentProvider";
import { EllipsesProvider } from "@/provider/EllipseProvider";
import { GlobalStateProvider } from "@/provider/GlobalStateProvider";
import { ToolProvider } from "@/provider/ToolProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <DocumentProvider>
        <GlobalStateProvider>
          <ToolProvider>
            <EllipsesProvider>
              <Slot />
              <StatusBar barStyle="light-content" />
            </EllipsesProvider>
          </ToolProvider>
        </GlobalStateProvider>
      </DocumentProvider>
    </GestureHandlerRootView>
  );
}
