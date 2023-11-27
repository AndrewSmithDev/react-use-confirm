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
// setup
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
```

[View a demo running on Vercel](https://dialog-example-pink.vercel.app/)
