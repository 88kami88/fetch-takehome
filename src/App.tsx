import { FormEvent } from "react";
import "./App.css";

function App() {
  async function onLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // validate name and email string

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
