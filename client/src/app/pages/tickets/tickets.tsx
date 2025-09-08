import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { ErrorState } from "../../components/ErrorState";
import { LoadingState } from "../../components/LoadingState";
import { NotFoundState } from "../../components/NotFoundState";
import { useTicketActions } from "../../hooks/useTicketActions";
import { useTicketStore } from "../../store/ticketStore";
import { FilterStatus } from "../../utils/ticketUtils";
import { CreateTicketDialog } from "./components/CreateTicketDialog";
import { StatusFilter } from "./components/StatusFilter";
import { TicketCard } from "./components/TicketCard";

export function Tickets() {
  const { loading, error, filter, filteredTickets } = useTicketStore();
  const { fetchTickets, setFilter } = useTicketActions();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleFilterChange = (newFilter: FilterStatus) => {
    setFilter(newFilter);
  };

  const handleCreateTicket = () => {
    setCreateDialogOpen(true);
  };

  const handleTicketCreated = () => {
    fetchTickets();
  };

  if (loading) {
    return <LoadingState message="Loading tickets..." />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 1024, margin: "0 auto" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" component="h2">
            Tickets ({filteredTickets.length})
          </Typography>
          <Box display="flex" gap={1}>
            <StatusFilter value={filter} onChange={handleFilterChange} />
            <Button variant="contained" onClick={handleCreateTicket}>
              Create
            </Button>
          </Box>
        </Box>

        {filteredTickets.length > 0 ? (
          <Grid container spacing={2}>
            {filteredTickets.map((ticket) => (
              <Grid size={12} key={ticket.id}>
                <TicketCard ticket={ticket} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NotFoundState message="No ticket found!" />
        )}
      </Paper>

      <CreateTicketDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onTicketCreated={handleTicketCreated}
      />
    </>
  );
}

export default Tickets;
