import { BotCard } from "@/components/bot-card/bot-card"
import { CreateBotModal } from "@/components/modals/create-bot-modal"
import {
  useCreateBotMutation,
  useDeleteBotMutation,
  useGetBotsQuery,
  usePrefetch
} from "@/store/slices/bookkeeping/bookkeeping"
import { Box, Button, Grid2 as Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"

const Dashboard = () => {
  const { data } = useGetBotsQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const prefetch = usePrefetch("getBotById")

  const [createBot] = useCreateBotMutation()
  const [deleteBot] = useDeleteBotMutation()

  const [_message, setMessage] = useState<string | null>(null)

  const handleCreate = async (name: string) => {
    try {
      await createBot({ name }).unwrap()
      setMessage("Bot successfully created!")
    } catch {
      setMessage("Failed to create bot.")
    }
  }

  const _handleDelete = async (botId: string) => {
    try {
      await deleteBot(botId).unwrap()
      setMessage("Bot deleted successfully!")
    } catch {
      setMessage("Failed to delete bot.")
    }
  }
  const botsLength = (data || []).length

  console.log(data)
  return (
    <>
      {" "}
      <Stack width="100%" display={{ sm: "flex" }}>
        <Button sx={{ width: [200, 300] }} onClick={() => setIsModalOpen(true)}>
          <Typography>Create your automation bot</Typography>
        </Button>

        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="h6">Bot List:</Typography>
          </Grid>

          {botsLength > 0 ? (
            (data || []).map((bot) => (
              <Grid key={bot._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box onMouseOver={() => bot._id && prefetch(bot._id)}>
                  <BotCard bot={bot} onDelete={(_id) => _handleDelete(_id)} />
                </Box>
              </Grid>
            ))
          ) : (
            <Grid size={12}>
              <Typography>No bots available</Typography>
            </Grid>
          )}
        </Grid>
      </Stack>
      <CreateBotModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </>
  )
}

export default Dashboard
