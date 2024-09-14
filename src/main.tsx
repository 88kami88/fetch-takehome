import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./auth/auth-context.tsx";
import { BreedProvider } from "./dogs/breed-context.tsx";
import { FavoritesProvider } from "./dogs/favorites-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BreedProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </BreedProvider>
    </AuthProvider>
  </StrictMode>
);
