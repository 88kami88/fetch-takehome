import { matchesUrl } from "../constants";
import useFavorites from "../favorites/use-favorites";

export function MatchButton() {
  const { favorites } = useFavorites();

  async function onMatch() {
    const res = await fetch(matchesUrl, {
      body: JSON.stringify([...favorites]),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    // handle error

    const json = await res.json();
    console.log(json);
  }

  return <button onClick={onMatch}>Match</button>;
}
