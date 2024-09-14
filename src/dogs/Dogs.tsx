import { useEffect, useState } from "react";
import { baseUrl, dogsUrl, searchPath } from "../constants";
import { DogCard } from "./DogCard";

type SearchResultIds = string[];

interface SearchResponse {
  resultIds: SearchResultIds;
  total: number;
  next?: string;
  prev?: string;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

async function searchDogs(path: string): Promise<[SearchResponse, Dog[]]> {
  console.log({ path });
  const searchRes = await fetch(`${baseUrl}${path}`, {
    credentials: "include",
  });

  // TODO handle error

  const searchJson = (await searchRes.json()) as SearchResponse;
  const resultIds: SearchResultIds = searchJson.resultIds;

  const dogsRes = await fetch(dogsUrl, {
    body: JSON.stringify(resultIds),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  // TODO handle error

  const dogsJson = (await dogsRes.json()) as Dog[];

  return [searchJson, dogsJson];
}

export default function Dogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [next, setNext] = useState<string | undefined>();
  const [prev, setPrev] = useState<string | undefined>();

  async function onSearch(path = `/dogs${searchPath}`) {
    const [search, dogs] = await searchDogs(path);

    setNext(search.next);
    setPrev(search.prev);

    setDogs(dogs);
  }

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
    onSearch();
  }, []);

  return (
    <>
      <ul>
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
