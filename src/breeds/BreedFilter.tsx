import { useEffect, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

import { breedsUrl } from "../constants";
import { useBreed } from "./use-breed";

export default function BreedFilter() {
  const [breeds, setBreeds] = useState<string[] | undefined>();
  const { selectBreeds } = useBreed();

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

  function onBreedsSelected(breeds: string[]) {
    selectBreeds(breeds);
  }

  const options = breeds ? ["", ...breeds] : [""];

  return (
    <Box sx={{ width: 300, margin: "0 auto", paddingTop: 0 }}>
      <Autocomplete
        // value={breed ?? ""}
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
