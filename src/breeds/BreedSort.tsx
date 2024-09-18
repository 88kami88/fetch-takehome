import { Box, Button } from "@mui/material";

import { useBreed } from "./use-breed";

export default function BreedSort() {
  const { sort, setSort } = useBreed();

  const toggleSortOrder = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  return (
    <Box>
      <Button onClick={toggleSortOrder} variant="outlined">
        Sort by breed {sort === "asc" ? "🔼" : "🔽"}
      </Button>
    </Box>
  );
}
