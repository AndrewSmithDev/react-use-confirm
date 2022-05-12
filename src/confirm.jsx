import { Dialog, DialogActions, DialogContent, DialogTitle, Paper } from "@mui/material";
import { Typography, Button } from "@mui/material";
import React, { useRef, useState, useContext } from "react";
import { useMemo } from "react";

const ConfirmContext = React.createContext();

export const useConfirm = () => {
  return useContext(ConfirmContext);
};

export const ConfirmWrapper = ({ children }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const statusRef = useRef();
  const event = useMemo(() => new Event("confirm"), []);

  const confirm = (message) => {
    setMessage(message);
    setOpen(true);

    statusRef.current = false;
    return new Promise((resolve) => {
      document.addEventListener("confirm", () => resolve(statusRef.current));
    });
  };

  const handleCancel = () => {
    setOpen(false);
    document.dispatchEvent(event);
  };

  const handleConfrim = () => {
    statusRef.current = true;
    setOpen(false);
    document.dispatchEvent(event);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      <Dialog open={open}>
        <DialogContent>
          <Typography variant="subtitle1">{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfrim} variant="contained">
            OK
          </Button>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </ConfirmContext.Provider>
  );
};
