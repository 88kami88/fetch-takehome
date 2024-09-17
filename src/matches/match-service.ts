import { matchesUrl } from "../constants";
import { getDogsById } from "../dogs/dog-service";

interface MatchResponse {
  match: string;
}

export async function getMatch(dogIds: string[]) {
  const matchRes = await fetch(matchesUrl, {
    body: JSON.stringify([...dogIds]),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  // handle error

  const matchJson = (await matchRes.json()) as MatchResponse;

  const dogs = await getDogsById([matchJson.match]);

  return dogs.length ? dogs[0] : null;
}
