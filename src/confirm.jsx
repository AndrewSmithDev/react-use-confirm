import { Paper } from "@mui/material";
import { Typography, Button } from "@mui/material";
import React, { useRef, useState, useContext } from "react";

const ConfirmContext = React.createContext();

export const useConfirm = () => {
  return useContext(ConfirmContext);
};

export const ConfirmWrapper = ({ children }) => {
  const [message, setMessage] = useState("");
  const statusRef = useRef();
  const confirmRef = useRef();

  const confirm = (message) => {
    setMessage(message);
    confirmRef.current.showModal();

    statusRef.current = false;
    return new Promise((resolve) => {
      confirmRef.current.addEventListener("close", () => {
        resolve(statusRef.current);
      });
    });
  };

  const handleCancel = () => {
    confirmRef.current.close();
  };

  const handleConfrim = () => {
    statusRef.current = true;
    confirmRef.current.close();
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      <dialog
        ref={confirmRef}
        style={{
          border: "none",
          background: "transparent",
        }}
      >
        <Paper elevation={5} sx={{ padding: "24px 32px" }}>
          <Typography variant="subtitle1" sx={{ marginBottom: "8px" }}>
            {message}
          </Typography>
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <Button onClick={handleCancel} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleConfrim} variant="contained">
              Confirm
            </Button>
          </div>
        </Paper>
      </dialog>
      {children}
    </ConfirmContext.Provider>
  );
};
