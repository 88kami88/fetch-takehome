import { createContext, ReactNode, useCallback, useState } from "react";

import { Dog, getDogsById } from "../dogs/dog-service";

interface FavoritesContextType {
  clearFavorites: () => void;
  error: string | null;
  favorites: Set<string>; // array of dog ids
  loadDogs: () => Promise<Dog[] | null>;
  isLoadingDogs: boolean;
  toggleFavorite: (dogId: string) => void; // favorites on unfavorites a dog
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // just the fave ids, not the dog content
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // You can use favorites above without any loading, but it just returns the ids.
  // Use the above when you only need the ids, like to fetch a match. Use the below
  // when you need full dog details, like showing all favorites, including dog details.
  const [isLoadingDogs, setIsLoadingDogs] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDogs = useCallback(async () => {
    setError(null);
    setIsLoadingDogs(true);

    try {
      const dogs = await getDogsById([...favorites]);
      return dogs;
    } catch {
      setError("An error was encountered.");
    } finally {
      setIsLoadingDogs(false);
    }

    return null;
  }, [favorites]);

  const toggleFavorite = useCallback(
    (dogId: string) => {
      const isFavorite = favorites.has(dogId);

      const newFavorites = new Set(favorites);

      if (isFavorite) {
        newFavorites.delete(dogId);
        setFavorites(newFavorites);
      } else {
        newFavorites.add(dogId);
        setFavorites(newFavorites);
      }
    },
    [favorites, setFavorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        clearFavorites,
        error,
        favorites,
        loadDogs,
        isLoadingDogs,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
