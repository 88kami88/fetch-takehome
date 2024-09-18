import { Button } from "@mui/material";
import useFavorites from "./use-favorites";

export default function ClearFavorites() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <Button
      disabled={favorites.size === 0}
      onClick={clearFavorites}
      variant="outlined"
    >
      Clear favorites
    </Button>
  );
}
