import { createContext, ReactNode, useState } from "react";

export type Sort = "asc" | "desc";

interface BreedContextType {
  breeds: string[];
  selectBreeds: (breeds: string[]) => void;
  sort: Sort;
  setSort: (sort: Sort) => void;
}

export const BreedContext = createContext<BreedContextType | undefined>(
  undefined
);

export function BreedProvider({ children }: { children: ReactNode }) {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("asc");

  return (
    <BreedContext.Provider
      value={{ breeds, selectBreeds: setBreeds, sort, setSort }}
    >
      {children}
    </BreedContext.Provider>
  );
}
