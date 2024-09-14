import { createContext, ReactNode, useState } from "react";

export type Sort = "asc" | "desc";

interface BreedContextType {
  breed: string | undefined;
  setBreed: (breed: string | undefined) => void;
  sort: Sort;
  setSort: (sort: Sort) => void;
}

export const BreedContext = createContext<BreedContextType | undefined>(
  undefined
);

export function BreedProvider({ children }: { children: ReactNode }) {
  const [breed, setBreed] = useState<string | undefined>();
  const [sort, setSort] = useState<Sort>("asc");

  return (
    <BreedContext.Provider value={{ breed, setBreed, sort, setSort }}>
      {children}
    </BreedContext.Provider>
  );
}
