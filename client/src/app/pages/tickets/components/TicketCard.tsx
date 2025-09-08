import { Ticket } from "@acme/shared-models";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../../store/userStore";
import { getTicketStatusColor } from "../../../utils/ticketUtils";

export interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const navigate = useNavigate();
  const { getUserName } = useUserStore();
  const status = getTicketStatusColor(ticket.completed);

  const handleClick = () => {
    navigate(`/tickets/${ticket.id}`);
  };

  const getAssigneeDisplay = () => {
    if (ticket.assigneeId === null) {
      return "Unassigned";
    }
    return getUserName(ticket.assigneeId);
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">{`#${ticket.id} ${ticket.description}`}</Typography>
            <Chip label={status.label} color={status.color} size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
           
          </Typography>
          <Typography variant="body2" color="text.secondary">
            PIC: {getAssigneeDisplay()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
