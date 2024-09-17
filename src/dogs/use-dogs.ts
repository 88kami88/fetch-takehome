import { useCallback, useState, useEffect } from "react";
import { Dog, searchDogs, SearchResponse } from "./dog-service";
import { useBreed } from "../breeds/use-breed";
import { searchPath } from "../constants";

export function useDogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [searchResults, setSearchResults] = useState<
    SearchResponse | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { breeds, sort } = useBreed();

  const fetchDogs = useCallback(
    async (path: string, isCursor: boolean = false) => {
      setIsLoading(true);
      setDogs([]);
      setSearchResults(undefined);
      setError(undefined);

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
