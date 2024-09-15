import { useCallback, useEffect, useState } from "react";
import { baseUrl, dogsUrl, searchPath } from "../constants";
import { DogCard } from "./DogCard";
import { useBreed } from "../breeds/use-breed";
import { Sort } from "../breeds/breed-context";
import { getDogsById } from "./dog-service";

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

function buildQueryString(
  params: Record<string, string | number | undefined | null>
): string {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
}

async function searchDogs(
  path: string,
  breed: string | undefined,
  sort: Sort = "asc"
): Promise<[SearchResponse, Dog[]]> {
  const queryString = buildQueryString({
    breeds: breed,
    sort: `breed:${sort}`,
  });

  const searchUrl = breed
    ? `${baseUrl}${path}${queryString}`
    : `${baseUrl}${path}${queryString}`;

  const searchRes = await fetch(searchUrl, {
    credentials: "include",
  });

  // TODO handle error

  const searchJson = (await searchRes.json()) as SearchResponse;
  const resultIds: SearchResultIds = searchJson.resultIds;

  const dogs = await getDogsById(resultIds);

  // TODO handle error

  return [searchJson, dogs];
}

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
