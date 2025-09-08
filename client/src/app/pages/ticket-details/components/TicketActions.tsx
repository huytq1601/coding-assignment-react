import { Ticket } from "@acme/shared-models";
import { Box, Button, Typography } from "@mui/material";

interface TicketActionsProps {
  ticket: Ticket;
  onToggleStatus: () => Promise<void>;
  loading?: boolean;
}

export function TicketActions({ ticket, onToggleStatus, loading }: TicketActionsProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        Actions
      </Typography>
      <Button
        variant="contained"
        onClick={onToggleStatus}
        color={ticket.completed ? "warning" : "success"}
        size="large"
        sx={{ mr: 2 }}
        disabled={loading}
      >
        {loading ? "Processing..." : ticket.completed ? "Reopen Ticket" : "Mark as Complete"}
      </Button>
    </Box>
  );
}