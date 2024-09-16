import { Box } from "@mui/material";

import { useAuth } from "./auth/use-auth";
import Login from "./auth/Login";
import Profile from "./profile/Profile";
import Dogs from "./dogs/Dogs";
import BreedFilter from "./breeds/BreedFilter";
import BreedSort from "./breeds/BreedSort";
import { MatchButton } from "./matches/MatchButton";

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
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <BreedFilter />
            <BreedSort />
          </Box>
          <MatchButton />
          <Dogs />
        </>
      )}
    </>
  );
}

export default App;
