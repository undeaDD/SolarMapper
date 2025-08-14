import { Slot } from "expo-router";
import React from "react";
import { LogBox, StatusBar } from "react-native";

import { DocumentProvider } from "@/provider/DocumentProvider";
import { EllipsesProvider } from "@/provider/EllipseProvider";
import { GlobalStateProvider } from "@/provider/GlobalStateProvider";
import { ToolProvider } from "@/provider/ToolProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableFreeze, enableScreens } from "react-native-screens";

LogBox.ignoreAllLogs(true);
enableFreeze(true);
enableScreens(true);

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
