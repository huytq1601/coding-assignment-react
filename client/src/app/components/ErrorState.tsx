import { Alert, Button, Paper } from "@mui/material";

interface ErrorStateProps {
  error: string;
  onBack?: () => void;
  onBackText?: string;
}

export function ErrorState({ error, onBack, onBackText }: ErrorStateProps) {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 1024, margin: "0 auto" }}>
      <Alert 
        severity="error"
        sx={{ mb: 2 }}
      >
        {error}
      </Alert>
      {onBack && (
        <Button onClick={onBack}>
          {onBackText}
        </Button>
      )}
    </Paper>
  );
}