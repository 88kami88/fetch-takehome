import { useAuth } from "./auth/use-auth";
import Login from "./auth/Login";

import "./App.css";
import Profile from "./profile/Profile";
import Dogs from "./dogs/Dogs";
import BreedFilter from "./dogs/BreedFilter";
import BreedSort from "./dogs/BreedSort";

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
          <Dogs />
        </>
      )}
    </>
  );
}

export default App;
