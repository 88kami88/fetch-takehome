import { breedsUrl } from "../constants";

export async function getBreeds() {
  const res = await fetch(breedsUrl, {
    credentials: "include",
  });

  const json = (await res.json()) as string[];
  return json;
}
