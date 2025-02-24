import { bookkeepingApi } from "@/store/slices/bookkeeping/bookkeeping"
import { setupStore } from "@/store/store"

beforeEach(() => {
  setupStore().dispatch(bookkeepingApi.util.resetApiState())
})

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({})
  })
) as jest.Mock

// I don't really want to deal the problem right now...
// So will just mock it
jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  fetchBaseQuery: jest.fn(() => () => Promise.resolve({ data: {} }))
}))
