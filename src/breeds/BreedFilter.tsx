import { FormEvent, useEffect, useState } from "react";
import { breedsUrl } from "../constants";
import { useBreed } from "./use-breed";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function BreedFilter() {
  const [breeds, setBreeds] = useState<string[] | undefined>();
  const { breed, setBreed } = useBreed();

  useEffect(() => {
    (async () => {
      const res = await fetch(breedsUrl, {
        credentials: "include",
      });
      const json = await res.json();

      // TODO error handling

      setBreeds(json);
    })();
  }, []);

  function onBreedSelected(breed: string) {
    if (breed) {
      setBreed(breed);
    } else {
      setBreed(undefined);
    }
  }

  if (!breeds) {
    return (
      <select>
        <option>loading...</option>
      </select>
    );
  }

  const options = ["", ...breeds];

  return (
    <Box sx={{ width: 300, margin: "0 auto", paddingTop: 0 }}>
      <Autocomplete
        value={breed}
        onChange={(event, newValue) => onBreedSelected(newValue)}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="Select a breed" variant="outlined" />
        )}
        isOptionEqualToValue={(option, value) => option === value} // Fix for value equality
      />
    </Box>
  );
}
