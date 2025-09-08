import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FilterStatus } from "../../../utils/ticketUtils";

export interface StatusFilterProps {
  value: FilterStatus;
  onChange: (status: FilterStatus) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as FilterStatus);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel>Status</InputLabel>
      <Select
        value={value}
        label="Status"
        onChange={handleChange}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="incomplete">Incomplete</MenuItem>
      </Select>
    </FormControl>
  );
}