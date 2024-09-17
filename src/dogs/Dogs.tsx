import { DogCard } from "./DogCard";

import "./Dogs.css";
import { Box, CircularProgress } from "@mui/material";
import { useDogs } from "./use-dogs";

export default function Dogs() {
  const { dogs, searchResults, isLoading, error, fetchDogs } = useDogs();

  function onPrev() {
    if (searchResults?.prev) {
      fetchDogs(searchResults.prev, true);
    }
  }

  function onNext() {
    if (searchResults?.next) {
      fetchDogs(searchResults.next, true);
    }
  }

  if (error) {
    return error;
  }

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ paddingBottom: "100px" }}>
            <ul className="dogs">
              {dogs.map((dog) => (
                <li key={dog.id}>
                  <DogCard dog={dog} />
                </li>
              ))}
            </ul>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              justifyContent: "center",
              padding: "10px 20px",
              backgroundColor: "white",
              boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {searchResults?.prev && <button onClick={onPrev}>Prev</button>}
            {searchResults?.next && <button onClick={onNext}>Next</button>}
          </Box>
        </>
      )}
    </>
  );
}
