import {TaskCard} from "@/components/task-card/task-card"
import {useGetBotByIdQuery} from "@/store/slices/bookkeeping/bookkeeping"
import {Typography, CircularProgress, Paper, Stack} from "@mui/material"
import {useParams} from "react-router"

export const BotPage = () => {
  const {id} = useParams()
  const {data: bot, isLoading, error} = useGetBotByIdQuery(id as string)

  if (isLoading) return <CircularProgress />
  if (error || !bot) return <Typography>Bot not found</Typography>

  return (
    <Paper
      sx={{padding: 3, borderRadius: 2, maxWidth: 600, margin: "auto", mt: 5}}
    >
      <Typography variant="h4">{bot.name}</Typography>
      <Typography variant="h6" color="text.secondary">
        Assigned Tasks:
      </Typography>
      <Stack spacing={2} mt={2}>
        {(bot.tasks || []).map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </Stack>
    </Paper>
  )
}
