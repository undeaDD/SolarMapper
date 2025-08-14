import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export type Document = {
  id: number;
  title: string;
  url: string;
};

const documents: Document[] = [
  {
    id: 1,
    title: "Document 1",
    url: "https://devsforge.de/temp/demo.jpeg",
  },
  {
    id: 2,
    title: "Document 2",
    url: "https://devsforge.de/temp/demo.jpeg",
  },
  {
    id: 3,
    title: "Document 3",
    url: "https://devsforge.de/temp/demo.jpeg",
  },
];

type State = {
  documents: Document[];
  selectedDocument: Document | null;
  setSelectedDocument: Dispatch<SetStateAction<Document | null>>;
};

const initialState: State = {
  documents,
  selectedDocument: null,
  setSelectedDocument: () => {},
};

const DocumentContext = createContext(initialState);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const state = {
    documents,
    selectedDocument,
    setSelectedDocument,
  };

  return (
    <DocumentContext.Provider value={state}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
};
