import { useEffect, useState } from "react";
import { baseUrl, dogsUrl, searchPath } from "../constants";
import { DogCard } from "./DogCard";
import { useBreed } from "./use-breed";

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

async function searchDogs(
  path: string,
  breed: string | undefined
): Promise<[SearchResponse, Dog[]]> {
  const searchUrl = breed
    ? `${baseUrl}${path}?breeds=${breed}`
    : `${baseUrl}${path}`;

  const searchRes = await fetch(searchUrl, {
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
  const { breed } = useBreed();

  async function onSearch(path: string, b: string | undefined = undefined) {
    const [search, dogs] = await searchDogs(path, b);

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
    onSearch(`/dogs${searchPath}`, breed);
  }, [breed]);

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
