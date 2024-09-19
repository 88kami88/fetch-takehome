import { useCallback, useState, useEffect } from "react";
import { Dog, searchDogs, SearchResponse } from "./dog-service";

import { useBreed } from "../breeds/use-breed";
import { searchPath } from "../constants";

export function useDogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { breeds, sort } = useBreed();

  // Used for subsequent fetches after the first one
  const fetchDogs = useCallback(
    async (path: string, isCursor: boolean = false) => {
      setIsLoading(true);
      setDogs([]);
      setSearchResults(null);
      setError(null);

      try {
        const [search, dogs] = await searchDogs(path, breeds, sort, isCursor);
        setSearchResults(search);
        setDogs(dogs);
      } catch {
        setError("Unable to fetch dogs");
      } finally {
        setIsLoading(false);
      }
    },
    [breeds, sort]
  );

  useEffect(() => {
    fetchDogs(searchPath, false); // Initial fetch
  }, [fetchDogs]);

  return {
    dogs,
    searchResults,
    isLoading,
    error,
    fetchDogs,
  };
}
