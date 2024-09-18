import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import App from "./App.tsx";
import { AuthProvider } from "./auth/auth-context.tsx";
import { BreedProvider } from "./breeds/breed-context.tsx";
import { FavoritesProvider } from "./favorites/favorites-context.tsx";

import "./index.css";

// Define your custom theme
const customTheme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    primary: {
      main: "#90caf9", // Light blue
    },
    secondary: {
      main: "#f48fb1", // Pinkish color
    },
    background: {
      default: "#121212", // Dark background color
      paper: "#1e1e1e", // Slightly lighter background for components like cards
    },
    text: {
      primary: "#ffffff", // White text
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      {/* CssBaseline helps reset default styles and apply your theme globally */}
      <CssBaseline />
      <AuthProvider>
        <BreedProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </BreedProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
