import { FormEvent, useEffect, useState } from "react";
import { breedsUrl } from "../constants";
import { useBreed } from "./use-breed";

export default function BreedFilter() {
  const [breeds, setBreeds] = useState<string[] | undefined>();
  const { breed, setBreed } = useBreed();

  useEffect(() => {
    (async () => {
      const res = await fetch(breedsUrl, {
        credentials: "include",
      });
      const json = await res.json();

      // TODO error handling

      setBreeds(json);
    })();
  }, []);
  console.log(breed);
  function onBreedSelected(e: FormEvent<HTMLSelectElement>) {
    if (e.currentTarget.value) {
      setBreed(e.currentTarget.value);
    } else {
      setBreed(undefined);
    }
  }

  if (!breeds) {
    return (
      <select>
        <option>loading...</option>
      </select>
    );
  }

  const options = ["", ...breeds];

  return (
    <select onChange={onBreedSelected}>
      {options.map((b) => (
        <option key={b} defaultValue={breed}>
          {b}
        </option>
      ))}
    </select>
  );
}
