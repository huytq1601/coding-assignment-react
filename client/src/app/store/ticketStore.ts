import { create } from 'zustand';
import { Ticket } from '@acme/shared-models';
import { ticketService } from '../services/ticketService';
import { FilterStatus, filterTickets } from '../utils/ticketUtils';

interface TicketState {
  tickets: Ticket[];
  currentTicket: Ticket | null;
  loading: boolean;
  error: string | null;
  filter: FilterStatus;
  filteredTickets: Ticket[];

  setFilter: (filter: FilterStatus) => void;
  fetchTickets: () => Promise<void>;
  fetchTicketById: (id: number) => Promise<void>;
  clearCurrentTicket: () => void;
  createTicket: (description: string) => Promise<void>;
  assignTicket: (ticketId: number, userId: number) => Promise<void>;
  unassignTicket: (ticketId: number) => Promise<void>;
  completeTicket: (ticketId: number) => Promise<void>;
  reopenTicket: (ticketId: number) => Promise<void>;
}

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  currentTicket: null,
  loading: false,
  error: null,
  filter: 'all',
  filteredTickets: [],

  setFilter: (filter: FilterStatus) => {
    const filteredTickets = filterTickets(get().tickets, filter);
    set({ filter, filteredTickets });
  },

  fetchTickets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await ticketService.getTickets();
      const tickets = response.data ?? [];
      const filteredTickets = filterTickets(tickets, get().filter);
      set({ tickets, filteredTickets, loading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch tickets';
      set({ error, loading: false });
    }
  },

  fetchTicketById: async (id: number) => {
    set({ loading: true, error: null, currentTicket: null });
    try {
      const response = await ticketService.getTicketById(id);
      set({ currentTicket: response.data, loading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to fetch ticket';
      set({ error, loading: false, currentTicket: null });
    }
  },

  clearCurrentTicket: () => set({ currentTicket: null }),

  createTicket: async (description: string) => {
    set({ loading: true, error: null });
    try {
      await ticketService.createTicket(description);
      await get().fetchTickets();
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to create ticket';
      set({ error, loading: false });
      throw err;
    }
  },

  assignTicket: async (ticketId: number, userId: number) => {
    set({ loading: true, error: null });
    try {
      await ticketService.assignTicket(ticketId, userId);
      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, assigneeId: userId } : ticket
        ),
        currentTicket:
          state.currentTicket?.id === ticketId
            ? { ...state.currentTicket, assigneeId: userId }
            : state.currentTicket,
        loading: false,
      }));
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to assign ticket';
      set({ error, loading: false });
      throw err;
    }
  },

  unassignTicket: async (ticketId: number) => {
    set({ loading: true, error: null });
    try {
      await ticketService.unassignTicket(ticketId);
      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, assigneeId: null } : ticket
        ),
        currentTicket:
          state.currentTicket?.id === ticketId
            ? { ...state.currentTicket, assigneeId: null }
            : state.currentTicket,
        loading: false,
      }));
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to unassign ticket';
      set({ error, loading: false });
      throw err;
    }
  },

  completeTicket: async (ticketId: number) => {
    set({ loading: true, error: null });
    try {
      await ticketService.completeTicket(ticketId);
      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, completed: true } : ticket
        ),
        currentTicket:
          state.currentTicket?.id === ticketId
            ? { ...state.currentTicket, completed: true }
            : state.currentTicket,
        loading: false,
      }));
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to complete ticket';
      set({ error, loading: false });
      throw err;
    }
  },

  reopenTicket: async (ticketId: number) => {
    set({ loading: true, error: null });
    try {
      await ticketService.reopenTicket(ticketId);
      set(state => ({
        tickets: state.tickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, completed: false } : ticket
        ),
        currentTicket:
          state.currentTicket?.id === ticketId
            ? { ...state.currentTicket, completed: false }
            : state.currentTicket,
        loading: false,
      }));
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to reopen ticket';
      set({ error, loading: false });
      throw err;
    }
  },
}));
