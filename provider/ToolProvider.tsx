import React, { createContext, ReactNode, useContext, useState } from "react";

export type Tool = {
  id: number;
  label: string;
  icon: number;
  subTools: SubTool[];
};

export type SubTool = {
  id: number;
  label: string;
  icon: number;
};

const tools: Tool[] = [
  {
    id: 0,
    label: "Planeten",
    icon: require("./../assets/planet.png"),
    subTools: [
      { id: 0, label: "Sonne", icon: require("./../assets/sun.png") },
      { id: 1, label: "Merkur", icon: require("./../assets/mercury.png") },
      { id: 2, label: "Venus", icon: require("./../assets/venus.png") },
      { id: 3, label: "Erde", icon: require("./../assets/earth.png") },
      { id: 4, label: "Mars", icon: require("./../assets/mars.png") },
      { id: 5, label: "Jupiter", icon: require("./../assets/jupiter.png") },
      { id: 6, label: "Saturn", icon: require("./../assets/saturn.png") },
      { id: 7, label: "Uranus", icon: require("./../assets/uranus.png") },
      { id: 8, label: "Neptun", icon: require("./../assets/neptune.png") },
    ],
  },
  {
    id: 1,
    label: "Zwergen",
    icon: require("./../assets/moon.png"),
    subTools: [
      // Dwarf planets
      { id: 9, label: "Pluto", icon: require("./../assets/pluto.png") },
      { id: 10, label: "Ceres", icon: require("./../assets/ceres.png") },
      { id: 11, label: "Haumea", icon: require("./../assets/haumea.png") },
      { id: 12, label: "Makemake", icon: require("./../assets/makemake.png") },
      { id: 13, label: "Eris", icon: require("./../assets/eris.png") },
      // Moons
      { id: 14, label: "Mond", icon: require("./../assets/moon.png") },
      { id: 15, label: "Deimos", icon: require("./../assets/deimos.png") },
      { id: 16, label: "Phobos", icon: require("./../assets/phobos.png") },
    ],
  },
  {
    id: 2,
    label: "Bahnen",
    icon: require("./../assets/orbit.png"),
    subTools: [
      { id: 17, label: "Umlaufbahn", icon: require("./../assets/orbit.png") },
      { id: 18, label: "Satelitenbahn", icon: require("./../assets/satellite_orbit.png") },
      { id: 19, label: "Asteroidenbahn", icon: require("./../assets/asteroid_orbit.png") },
      { id: 20, label: "Mehrfachbahnen", icon: require("./../assets/multiple_orbits.png") },
    ],
  },
  {
    id: 3,
    label: "Objekte",
    icon: require("./../assets/rocket.png"),
    subTools: [
      { id: 21, label: "Rakete", icon: require("./../assets/rocket.png") },
      { id: 22, label: "Wolken", icon: require("./../assets/clouds.png") },
      { id: 23, label: "Sterne", icon: require("./../assets/stars.png") },
      { id: 24, label: "UFO", icon: require("./../assets/ufo.png") },
      { id: 25, label: "Regenbogen", icon: require("./../assets/rainbow.png") },
      { id: 26, label: "Komet", icon: require("./../assets/rock.png") },
      { id: 27, label: "Satellit", icon: require("./../assets/satellite.png") },
      { id: 28, label: "Asteroid", icon: require("./../assets/rock.png") },
      { id: 29, label: "Raumstation", icon: require("./../assets/space_station.png") },
    ],
  },
  {
    id: 4,
    label: "Unbekannt",
    icon: require("./../assets/unknown.png"),
    subTools: [
      { id: 30, label: "Planet", icon: require("./../assets/unknown.png") },
      { id: 31, label: "Objekt", icon: require("./../assets/unknown.png") },
    ],
  },
];

type State = {
  tools: Tool[];
  selectedTool: Tool | null;
  setSelectedTool: (tool: Tool | null) => void;
  selectedSubTool: SubTool | null;
  setSelectedSubTool: (subTool: SubTool | null) => void;
};

const initialState: State = {
  tools,
  selectedTool: null,
  setSelectedTool: (tool: Tool | null) => {},
  selectedSubTool: null,
  setSelectedSubTool: (subTool: SubTool | null) => {},
};

const ToolContext = createContext(initialState);

export const ToolProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedSubTool, setSelectedSubTool] = useState<SubTool | null>(null);

  const state = {
    tools,
    selectedTool,
    setSelectedTool,
    selectedSubTool,
    setSelectedSubTool,
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
