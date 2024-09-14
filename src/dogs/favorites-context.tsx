import { createContext, ReactNode, useCallback, useState } from "react";

interface FavoritesContextType {
  favorites: string[]; // array of dog ids
  toggleFavorite: (dogId: string) => void; // favorites on unfavorites a dog
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = useCallback(
    (dogId: string) => {
      const isFavorite = favorites.includes(dogId);

      if (isFavorite) {
        setFavorites(favorites.filter((fave) => fave !== dogId));
      } else {
        setFavorites([...favorites.filter((fave) => fave !== dogId), dogId]);
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
