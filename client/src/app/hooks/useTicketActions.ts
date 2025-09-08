import { useCallback } from 'react';
import { useTicketStore } from '../store/ticketStore';

export function useTicketActions() {
  const {
    fetchTickets,
    fetchTicketById,
    createTicket,
    assignTicket,
    unassignTicket,
    completeTicket,
    reopenTicket,
    setFilter,
  } = useTicketStore();

  return {
    fetchTickets: useCallback(fetchTickets, [fetchTickets]),
    fetchTicketById: useCallback(fetchTicketById, [fetchTicketById]),
    createTicket: useCallback(createTicket, [createTicket]),
    assignTicket: useCallback(assignTicket, [assignTicket]),
    unassignTicket: useCallback(unassignTicket, [unassignTicket]),
    completeTicket: useCallback(completeTicket, [completeTicket]),
    reopenTicket: useCallback(reopenTicket, [reopenTicket]),
    setFilter: useCallback(setFilter, [setFilter]),
  };
}