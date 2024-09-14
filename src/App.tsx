import { useAuth } from "./auth/use-auth";
import Login from "./auth/Login";

import "./App.css";
import Profile from "./profile/Profile";
import Dogs from "./dogs/Dogs";
import BreedFilter from "./breeds/BreedFilter";
import BreedSort from "./breeds/BreedSort";
import { MatchButton } from "./matches/MatchButton";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Profile />}
      {!isLoggedIn && <Login />}
      {isLoggedIn && (
        <>
          <BreedFilter />
          <BreedSort />
          <MatchButton />
          <Dogs />
        </>
      )}
    </>
  );
}

export default App;
