import React, { useState } from "react";
import { useConfirm } from "./confirm";

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
