import { Ticket } from "@acme/shared-models";
import { Box, Button, Chip, Typography } from "@mui/material";
import { getTicketStatusColor } from "../../../utils/ticketUtils";

interface TicketHeaderProps {
  ticket: Ticket;
  loading: boolean;
  onBack: () => void;
}

export function TicketHeader({ ticket, onBack, loading }: TicketHeaderProps) {
  const status = getTicketStatusColor(ticket.completed);

  return (
    <Box mb={2}>
      <Button 
        variant="outlined" 
        onClick={onBack} sx={{ mb: 3 }}
        disabled={loading}>
        Back to Tickets
      </Button>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={1}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Ticket #{ticket.id}
          </Typography>
        </Box>
        <Chip
          label={status.label}
          color={status.color}
          size="medium"
          sx={{ fontSize: "0.9rem", padding: "6px 10px" }}
        />
      </Box>
    </Box>
  );
}