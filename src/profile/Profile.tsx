import { Box } from "@mui/material";
import { useAuth } from "../auth/use-auth";

export default function Profile() {
  const { username } = useAuth();
  return <Box>Welcome, {username}</Box>;
}
