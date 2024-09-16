import { Box, Button, Card } from "@mui/material";

import { Dog } from "./dog-service";
import useFavorites from "../favorites/use-favorites";

import "./DogCard.css";

interface DogCardProps {
  dog: Dog;
  canFavorite?: boolean;
}

export function DogCard({ canFavorite = true, dog }: DogCardProps) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.has(dog.id);

  return (
    <Card
      variant="outlined"
      className="dog-card"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "550px",
        justifyContent: "space-between",
        width: "500px",
      }}
    >
      <div>
        <img
          src={dog.img}
          alt={`${dog.name}, ${dog.breed}, ${dog.age}, ${dog.zip_code}`}
        />
      </div>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            alignItems: "start",
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <div>Name: {dog.name}</div>
          <div>Age: {dog.age}</div>
          <div>Breed: {dog.breed}</div>
          <div>Zip code: {dog.zip_code}</div>
        </Box>
        {canFavorite && (
          <Button
            onClick={() => toggleFavorite(dog.id)}
            sx={{ bgcolor: "secondary.dark" }}
          >
            {isFavorite ? "♥" : "♡"}
          </Button>
        )}
      </Box>
    </Card>
  );
}
