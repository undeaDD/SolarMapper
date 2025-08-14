import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export type Ellipse = {
  x: number;
  y: number;
  startX: number;
  startY: number;
  toolType: number | null;
};

type State = {
  ellipses: Ellipse[];
  setEllipses: Dispatch<SetStateAction<Ellipse[]>>;
  showEllipses: boolean;
  setShowEllipses: Dispatch<SetStateAction<boolean>>;
  toggleEllipses: () => void;
};

const initialState: State = {
  ellipses: [],
  setEllipses: () => {},
  showEllipses: true,
  setShowEllipses: () => {},
  toggleEllipses: () => {},
};

const EllipsesContext = createContext(initialState);

export const EllipsesProvider = ({ children }: { children: ReactNode }) => {
  const [ellipses, setEllipses] = useState<Ellipse[]>([]);
  const [showEllipses, setShowEllipses] = useState<boolean>(true);

  const toggleEllipses = () => {
    setShowEllipses((prev) => !prev);
  };

  const state = {
    ellipses,
    setEllipses,
    showEllipses,
    setShowEllipses,
    toggleEllipses,
  };

  return (
    <EllipsesContext.Provider value={state}>
      {children}
    </EllipsesContext.Provider>
  );
};

export const useEllipses = () => {
  const context = useContext(EllipsesContext);
  if (!context) {
    throw new Error("useEllipses must be used within an EllipsesProvider");
  }
  return context;
};
