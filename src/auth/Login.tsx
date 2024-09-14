import { FormEvent } from "react";
import { useAuth } from "./use-auth-context";
import { authUrl } from "../constants";

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
    <form onSubmit={onLogin}>
      <label>Name</label>
      <input type="text" name="name" placeholder="name" />
      <label>Email</label>
      <input type="text" name="email" placeholder="email" />
      <button type="submit">Login</button>
    </form>
  );
}
