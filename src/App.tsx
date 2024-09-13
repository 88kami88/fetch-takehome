import { FormEvent, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create FormData object from the form
    const formData = new FormData(e.currentTarget);

    // Extract values from the FormData object
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    fetch("https://frontend-take-home-service.fetch.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
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

export default App;
