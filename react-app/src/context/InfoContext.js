import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);



  return (
    <InfoContext.Provider
      value={{
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
