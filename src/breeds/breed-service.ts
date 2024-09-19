import { breedsUrl } from "../constants";

export async function getBreeds() {
  const res = await fetch(breedsUrl, {
    credentials: "include",
  });

  if (res.status >= 400) {
    throw new Error("Unexpected error fetching breeds");
  }

  const json = (await res.json()) as string[];
  return json;
}
