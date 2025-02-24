import {render, screen, waitFor} from "@testing-library/react"
import {useGetBotByIdQuery} from "@/store/slices/bookkeeping/bookkeeping"
import {BotPage} from "./bot"

jest.mock("@/store/slices/bookkeeping/bookkeeping", () => ({
  useGetBotByIdQuery: jest.fn()
}))

jest.mock("react-router", () => ({
  useParams: () => ({id: "12345"})
}))

const mockBot = {
  _id: "12345",
  name: "Test Bot",
  tasks: [
    {_id: "task1", description: "Process invoice", completed: false},
    {_id: "task2", description: "Categorize transactions", completed: true}
  ]
}

describe("BotPage Component", () => {
  it("renders loading state", () => {
    ;(useGetBotByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined
    })

    render(<BotPage />)

    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("renders error state", () => {
    ;(useGetBotByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true
    })

    render(<BotPage />)

    expect(screen.getByText("Bot not found")).toBeInTheDocument()
  })

  it("renders bot data and tasks correctly", async () => {
    ;(useGetBotByIdQuery as jest.Mock).mockReturnValue({
      data: mockBot,
      isLoading: false,
      error: undefined
    })

    render(<BotPage />)

    expect(screen.getByText("Test Bot")).toBeInTheDocument()
    expect(screen.getByText("Assigned Tasks:")).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText("Process invoice")).toBeInTheDocument()
      expect(screen.getByText("Categorize transactions")).toBeInTheDocument()
    })
  })
})
