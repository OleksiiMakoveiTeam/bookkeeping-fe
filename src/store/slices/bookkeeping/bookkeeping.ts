import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Bot, FullBot } from "./types"

// Can be configured from .env in production
const BASE_URL = "http://localhost:5000/api"

export const bookkeepingApi = createApi({
  reducerPath: "bookkeepingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json")
      return headers
    }
  }),

  tagTypes: ["Bots"],
  endpoints: (builder) => ({
    getBotById: builder.query<FullBot, string>({
      query: (botId) => `bots/${botId}`,
      providesTags: (_result, _error, id) => [{ type: "Bots", id }],
      async onCacheEntryAdded(
        botId,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const ws = new WebSocket("ws://localhost:8080")

        try {
          await cacheDataLoaded
          console.log("✅ WebSocket connected for bot:", botId)

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data)
            console.log("📩 Received WebSocket update:", data)

            if (data.type === "TASK_COMPLETED" && data.task.botId === botId) {
              dispatch(
                bookkeepingApi.util.invalidateTags([
                  { type: "Bots", id: botId }
                ])
              )
            }
          }

          ws.addEventListener("message", listener)
        } catch {
          console.warn("❌ WebSocket setup failed for bot:", botId)
        }

        await cacheEntryRemoved
        ws.close()
        console.log("❌ WebSocket closed for bot:", botId)
      }
    }),

    getBots: builder.query<Bot[], void>({
      query: () => "bots",
      providesTags: ["Bots"]
    }),

    createBot: builder.mutation<Bot, { name: string }>({
      query: (newBot) => ({
        url: "bots",
        method: "POST",
        body: newBot
      }),
      invalidatesTags: ["Bots"]
    }),

    deleteBot: builder.mutation<void, string>({
      query: (botId) => ({
        url: `bots/${botId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Bots"]
    })
  })
})

export const {
  useGetBotsQuery,
  useGetBotByIdQuery,
  useCreateBotMutation,
  useDeleteBotMutation,
  usePrefetch
} = bookkeepingApi
