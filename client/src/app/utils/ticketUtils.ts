import { Ticket } from "@acme/shared-models";

export type TicketStatus = "completed" | "incomplete";

export interface StatusChipConfig {
  color: "success" | "warning";
  label: string;
}

export function getTicketStatusColor(completed: boolean): StatusChipConfig {
  return completed
    ? { color: "success", label: "Completed" }
    : { color: "warning", label: "Incomplete" };
}

export type FilterStatus = "all" | TicketStatus;

export function filterTickets(tickets: Ticket[], filter: FilterStatus): Ticket[] {
  switch (filter) {
    case "completed":
      return tickets.filter(ticket => ticket.completed);
    case "incomplete":
      return tickets.filter(ticket => !ticket.completed);
    default:
      return tickets;
  }
}