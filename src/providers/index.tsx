import { BrowserRouter } from "react-router"
import { RouterProvider } from "./router"
import { ThemeProvider } from "@mui/material"
import { theme } from "@/theme"
import { setupStore } from "@/store/store"
import { Provider } from "react-redux"
import { NavLayout } from "@/layouts/nav-layout"

const store = setupStore()

export const Providers = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NavLayout>
            <RouterProvider />
          </NavLayout>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}
