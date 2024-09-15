import { Dog } from "./Dogs";
import useFavorites from "../favorites/use-favorites";

interface DogCardProps {
  dog: Dog;
  canFavorite?: boolean;
}

export function DogCard({ canFavorite = true, dog }: DogCardProps) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.has(dog.id);

  return (
    <div>
      <div>
        <img
          src={dog.img}
          alt={`${dog.name}, ${dog.breed}, ${dog.age}, ${dog.zip_code}`}
        />
      </div>
      <div>Name: {dog.name}</div>
      <div>Age: {dog.age}</div>
      <div>Breed: {dog.breed}</div>
      <div>Zip code: {dog.zip_code}</div>
      {canFavorite && (
        <button onClick={() => toggleFavorite(dog.id)}>
          {isFavorite ? "♥" : "♡"}
        </button>
      )}
    </div>
  );
}
