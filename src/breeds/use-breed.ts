import { useContext } from "react";

import { BreedContext } from "./breed-context";

export function useBreed() {
  const breedContext = useContext(BreedContext);

  if (!breedContext) {
    throw new Error("useBreed must be used within a BreedProvider");
  }

  return breedContext;
}
