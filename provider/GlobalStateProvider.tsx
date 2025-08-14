import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type State = {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    toggleSidebar: () => void;
};

const initialState: State = {
    sidebarOpen: true,
    setSidebarOpen: () => {},
    toggleSidebar: () => {},
};

const GlobalStateContext = createContext<State>(initialState);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const state = {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
  };

  return (
    <GlobalStateContext.Provider value={state}>
        {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalStateProvider");
  }
  return context;
};
