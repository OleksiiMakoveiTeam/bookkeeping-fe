import {render, screen} from "@testing-library/react"
import {NavLayout} from "./nav-layout"

jest.mock("@/components/drawer/drawer", () => ({
  __esModule: true,
  default: jest.fn(({children}) => (
    <div data-testid="custom-drawer">{children}</div>
  ))
}))

describe("NavLayout Component", () => {
  it("renders CustomDrawer", () => {
    render(<NavLayout>Test Content</NavLayout>)

    expect(screen.getByTestId("custom-drawer")).toBeInTheDocument()
  })

  it("renders children inside CustomDrawer", () => {
    render(
      <NavLayout>
        <p data-testid="test-content">Test Content</p>
      </NavLayout>
    )

    expect(screen.getByTestId("test-content")).toBeInTheDocument()
  })
})
