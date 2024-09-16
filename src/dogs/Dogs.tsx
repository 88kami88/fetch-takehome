import { useCallback, useEffect, useState } from "react";

import { searchPath } from "../constants";
import { DogCard } from "./DogCard";
import { useBreed } from "../breeds/use-breed";
import { Dog, searchDogs } from "./dog-service";

import "./Dogs.css";
import { Box } from "@mui/material";

export default function Dogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [next, setNext] = useState<string | undefined>();
  const [prev, setPrev] = useState<string | undefined>();
  const { breeds, sort } = useBreed();

  const onSearch = useCallback(
    async (path: string, isCursor: boolean) => {
      const [search, dogs] = await searchDogs(path, breeds, sort, isCursor);

      setNext(search.next);
      setPrev(search.prev);

      setDogs(dogs);
    },
    [breeds, setDogs, setNext, setPrev, sort]
  );

  function onPrev() {
    if (!prev) {
      return;
    }

    onSearch(prev, true);
  }

  function onNext() {
    if (!next) {
      return;
    }

    onSearch(next, true);
  }

  useEffect(() => {
    onSearch(`/dogs${searchPath}`, false);
  }, [breeds, onSearch, sort]); // must re-search when breed or sort changes even though it's not a direct dependency

  return (
    <>
      <ul className="dogs">
        {dogs.map((dog) => (
          <li key={dog.id}>
            <DogCard dog={dog} />
          </li>
        ))}
      </ul>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        {prev && <button onClick={onPrev}>Prev</button>}
        {next && <button onClick={onNext}>Next</button>}
      </Box>
    </>
  );
}
