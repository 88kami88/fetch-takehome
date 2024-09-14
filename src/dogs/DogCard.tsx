import { Dog } from "./Dogs";
import useFavorites from "./use-favorites";

interface DogCardProps {
  dog: Dog;
}

export function DogCard({ dog }: DogCardProps) {
  const { favorites, favorite, unfavorite } = useFavorites();
  console.log({ favorites });

  const isFavorite = favorites.includes(dog.id);

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
      <button onClick={() => favorite(dog.id)}>{isFavorite ? "♥" : "♡"}</button>
    </div>
  );
}
