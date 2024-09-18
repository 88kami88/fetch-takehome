import { FormEvent, useState } from "react";
import { Button, TextField } from "@mui/material";

import { useAuth } from "./use-auth";
import { login } from "./auth-service";

import "./Login.css";

export default function Login() {
  const { setIsLoggedIn, setUsername } = useAuth();
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAuthError(null);

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

    try {
      await login(name, email);

      setIsLoggedIn(true);
      setUsername(name);
    } catch (e) {
      if (e instanceof Error) {
        setAuthError(e.message);
      }

      if (typeof e === "string") {
        setAuthError(e);
      }
    }
  }

  return (
    <form className="login-form" onSubmit={onLogin}>
      <TextField
        className="field"
        type="text"
        label="Name"
        name="name"
        placeholder="name"
        error={!!nameError}
        helperText={nameError}
      />
      <TextField
        className="field"
        type="text"
        label="Email"
        name="email"
        placeholder="email"
        error={!!emailError}
        helperText={emailError}
      />
      {authError && authError}
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
}
