// import React, { createContext, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export const ModalContext = createContext();

// export const ModalProvider = ({ children }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [type, setType] = useState(null);

//   // Example:
//   //   Create toggle function for onClicks to change modal type to show
//   //   const toggleLogin = () => {
//   //     setType("login");
//   //   };

//   const loginModal = () => {
//     setType("LOGIN");
//   };


//   const signupModal = () => {
//     setType("SIGNUP");
//   };

//   const deleteOrderModal = () => {
//     setType("DELETE-ORDER")
//   }

//   return (
//     <ModalContext.Provider
//       value={{
//         isModalOpen,
//         setIsModalOpen,
//         type,
//         setType,
//         loginModal,
//         signupModal,
//         deleteOrderModal,
//       }}
//     >
//       {children}
//     </ModalContext.Provider>
//   );
// };





import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import './Modal.css';
import "../utils/css/Modal.css"

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);

  if (!modalNode) return null;
  
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}