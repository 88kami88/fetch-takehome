import { Box, Button, CircularProgress, Modal } from "@mui/material";

import useFavorites from "../favorites/use-favorites";
import { useState } from "react";
import { Dog } from "../dogs/dog-service";
import { DogCard } from "../dogs/DogCard";
import { useMatch } from "./use-match";

export function MatchButton() {
  const { favorites } = useFavorites();

  const [match, setMatch] = useState<Dog>();
  const { getMatch, isLoading, error } = useMatch();

  const [isModalOpen, setModalOpen] = useState(false);

  async function onMatch() {
    setMatch(undefined);
    setModalOpen(true);

    const match = await getMatch();
    if (match) {
      setMatch(match);
    }
  }

  const onModalClose = () => setModalOpen(false);

  return (
    <>
      <Button onClick={onMatch} disabled={!favorites.size} variant="outlined">
        Match
      </Button>
      <Modal open={isModalOpen} onClose={onModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
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
          <h2>{isLoading ? "Matching..." : "We found a match!"}</h2>
          {error && error}
          {isLoading && <CircularProgress />}
          {match && <DogCard canFavorite={false} dog={match} />}
          <Button onClick={onModalClose} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
