import { useEffect, useState } from "react";
import { dogsUrl, searchUrl } from "../constants";
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

export default function Dogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    (async () => {
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

      setDogs(dogsJson);
    })();
  }, []);

  return (
    <ul>
      {dogs.map((dog) => (
        <li key={dog.id}>
          <DogCard dog={dog} />
        </li>
      ))}
    </ul>
  );
}
