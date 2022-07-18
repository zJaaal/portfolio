import React from "react";
import { useReducer } from "react";
import { AppContext } from "./AppContext";
import { appReducer } from "./appReducer";

const initialState = {
  loadPage: false,
};

const AppContextProvider = ({ children }) => {
  const [app, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ app, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
