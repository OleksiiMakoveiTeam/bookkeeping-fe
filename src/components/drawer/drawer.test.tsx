import {render, screen} from "@testing-library/react"
import CustomDrawer from "./drawer"
import React from "react"

jest.mock("@/utils/router", () => ({
  ROUTE_NAMES: {
    "/": "Dashboard"
  }
}))

jest.mock("react-router", () => ({
  Link: ({children}: {children: React.ReactNode}) => children
}))

jest.mock("@mui/material/styles/createPalette", () => ({
  dark: {
    text: {
      primary: "#fff"
    }
  }
}))

describe("CustomDrawer Component", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("renders navigation links correctly", () => {
    render(<CustomDrawer>Test Content</CustomDrawer>)

    // as it creates couple of the links for responsiveness we are looking for the first one only
    expect(screen.getAllByText("Dashboard")[0]).toBeInTheDocument()
  })

  it("renders children inside main content", () => {
    render(
      <CustomDrawer>
        <p>Test Content</p>
      </CustomDrawer>
    )

    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })
})
