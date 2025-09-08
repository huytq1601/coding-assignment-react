import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { TicketDetails } from "./ticket-details";
import { Ticket } from "@acme/shared-models";

const mockUseParams = jest.fn();
const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockUseParams(),
  useNavigate: () => mockUseNavigate,
}));

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
  ErrorState: ({ error, onBackText }: { error: Error; onBackText: string }) => (
    <div>
      {error.message} - {onBackText}
    </div>
  ),
}));
jest.mock("../../components/NotFoundState", () => ({
  NotFoundState: ({ message }: { message: string }) => <div>{message}</div>,
}));
jest.mock("./components/TicketHeader", () => ({
  TicketHeader: ({ ticket }: { ticket: Ticket }) => <div>{ticket.id}</div>,
}));
jest.mock("./components/TicketDescription", () => ({
  TicketDescription: ({ ticket }: { ticket: Ticket }) => (
    <div>{ticket.description}</div>
  ),
}));
jest.mock("./components/TicketAssignment", () => ({
  TicketAssignment: () => <div>Ticket Assignment</div>,
}));
jest.mock("./components/TicketActions", () => ({
  TicketActions: () => <div>Ticket Actions</div>,
}));

describe("TicketDetails", () => {
  const mockTicketOpen: Ticket = {
    id: 404,
    description: "Mock ticket description",
    assigneeId: null,
    completed: false,
  };
  const mockClearCurrentTicket = jest.fn();
  const mockFetchTicketById = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ id: "1" });
    mockUseTicketStore.mockImplementation((selector) => {
      const state = {
        currentTicket: null,
        loading: false,
        error: null,
        fetchTicketById: mockFetchTicketById,
        clearCurrentTicket: mockClearCurrentTicket,
      };
      return selector(state);
    });
    mockUseTicketActions.mockReturnValue({});
  });

  test("1. should render loading state when fetching a ticket", () => {
    mockUseTicketStore.mockImplementation((selector) => {
      const state = {
        currentTicket: null,
        loading: true,
        error: null,
        fetchTicketById: mockFetchTicketById,
        clearCurrentTicket: mockClearCurrentTicket,
      };
      return selector(state);
    });

    render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading ticket details...")).toBeInTheDocument();
  });

  test("2. should render ticket details after successful data fetch", async () => {
    mockUseTicketStore.mockImplementation((selector) => {
      const state = {
        currentTicket: mockTicketOpen,
        loading: false,
        error: null,
        fetchTicketById: mockFetchTicketById,
        clearCurrentTicket: mockClearCurrentTicket,
      };
      return selector(state);
    });

    render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockTicketOpen.id)).toBeInTheDocument();
      expect(screen.getByText(mockTicketOpen.description)).toBeInTheDocument();
      expect(screen.getByText("Ticket Assignment")).toBeInTheDocument();
      expect(screen.getByText("Ticket Actions")).toBeInTheDocument();
    });
  });

  test("3. should render not found state when no ticket is found", () => {
    mockUseTicketStore.mockImplementation((selector) => {
      const state = {
        currentTicket: null,
        loading: false,
        error: null,
        fetchTicketById: mockFetchTicketById,
        clearCurrentTicket: mockClearCurrentTicket,
      };
      return selector(state);
    });

    render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );

    expect(screen.getByText("No Ticket Found")).toBeInTheDocument();
  });
});
