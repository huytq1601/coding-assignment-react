import { CircularProgress, Paper, Typography } from "@mui/material";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <Paper
      elevation={3}
      sx={{ p: 3, maxWidth: 1024, margin: "0 auto", textAlign: "center" }}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Paper>
  );
}