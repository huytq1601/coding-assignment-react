import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTicketActions } from "../../../hooks/useTicketActions";

interface CreateTicketDialogProps {
  open: boolean;
  onClose: () => void;
  onTicketCreated?: () => void;
}

export function CreateTicketDialog({
  open,
  onClose,
  onTicketCreated,
}: CreateTicketDialogProps) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createTicket } = useTicketActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createTicket(description.trim());
      setDescription("");
      onClose();
      onTicketCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDescription("");
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { component: "form", onSubmit: handleSubmit } }}
    >
      <DialogTitle>Create New Ticket</DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            autoFocus
            required
            multiline
            rows={4}
            fullWidth
            label="Ticket Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the ticket information here..."
            disabled={loading}
            error={!!error && !description.trim()}
            helperText={!!error && !description.trim() ? error : " "}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!description.trim()}
        >
          Create Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
}
