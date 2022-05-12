import React from "react";
import ReactDOM from "react-dom/client";
import { ConfirmWrapper } from "./confirm";
import { MyComponent } from "./component";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfirmWrapper>
      <MyComponent />
    </ConfirmWrapper>
  </React.StrictMode>
);
