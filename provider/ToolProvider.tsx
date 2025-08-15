import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Tool = {
  id: number;
  label: string;
  icon: number;
};

export type Addon = {
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
  addons: Addon[];
  selectedTool: Tool | null;
  setSelectedTool: (tool: Tool | null) => void;
  selectedAddon: Addon | null;
  setSelectedAddon: (addon: Addon | null) => void;
};

const initialState: State = {
  tools,
  addons: [],
  selectedTool: null,
  setSelectedTool: (tool: Tool | null) => {},
  selectedAddon: null,
  setSelectedAddon: (addon: Addon | null) => {},
};

const ToolContext = createContext(initialState);

export const ToolProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedAddon, setSelectedAddon] = useState<Addon | null>(null);
  const [addons, setAddons] = useState<Addon[]>([]);

  useEffect(() => {
    switch (selectedTool?.id) {
      case 0:
        // Planets
        setAddons([
          { id: 0, label: "Sonne", icon: require("./../assets/sun.png") },
          { id: 1, label: "Merkur", icon: require("./../assets/mercury.png") },
          { id: 2, label: "Venus", icon: require("./../assets/venus.png") },
          { id: 3, label: "Erde", icon: require("./../assets/earth.png") },
          { id: 4, label: "Mars", icon: require("./../assets/mars.png") },
          { id: 5, label: "Jupiter", icon: require("./../assets/jupiter.png") },
          { id: 6, label: "Saturn", icon: require("./../assets/saturn.png") },
          { id: 7, label: "Uranus", icon: require("./../assets/uranus.png") },
          { id: 8, label: "Neptun", icon: require("./../assets/neptune.png") },
          { id: 9, label: "Pluto", icon: require("./../assets/pluto.png") }
        ]);
        break;
      case 1:
        // Moons
        setAddons([
          { id: 0, label: "Mond", icon: require("./../assets/moon.png") },
          { id: 1, label: "Phobos", icon: require("./../assets/phobos.png") },
          { id: 2, label: "Deimos", icon: require("./../assets/deimos.png") },
          { id: 3, label: "Europa", icon: require("./../assets/europa.png") },
          { id: 4, label: "Ganymed", icon: require("./../assets/ganymede.png") },
          { id: 5, label: "Asteroid", icon: require("./../assets/asteroid.png") },
        ]);
        break;
      case 2:
        // Rings
        setAddons([
          { id: 4, label: "Einzel Umlaufbahn", icon: require("./../assets/single_orbit.png") },
          { id: 4, label: "Kombinierte Umlaufbahn", icon: require("./../assets/single_orbit.png") },
        ]);
      case 3:
        // Objects
        setAddons([
          { id: 0, label: "Rakete", icon: require("./../assets/rocket.png") },
          { id: 1, label: "Wolken", icon: require("./../assets/clouds.png") },
          { id: 2, label: "Sterne", icon: require("./../assets/stars.png") },
          { id: 3, label: "UFO", icon: require("./../assets/ufo.png") },
          { id: 4, label: "Regenbogen", icon: require("./../assets/rainbow.png") },
          { id: 5, label: "Komet", icon: require("./../assets/comet.png") },
        ]);
      case 4:
        // Unknown
        setAddons([
          {id: 0, label: "Unbekannter Planet", icon: require("./../assets/unknown.png") },
          {id: 1, label: "Unbekanntes Objekt", icon: require("./../assets/unknown.png") },
        ]);
      default:
        setAddons([]);
    }
  }, [selectedTool]);

  const state = {
    tools,
    addons,
    selectedTool,
    setSelectedTool,
    selectedAddon,
    setSelectedAddon,
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
