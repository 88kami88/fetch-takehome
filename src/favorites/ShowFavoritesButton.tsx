import { useState } from "react";
import { Box, Button, CircularProgress, Modal } from "@mui/material";

import useFavorites from "./use-favorites";

export default function ShowFavoritesButton() {
  const { error, favorites, isLoadingDogs, loadDogs } = useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onShowFavorites() {
    // don't await, we'll display what we have when we have it
    loadDogs();

    setIsModalOpen(true);
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
      <Modal open={isModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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
          {favorites.size && <ul></ul>}
          <Button onClick={onModalClose} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
