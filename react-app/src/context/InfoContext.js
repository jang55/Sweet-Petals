import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [openShoppingCart, setOpenShoppingCart] = useState(false);



  return (
    <InfoContext.Provider
      value={{
        cartCount,
        setCartCount,
        openShoppingCart,
        setOpenShoppingCart,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
