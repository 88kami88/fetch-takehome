import { FormEvent, useState } from "react";

import Login from "./auth/Login";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <Login />;
}

export default App;
