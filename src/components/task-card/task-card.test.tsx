import {render, screen} from "@testing-library/react"
import {Task} from "@/store/slices/bookkeeping/types"
import {formatDistanceToNow} from "date-fns"
import {TaskCard} from "./task-card"

describe("TaskCard Component", () => {
  const pendingTask: Task = {
    _id: "task1",
    description: "Process invoice",
    duration: 1500,
    completed: false,
    completedAt: undefined
  }

  const completedTask: Task = {
    _id: "task2",
    description: "Categorize transactions",
    duration: 2750,
    completed: true,
    completedAt: new Date().toISOString()
  }

  it("renders task details correctly", () => {
    render(<TaskCard task={pendingTask} />)

    expect(screen.getByText("Process invoice")).toBeInTheDocument()
    expect(screen.getByText("Duration: 1500 ms")).toBeInTheDocument()
  })

  it("renders pending task with correct state", () => {
    render(<TaskCard task={pendingTask} />)

    expect(screen.getByText("Pending")).toBeInTheDocument()
  })

  it("renders completed task with correct state", () => {
    render(<TaskCard task={completedTask} />)

    expect(screen.getByText("Completed")).toBeInTheDocument()
  })

  it("displays formatted completed timestamp", () => {
    render(<TaskCard task={completedTask} />)

    const formattedTime = `Completed ${formatDistanceToNow(
      new Date(completedTask.completedAt as string),
      {addSuffix: true}
    )}`

    expect(screen.getByText(formattedTime)).toBeInTheDocument()
  })
})
