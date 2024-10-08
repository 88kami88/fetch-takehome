import { Box } from "@mui/material";

import { useAuth } from "./auth/use-auth";
import Login from "./auth/Login";
import Profile from "./auth/Profile";
import Dogs from "./dogs/Dogs";
import BreedFilter from "./breeds/BreedFilter";
import BreedSort from "./breeds/BreedSort";
import { MatchButton } from "./matches/MatchButton";
import ClearFavorites from "./favorites/ClearFavoritesButton";
import ShowFavoritesButton from "./favorites/ShowFavoritesButton";

import "./App.css";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Profile />}
      {!isLoggedIn && <Login />}
      {isLoggedIn && (
        <>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <BreedFilter />
            <BreedSort />
            <MatchButton />
            <ClearFavorites />
            <ShowFavoritesButton />
          </Box>
          <Dogs />
        </>
      )}
    </>
  );
}

export default App;
