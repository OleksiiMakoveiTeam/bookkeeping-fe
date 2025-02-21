import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { bookkeepingApi } from "./slices/bookkeeping/bookkeeping"

if (!bookkeepingApi || !bookkeepingApi.reducerPath) {
  throw new Error(
    `bookkeepingApi is undefined. Check imports. ${bookkeepingApi}`
  )
}

const rootReducer = combineReducers({
  [bookkeepingApi.reducerPath]: bookkeepingApi.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(bookkeepingApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
