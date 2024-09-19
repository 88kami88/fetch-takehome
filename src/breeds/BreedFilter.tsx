import { useEffect, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

import { useBreed } from "./use-breed";
import { getBreeds } from "./breed-service";

export default function BreedFilter() {
  const [breeds, setBreeds] = useState<string[] | null>(null);
  const { selectBreeds } = useBreed();

  useEffect(() => {
    (async () => {
      try {
        const breedsRes = await getBreeds();

        setBreeds(breedsRes);
      } catch {
        // On error just don't show breeds, but log
      }
    })();
  }, []);

  function onBreedsSelected(breeds: string[]) {
    selectBreeds(breeds);
  }

  const options = breeds ? ["", ...breeds] : [""];

  return (
    <Box sx={{ width: 300, margin: "0 auto", paddingTop: 0 }}>
      <Autocomplete
        onChange={(_, newValue) => onBreedsSelected(newValue)}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="Select a breed" variant="outlined" />
        )}
        isOptionEqualToValue={(option, value) => option === value} // Fix for value equality
        multiple
      />
    </Box>
  );
}
