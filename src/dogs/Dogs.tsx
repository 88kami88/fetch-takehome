import { useCallback, useEffect, useState } from "react";

import { searchPath } from "../constants";
import { DogCard } from "./DogCard";
import { useBreed } from "../breeds/use-breed";
import { Dog, searchDogs } from "./dog-service";

import "./Dogs.css";

export default function Dogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [next, setNext] = useState<string | undefined>();
  const [prev, setPrev] = useState<string | undefined>();
  const { breed, sort } = useBreed();

  const onSearch = useCallback(
    async (path: string) => {
      const [search, dogs] = await searchDogs(path, breed, sort);

      setNext(search.next);
      setPrev(search.prev);

      setDogs(dogs);
    },
    [breed, setDogs, setNext, setPrev, sort]
  );

  function onPrev() {
    if (!prev) {
      return;
    }

    onSearch(prev);
  }

  function onNext() {
    if (!next) {
      return;
    }

    onSearch(next);
  }

  useEffect(() => {
    onSearch(`/dogs${searchPath}`);
  }, [breed, onSearch, sort]); // must re-search when breed or sort changes even though it's not a direct dependency

  return (
    <>
      <ul className="dogs">
        {dogs.map((dog) => (
          <li key={dog.id}>
            <DogCard dog={dog} />
          </li>
        ))}
      </ul>
      {prev && <button onClick={onPrev}>Prev</button>}
      {next && <button onClick={onNext}>Next</button>}
    </>
  );
}
