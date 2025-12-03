import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
      {/* <SignUp /> */}
    </>
  );
}

export default App;
