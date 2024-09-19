import { loginUrl, logoutUrl } from "../constants";

export async function login(name: string, email: string) {
  try {
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

    if (status >= 400) {
      console.error(await res.text());
      throw new Error("Unexpected error logging in");
    }
  } catch (e) {
    console.error(e);
    throw new Error("Unexpected error logging in");
  }
}

export async function logout() {
  await fetch(logoutUrl, {
    credentials: "include",
    method: "POST",
  });
}
