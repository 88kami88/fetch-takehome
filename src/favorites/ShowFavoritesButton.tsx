import { useState } from "react";
import { Box, Button, CircularProgress, Modal } from "@mui/material";

import useFavorites from "./use-favorites";
import { DogCard } from "../dogs/DogCard";
import { Dog } from "../dogs/dog-service";

export default function ShowFavoritesButton() {
  const { error, favorites, isLoadingDogs, loadDogs } = useFavorites();
  const [loadedDogs, setLoadedDogs] = useState<Dog[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function onShowFavorites() {
    setLoadedDogs(null);
    setIsModalOpen(true);

    const dogs = await loadDogs();
    setLoadedDogs(dogs || []);
  }

  function onModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Button
        disabled={favorites.size === 0}
        onClick={onShowFavorites}
        variant="outlined"
      >
        Show favorites
      </Button>
      <Modal
        open={isModalOpen}
        onClose={onModalClose}
        sx={{ overflow: "auto" }}
      >
        <Box
          sx={{
            width: "95%",
            bgcolor: "primary.dark",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h2>{isLoadingDogs ? "Getting favorites..." : "Your favorites"}</h2>
          {error && error}
          {isLoadingDogs && <CircularProgress />}

          <ul>
            {loadedDogs &&
              loadedDogs.map((dog) => (
                <li>
                  <DogCard key={dog.id} dog={dog} />
                </li>
              ))}
          </ul>

          <Button onClick={onModalClose} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
