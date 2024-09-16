import { Button } from "@mui/material";
import { useBreed } from "./use-breed";

export default function BreedSort() {
  const { sort, setSort } = useBreed();

  const toggleSortOrder = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <Button onClick={toggleSortOrder}>
        Sort by breed {sort === "asc" ? "🔼" : "🔽"}
      </Button>
    </div>
  );
}
