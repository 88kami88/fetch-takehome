import { FormEvent } from "react";
import { useAuth } from "./use-auth";
import { authUrl } from "../constants";
import { Button, TextField } from "@mui/material";

import "./Login.css";

export default function Login() {
  const { setIsLoggedIn } = useAuth();

  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // validate name and email string

    // move fetching to useAuth
    const res = await fetch(authUrl, {
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
    } else {
      // todo
    }
  }

  return (
    <form className="login-form" onSubmit={onLogin}>
      <label>Name</label>
      <TextField className="field" type="text" name="name" placeholder="name" />
      <label>Email</label>
      <TextField
        className="field"
        type="text"
        name="email"
        placeholder="email"
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
}
