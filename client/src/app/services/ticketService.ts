import { Ticket } from "@acme/shared-models";
import { ApiResponse, BaseService } from "./baseService";

class TicketService extends BaseService {
  async getTickets(): Promise<ApiResponse<Ticket[]>> {
    return this.request<Ticket[]>({ method: "GET", url: "/tickets" });
  }

  async getTicketById(id: number): Promise<ApiResponse<Ticket>> {
    return this.request<Ticket>({ method: "GET", url: `/tickets/${id}` });
  }

  async createTicket(description: string): Promise<ApiResponse<Ticket>> {
    return this.request<Ticket>({
      method: "POST",
      url: "/tickets",
      data: { description },
    });
  }

  async assignTicket(ticketId: number, userId: number): Promise<ApiResponse<void>> {
    return this.request<void>({
      method: "PUT",
      url: `/tickets/${ticketId}/assign/${userId}`,
    });
  }

  async unassignTicket(ticketId: number): Promise<ApiResponse<void>> {
    return this.request<void>({
      method: "PUT",
      url: `/tickets/${ticketId}/unassign`,
    });
  }

  async completeTicket(ticketId: number): Promise<ApiResponse<void>> {
    return this.request<void>({
      method: "PUT",
      url: `/tickets/${ticketId}/complete`,
    });
  }

  async reopenTicket(ticketId: number): Promise<ApiResponse<void>> {
    return this.request<void>({
      method: "DELETE",
      url: `/tickets/${ticketId}/complete`,
    });
  }
}

export const ticketService = new TicketService();
