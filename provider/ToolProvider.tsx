import React, { createContext, ReactNode, useContext, useState } from "react";

export type Tool = {
  id: number;
  label: string;
  icon: number;
};

const tools: Tool[] = [
  { id: 0, label: "Planeten", icon: require("./../assets/planet.png") },
  { id: 1, label: "Monde", icon: require("./../assets/moon.png") },
  { id: 2, label: "Bahnen", icon: require("./../assets/ring.png") },
  { id: 3, label: "Objekte", icon: require("./../assets/rocket.png") },
  { id: 4, label: "Unbekannt", icon: require("./../assets/unknown.png") },
];

type State = {
  tools: Tool[];
  selectedTool: Tool | null;
  setSelectedTool: (tool: Tool | null) => void;
};

const initialState: State = {
  tools,
  selectedTool: null,
  setSelectedTool: (tool: Tool | null) => {},
};

const ToolContext = createContext(initialState);

export const ToolProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const state = {
    tools,
    selectedTool,
    setSelectedTool,
  };

  return <ToolContext.Provider value={state}>{children}</ToolContext.Provider>;
};

export const useTools = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("useTools must be used within a ToolProvider");
  }
  return context;
};
