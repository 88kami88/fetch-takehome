import { Dog } from "./Dogs";

interface DogCardProps {
  dog: Dog;
}

export function DogCard({ dog }: DogCardProps) {
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
    </div>
  );
}
