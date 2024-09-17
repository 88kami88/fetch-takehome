import { useCallback, useState } from "react";

import useFavorites from "../favorites/use-favorites";
import { getMatch } from "./match-service";

export function useMatch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { favorites } = useFavorites();

  const getMatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dog = await getMatch([...favorites]);

      return dog;
    } catch {
      setError("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [favorites]);

  return { error, isLoading, getMatch: getMatches };
}
