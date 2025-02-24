import {render, screen, fireEvent} from "@testing-library/react"
import {Bot} from "@/store/slices/bookkeeping/types"
import {BotCard} from "./bot-card"

const mockNavigate = jest.fn()

jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate
}))

describe("BotCard Component", () => {
  const mockBot: Bot = {
    _id: "bot1",
    name: "Test Bot",
    tasks: ["some id"]
  }

  const mockOnDelete = jest.fn()

  it("renders bot details correctly", () => {
    render(<BotCard bot={mockBot} onDelete={mockOnDelete} />)

    expect(screen.getByText("Test Bot")).toBeInTheDocument()
    expect(screen.getByText("1 task")).toBeInTheDocument()
  })

  it("navigates to bot details page when clicked", () => {
    render(<BotCard bot={mockBot} onDelete={mockOnDelete} />)

    fireEvent.click(screen.getByText("Test Bot"))

    expect(mockNavigate).toHaveBeenCalledWith("/bot/bot1")
  })

  it("triggers delete function when delete button is clicked", () => {
    render(<BotCard bot={mockBot} onDelete={mockOnDelete} />)

    fireEvent.click(screen.getByTestId("test-deleteBotButton"))

    expect(mockOnDelete).toHaveBeenCalledWith("bot1")
  })
})
