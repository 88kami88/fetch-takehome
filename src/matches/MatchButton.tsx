import { Box, Button, Modal } from "@mui/material";

import { matchesUrl } from "../constants";
import useFavorites from "../favorites/use-favorites";
import { useState } from "react";
import { Dog } from "../dogs/Dogs";
import { DogCard } from "../dogs/DogCard";

interface MatchResponse {
  match: string;
}

export function MatchButton() {
  const { favorites } = useFavorites();
  const [match, setMatch] = useState<Dog>();
  const [isModalOpen, setModalOpen] = useState(false);

  async function onMatch() {
    const matchRes = await fetch(matchesUrl, {
      body: JSON.stringify([...favorites]),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    // handle error

    const matchJson = (await matchRes.json()) as MatchResponse;

    // setMatch(json);

    onModalOpen();
  }

  const onModalOpen = () => setModalOpen(true);
  const onModalClose = () => setModalOpen(false);

  return (
    <>
      <button onClick={onMatch}>Match</button>
      {match && (
        <Modal open={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "primary.dark",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2>We found a match!</h2>
            <DogCard dog={match} />
            <Button onClick={onModalClose} variant="contained">
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}
