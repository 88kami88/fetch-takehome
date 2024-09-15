import { dogsUrl } from "../constants";
import { Dog } from "./Dogs";

export async function getDogsById(ids: string[]) {
  const res = await fetch(dogsUrl, {
    body: JSON.stringify(ids),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const dogs = (await res.json()) as Dog[];

  return dogs;
}
