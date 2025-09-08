import { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { ErrorState } from "../../components/ErrorState";
import { LoadingState } from "../../components/LoadingState";
import { NotFoundState } from "../../components/NotFoundState";
import { useTicketActions } from "../../hooks/useTicketActions";
import { useTicketStore } from "../../store/ticketStore";
import { TicketActions } from "./components/TicketActions";
import { TicketAssignment } from "./components/TicketAssignment";
import { TicketDescription } from "./components/TicketDescription";
import { TicketHeader } from "./components/TicketHeader";

export function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentTicket = useTicketStore(state => state.currentTicket);
  const loading = useTicketStore(state => state.loading);
  const error = useTicketStore(state => state.error);
  const fetchTicketById = useTicketStore(state => state.fetchTicketById);
  const clearCurrentTicket = useTicketStore(state => state.clearCurrentTicket);

  const { completeTicket, reopenTicket, assignTicket, unassignTicket } = useTicketActions();

  const ticketId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    if (ticketId) fetchTicketById(ticketId);
    return () => clearCurrentTicket();
  }, [ticketId, fetchTicketById, clearCurrentTicket]);

  const handleBack = () => {
    navigate("/tickets");
  };

  const handleToggleStatus = async () => {
    if (!ticketId) return;

    try {
      if (currentTicket?.completed) {
        await reopenTicket(ticketId);
      } else {
        await completeTicket(ticketId);
      }
    } catch (err) {
      console.error("Failed to toggle ticket status:", err);
    }
  };

  const handleAssign = async (userId: number | null) => {
    if (!ticketId) return;

    try {
      if (userId === null) {
        await unassignTicket(ticketId);
      } else {
        await assignTicket(ticketId, userId);
      }
    } catch (err) {
      console.error("Failed to assign ticket:", err);
    }
  };

  if (loading && !currentTicket) {
    return <LoadingState message="Loading ticket details..." />;
  }

  if (error) {
    return <ErrorState error={error} onBack={handleBack} onBackText="Back to Tickets" />;
  }

  if (!currentTicket) {
    return <NotFoundState onBack={handleBack} message="No Ticket Found" onBackText="Back To Tickets" />;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 1024, margin: "0 auto" }}>
      <Box mb={2}>
        <TicketHeader ticket={currentTicket} onBack={handleBack} loading={loading} />
        <TicketDescription ticket={currentTicket} />
        <TicketAssignment ticket={currentTicket} onAssign={handleAssign} loading={loading} />
        <TicketActions ticket={currentTicket} onToggleStatus={handleToggleStatus} loading={loading} />
      </Box>
    </Paper>
  );
}

export default TicketDetails;