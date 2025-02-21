import { Bot } from "@/store/slices/bookkeeping/types"
import { Paper, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router"

export const BotCard = ({
  bot,
  onDelete
}: {
  bot: Bot
  onDelete: (id: string) => void
}) => {
  const { _id, name, tasks } = bot
  const navigate = useNavigate()

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1,
        minHeight: 120,
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 5
        }
      }}
      onClick={() => navigate(`/bot/${_id}`)}
    >
      <Typography variant="h6" fontWeight="bold">
        {name}
      </Typography>

      <Typography variant="body2">
        {tasks?.length ?? 0} {tasks?.length === 1 ? "task" : "tasks"}
      </Typography>

      <Button
        variant="outlined"
        color="error"
        onClick={(e) => {
          if (!_id) return

          e.stopPropagation()
          onDelete(_id)
        }}
      >
        Delete
      </Button>
    </Paper>
  )
}
