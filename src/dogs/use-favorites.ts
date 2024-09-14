import { useContext } from "react";
import { FavoritesContext } from "./favorites-context";

export default function useFavorites() {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return favoritesContext;
}
