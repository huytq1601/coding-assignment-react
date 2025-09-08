import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Ticket } from "@acme/shared-models";
import { useUserStore } from "../../../store/userStore";

interface TicketAssignmentProps {
  ticket: Ticket;
  onAssign: (userId: number | null) => Promise<void>;
  loading?: boolean;
}

export function TicketAssignment({
  ticket,
  onAssign,
  loading,
}: TicketAssignmentProps) {
  const { getUserName, users } = useUserStore();
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");

  const handleAssignStart = () => {
    setIsAssigning(true);
    setSelectedUserId(ticket.assigneeId || "");
  };

  const handleAssignCancel = () => {
    setIsAssigning(false);
    setSelectedUserId("");
  };

  const handleAssignSubmit = async () => {
    try {
      await onAssign(selectedUserId === "" ? null : selectedUserId);
      setIsAssigning(false);
      setSelectedUserId("");
    } catch (err) {
      console.error("Failed to assign ticket:", err);
    }
  };

  const handleUnassign = async () => {
    try {
      await onAssign(null);
    } catch (err) {
      console.error("Failed to unassign ticket:", err);
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom color="primary">
        Assignment
      </Typography>

      {!isAssigning ? (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <Box component="span" fontWeight="bold">
              PIC:
            </Box>{" "}
            {ticket.assigneeId !== null ? (
              <Box component="span" color="success.main">
                {getUserName(ticket.assigneeId)}
              </Box>
            ) : (
              <Box component="span" color="warning.main">
                Unassigned
              </Box>
            )}
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="outlined"
              onClick={handleAssignStart}
              size="medium"
              disabled={loading}
            >
              {ticket.assigneeId ? "Change PIC" : "Assign to User"}
            </Button>

            {ticket.assigneeId && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleUnassign}
                size="medium"
                disabled={loading}
              >
                Unassign
              </Button>
            )}
          </Box>
        </>
      ) : (
        <Box sx={{ maxWidth: 400 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select User</InputLabel>
            <Select
              value={selectedUserId}
              label="Select User"
              onChange={(e) => setSelectedUserId(e.target.value as number)}
              autoFocus
              disabled={loading}
            >
              <MenuItem value={""}>Unassigned</MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={handleAssignSubmit}
              disabled={selectedUserId === (ticket.assigneeId || "") || loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleAssignCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
