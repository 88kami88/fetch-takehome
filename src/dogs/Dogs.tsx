import { useEffect, useState } from "react";
import { searchUrl } from "../constants";
import axios from "axios";

type SearchResultIds = number[];

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
      //   const res = await fetch(searchUrl, {
      //     credentials: "include",
      //   });

      //   // TODO handle error

      //   const json = (await res.json()) as SearchResponse;

      //   const resultIds: SearchResultIds = json.resultIds;

      try {
        const res = await axios.get(searchUrl, {
          withCredentials: true, // This ensures that cookies are included
        });

        console.log("here");
        setDogs(res.data.resultIds);
      } catch (e) {}
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
