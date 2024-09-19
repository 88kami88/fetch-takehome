import { breedsUrl } from "../constants";

export async function getBreeds() {
  const res = await fetch(breedsUrl, {
    credentials: "include",
  });

  if (res.status >= 400) {
    const error = `Unexpected error fetching breeds: ${await res.text()}`;
    console.error(error);
    throw new Error(error);
  }

  const json = (await res.json()) as string[];
  return json;
}
