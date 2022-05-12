import React, { useRef, useState, useContext } from "react";

const ConfirmContext = React.createContext();

export const useConfirm = () => {
  return useContext(ConfirmContext);
};

export const ConfirmWrapper = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const statusRef = useRef();
  const confirmRef = useRef();

  const confirm = (message) => {
    setMessage(message);
    setOpen(true);

    statusRef.current = undefined;
    return new Promise((resolve) => {
      confirmRef.current.addEventListener("close", () => {
        setOpen(false);
        resolve(statusRef.current);
      });
    });
  };

  const handleCancel = () => {
    statusRef.current = false;
    confirmRef.current.close();
  };

  const handleConfrim = () => {
    statusRef.current = true;
    confirmRef.current.close();
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      <dialog open={open} ref={confirmRef}>
        <p>{message}</p>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleConfrim}>Confirm</button>
      </dialog>
      {children}
    </ConfirmContext.Provider>
  );
};
