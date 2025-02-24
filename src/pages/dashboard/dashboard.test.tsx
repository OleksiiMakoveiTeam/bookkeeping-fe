import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import {
  useGetBotsQuery,
  useCreateBotMutation,
  useDeleteBotMutation
} from "@/store/slices/bookkeeping/bookkeeping"
import Dashboard from "./dashboard"

jest.mock("@/store/slices/bookkeeping/bookkeeping", () => ({
  useGetBotsQuery: jest.fn(),
  useCreateBotMutation: jest.fn(() => [jest.fn()]),
  useDeleteBotMutation: jest.fn(() => [jest.fn()]),
  usePrefetch: jest.fn()
}))

jest.mock("react-router", () => ({
  useNavigate: jest.fn()
}))

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders loading state", () => {
    ;(useGetBotsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined
    })

    render(<Dashboard />)

    expect(screen.getByText("Bot List:")).toBeInTheDocument()
    expect(screen.getByText("No bots available")).toBeInTheDocument()
  })

  it("renders error state", () => {
    ;(useGetBotsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true
    })

    render(<Dashboard />)

    expect(screen.getByText("Bot List:")).toBeInTheDocument()
    expect(screen.getByText("No bots available")).toBeInTheDocument()
  })

  it("renders list of bots", async () => {
    ;(useGetBotsQuery as jest.Mock).mockReturnValue({
      data: [
        {_id: "bot1", name: "Bot One"},
        {_id: "bot2", name: "Bot Two"}
      ],
      isLoading: false,
      error: undefined
    })

    render(<Dashboard />)

    expect(screen.getByText("Bot One")).toBeInTheDocument()
    expect(screen.getByText("Bot Two")).toBeInTheDocument()
  })

  it("opens modal when 'Create your automation bot' button is clicked", async () => {
    ;(useGetBotsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: undefined
    })

    render(<Dashboard />)

    const createBotButton = screen.getByTestId("test-createBotButton")
    fireEvent.click(createBotButton)

    expect(screen.getByTestId("test-createBotModal")).toBeInTheDocument()
  })

  it("creates a bot successfully", async () => {
    ;(useGetBotsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: undefined
    })

    const mockCreateBot = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({name: "New Bot"})
    })

    ;(useCreateBotMutation as jest.Mock).mockReturnValue([mockCreateBot])

    render(<Dashboard />)

    fireEvent.click(screen.getByTestId("test-createBotButton"))

    const input = screen.getByRole("textbox")
    fireEvent.change(input, {target: {value: "New Bot"}})

    fireEvent.click(screen.getByTestId("test-createBotModalButton"))

    await waitFor(() => {
      expect(mockCreateBot).toHaveBeenCalledWith({name: "New Bot"})
    })
  })

  it("deletes a bot successfully", async () => {
    ;(useGetBotsQuery as jest.Mock).mockReturnValue({
      data: [{_id: "bot1", name: "Bot One"}],
      isLoading: false,
      error: undefined
    })

    const mockDeleteBot = jest.fn().mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({})
    })
    ;(useDeleteBotMutation as jest.Mock).mockReturnValue([mockDeleteBot])

    render(<Dashboard />)

    const deleteButton = screen.getByTestId("test-deleteBotButton")
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(mockDeleteBot).toHaveBeenCalledWith("bot1")
    })
  })
})
