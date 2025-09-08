import { Button, Paper, Typography } from "@mui/material";

interface NotFoundStateProps {
  message: string;
  onBack?: () => void;
  onBackText?: string;
}

export function NotFoundState({ onBack, onBackText, message }: NotFoundStateProps) {
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 1024, margin: "0 auto" }}>
      <Typography variant="h6" component="h1" gutterBottom>
        {message}
      </Typography>

      {onBack && (
        <Button onClick={onBack} variant="contained">
          {onBackText}
        </Button>
      )}
    </Paper>
  );
}
