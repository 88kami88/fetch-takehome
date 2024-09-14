import { useEffect, useState } from "react";
import { dogsUrl, searchUrl } from "../constants";

type SearchResultIds = string[];

interface SearchResponse {
  resultIds: SearchResultIds;
  total: number;
  next?: string;
  prev?: string;
}

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function Dogs() {
  const [dogs, setDogs] = useState<SearchResultIds>([]);

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
      console.log(dogsJson);

      setDogs(resultIds);
    })();
  }, []);

  return (
    <ul>
      {dogs.map((dog) => (
        <li key={dog}>{dog}</li>
      ))}
    </ul>
  );
}
