import React, { createContext, useState, useRef } from "react";


export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [openShoppingCart, setOpenShoppingCart] = useState(false);
  const cartRef = useRef();
  const [addedToCart, setAddedtoCart] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(false);
  const [unreadMessagesMoreThanOne, setUnreadMessagesMoreThanOne] = useState(false);
  const [unSeenOrders, setUnSeenOrders] = useState(false)

  return (
    <InfoContext.Provider
      value={{
        cartCount,
        setCartCount,
        openShoppingCart,
        setOpenShoppingCart,
        cartRef,
        addedToCart,
        setAddedtoCart,
        unreadMessages,
        setUnreadMessages,
        unreadMessagesMoreThanOne,
        setUnreadMessagesMoreThanOne,
        unSeenOrders,
        setUnSeenOrders,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
