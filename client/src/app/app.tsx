import { Navigate, Route, Routes } from "react-router-dom";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";

import { useUserActions } from "./hooks/useUserActions";
import { useUserStore } from "./store/userStore";
import TicketDetails from "./pages/ticket-details/ticket-details";
import Tickets from "./pages/tickets/tickets";

const App = () => {

  const { users} = useUserStore();
  const { fetchUsers } = useUserActions();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, users.length]);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Ticket Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/tickets" replace />} />
          <Route path="/tickets" element={<Tickets/>} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
