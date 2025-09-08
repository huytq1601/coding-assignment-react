import { Ticket } from "@acme/shared-models";
import { Box, Divider, Typography } from "@mui/material";

interface TicketDescriptionProps {
  ticket: Ticket;
}

export function TicketDescription({ ticket }: TicketDescriptionProps) {
  return (
    <Box mb={4}>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom color="primary">
        Description
      </Typography>
      <Typography
        variant="body1"
        sx={{
          bgcolor: "grey.50",
          p: 2,
          borderRadius: 1,
          borderLeft: 3,
          borderColor: "primary.main",
        }}
      >
        {ticket.description}
      </Typography>
    </Box>
  );
}
