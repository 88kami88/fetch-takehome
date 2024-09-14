import { useEffect, useState } from "react";
import { searchUrl } from "../constants";

type SearchResultIds = string[];

interface SearchResponse {
  resultIds: SearchResultIds;
  total: number;
  next?: string;
  prev?: string;
}

export default function Dogs() {
  const [dogs, setDogs] = useState<SearchResultIds>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(searchUrl, {
        credentials: "include",
      });

      // TODO handle error

      const json = (await res.json()) as SearchResponse;

      const resultIds: SearchResultIds = json.resultIds;

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
