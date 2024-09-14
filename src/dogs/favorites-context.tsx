import { createContext, ReactNode, useCallback, useState } from "react";

interface FavoritesContextType {
  favorites: Set<string>; // array of dog ids
  toggleFavorite: (dogId: string) => void; // favorites on unfavorites a dog
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

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

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
