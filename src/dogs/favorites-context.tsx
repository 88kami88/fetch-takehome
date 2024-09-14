import { createContext, ReactNode, useCallback, useState } from "react";

interface FavoritesContextType {
  favorites: string[]; // array of dog ids
  favorite: (dogId: string) => void; // favorite a dog
  unfavorite: (dogId: string) => void; // unfavorite a dog
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const favorite = useCallback(
    (dogId: string) => {
      setFavorites((faves) => [...faves.filter((f) => f !== dogId), dogId]);
    },
    [setFavorites]
  );

  const unfavorite = useCallback(
    (dogId: string) => {
      setFavorites((faves) => faves.filter((f) => f !== dogId));
    },
    [setFavorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, favorite, unfavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
