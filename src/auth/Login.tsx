import { FormEvent, useState } from "react";
import { useAuth } from "./use-auth";
import { loginUrl } from "../constants";
import { Button, TextField } from "@mui/material";

import "./Login.css";

export default function Login() {
  const { setIsLoggedIn, setUsername } = useAuth();
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    setNameError(null);
    setEmailError(null);

    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // move fetching to useAuth
    const res = await fetch(loginUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    const status = res.status;

    // use constants for 200
    if (status === 200) {
      setIsLoggedIn(true);
      setUsername(name);
    } else {
      console.error("Login failed with status", status);
    }
  }

  return (
    <form className="login-form" onSubmit={onLogin}>
      <label>Name</label>
      <TextField
        className="field"
        type="text"
        name="name"
        placeholder="name"
        error={!!nameError}
        helperText={nameError}
      />
      <label>Email</label>
      <TextField
        className="field"
        type="text"
        name="email"
        placeholder="email"
        error={!!emailError}
        helperText={emailError}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
}
