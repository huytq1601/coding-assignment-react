import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Ticket } from "@acme/shared-models";
import { Tickets } from "./tickets";

const mockUseTicketStore = jest.fn();
jest.mock("../../store/ticketStore", () => ({
  useTicketStore: (selector: any) => mockUseTicketStore(selector),
}));

const mockUseTicketActions = jest.fn();
jest.mock("../../hooks/useTicketActions", () => ({
  useTicketActions: () => mockUseTicketActions(),
}));

jest.mock("../../components/LoadingState", () => ({
  LoadingState: ({ message }: { message: string }) => <div>{message}</div>,
}));

jest.mock("../../components/ErrorState", () => ({
  ErrorState: ({ error }: { error: Error }) => <div>Error: {error.message}</div>,
}));

jest.mock("../../components/NotFoundState", () => ({
  NotFoundState: ({ message }: { message: string }) => <div>{message}</div>,
}));

jest.mock("./components/TicketCard", () => ({
  TicketCard: ({ ticket }: { ticket: Ticket }) => <div>Ticket Card: {ticket.description}</div>,
}));

jest.mock("./components/StatusFilter", () => ({
  StatusFilter: () => <div>Status Filter</div>,
}));

jest.mock("./components/CreateTicketDialog", () => ({
  CreateTicketDialog: () => <div>Create Ticket Dialog</div>,
}));

describe("Tickets Component", () => {
  const mockTickets: Ticket[] = [
    { id: 1, description: "Fix bug in login", assigneeId: null, completed: false },
    { id: 2, description: "Add new feature", assigneeId: 666, completed: false },
  ];
  const mockFetchTickets = jest.fn();
  const mockSetFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTicketActions.mockReturnValue({
      fetchTickets: mockFetchTickets,
      setFilter: mockSetFilter,
    });
  });

  test("1. should render loading state when tickets are being fetched", () => {
    mockUseTicketStore.mockReturnValue({
      loading: true,
      error: null,
      filter: "all",
      filteredTickets: [],
    });

    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading tickets...")).toBeInTheDocument();
  });

  test("2. should render a list of tickets after a successful fetch", () => {
    mockUseTicketStore.mockReturnValue({
      loading: false,
      error: null,
      filter: "all",
      filteredTickets: mockTickets,
    });

    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    expect(screen.getByText(`Tickets (${mockTickets.length})`)).toBeInTheDocument();
    expect(screen.getByText(`Ticket Card: ${mockTickets[0].description}`)).toBeInTheDocument();
    expect(screen.getByText(`Ticket Card: ${mockTickets[1].description}`)).toBeInTheDocument();
  });

  test("3. should render 'No ticket found!' message when there are no tickets", () => {
    mockUseTicketStore.mockReturnValue({
      loading: false,
      error: null,
      filter: "all",
      filteredTickets: [],
    });

    render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );

    expect(screen.getByText("No ticket found!")).toBeInTheDocument();
  });
});
