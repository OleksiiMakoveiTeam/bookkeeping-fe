import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import {CreateBotModal} from "./create-bot-modal"

describe("CreateBotModal Component", () => {
  const mockOnClose = jest.fn()
  const mockOnCreate = jest.fn()

  const renderComponent = (open: boolean) => {
    return render(
      <CreateBotModal
        open={open}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders modal when open", () => {
    renderComponent(true)
    expect(screen.getByText("Create a Bot")).toBeInTheDocument()
  })

  it("does not render modal when closed", () => {
    renderComponent(false)
    expect(screen.queryByText("Create a Bot")).not.toBeInTheDocument()
  })

  it("closes modal when close button is clicked", () => {
    renderComponent(true)
    const closeButton = screen.getAllByRole("button")[0]
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it("displays validation error for short bot name", async () => {
    renderComponent(true)
    const input = screen.getByLabelText("Bot Name")
    fireEvent.change(input, {target: {value: "AB"}})
    fireEvent.click(screen.getByTestId("test-createBotModalButton"))

    await waitFor(() => {
      expect(
        screen.getByText("Bot name must be at least 3 characters long")
      ).toBeInTheDocument()
    })
  })

  it("calls onCreate and closes modal on valid submit", async () => {
    renderComponent(true)

    const input = screen.getByLabelText("Bot Name")
    fireEvent.change(input, {target: {value: "MyBot"}})

    fireEvent.click(screen.getByTestId("test-createBotModalButton"))

    await waitFor(() => {
      expect(mockOnCreate).toHaveBeenCalledWith("MyBot")
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })
})
