import { createContext, ReactNode, useState } from "react";

interface BreedContextType {
  breed: string | undefined;
  setBreed: (breed: string | undefined) => void;
}

export const BreedContext = createContext<BreedContextType | undefined>(
  undefined
);

export function BreedProvider({ children }: { children: ReactNode }) {
  const [breed, setBreed] = useState<string | undefined>();

  return (
    <BreedContext.Provider value={{ breed, setBreed }}>
      {children}
    </BreedContext.Provider>
  );
}
