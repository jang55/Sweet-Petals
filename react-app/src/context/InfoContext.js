import React, { createContext, useState } from "react";


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
