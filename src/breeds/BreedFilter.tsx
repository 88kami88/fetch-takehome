import { useEffect, useState } from "react";
import { breedsUrl } from "../constants";
import { useBreed } from "./use-breed";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function BreedFilter() {
  const [breeds, setBreeds] = useState<string[] | undefined>();
  const { setBreed } = useBreed();

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

  function onBreedSelected(breed: string | null) {
    if (breed) {
      setBreed(breed);
    } else {
      setBreed(null);
    }
  }

  const options = breeds ? ["", ...breeds] : [""];

  return (
    <Box sx={{ width: 300, margin: "0 auto", paddingTop: 0 }}>
      <Autocomplete
        // value={breed ?? ""}
        onChange={(_, newValue) => onBreedSelected(newValue)}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="Select a breed" variant="outlined" />
        )}
        isOptionEqualToValue={(option, value) => option === value} // Fix for value equality
      />
    </Box>
  );
}
