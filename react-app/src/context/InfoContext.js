import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {




  return (
    <InfoContext.Provider
      value={{

      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
