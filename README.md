A very simple confirm dialog using the new [dialog element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) with a custom hook `useConfirm`

```javascript
// example of using useConfirm
export const MyComponent = () => {
  const { confirm } = useConfirm();
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setMessage("");

    if (await confirm("Are you sure?")) {
      setMessage("✅ You clicked confirm");
    } else {
      setMessage("❌ You clicked cancel");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <p>{message}</p>
    </div>
  );
};
```

```javascript
// use confirm code
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
```

[View a demo running on Vercel](https://dialog-example-pink.vercel.app/)
