import { FormEvent, useState } from "react";

import { useAuth } from "./auth/use-auth-context";
import Login from "./auth/Login";

import "./App.css";
import Profile from "./profile/Profile";
import Dogs from "./dogs/Dogs";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Profile />}
      {!isLoggedIn && <Login />}
      {isLoggedIn && <Dogs />}
    </>
  );
}

export default App;
