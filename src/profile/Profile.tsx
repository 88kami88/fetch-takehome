import { Box, Button } from "@mui/material";

import { useAuth } from "../auth/use-auth";
import { logoutUrl } from "../constants";

async function logout() {
  await fetch(logoutUrl, {
    credentials: "include",
  });
}

export default function Profile() {
  const { setIsLoggedIn, setUsername, username } = useAuth();

  function onLogout() {
    logout(); // don't await, optimistically continue
    setIsLoggedIn(false);
    setUsername("");
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        width: "100%",
      }}
    >
      Welcome, {username} <Button onClick={onLogout}>Logout</Button>
    </Box>
  );
}
