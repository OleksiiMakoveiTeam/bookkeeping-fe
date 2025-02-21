import { Task } from "@/store/slices/bookkeeping/types"
import { Paper, Typography, Box, Chip } from "@mui/material"
import { formatDistanceToNow } from "date-fns"

export const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: task.completed ? "success.light" : "background.paper",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 5
        }
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {task.description}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Duration: {task.duration} ms
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {task.completed ? (
          <Chip label="Completed" color="success" />
        ) : (
          <Chip label="Pending" color="warning" />
        )}

        {task.completedAt && (
          <Typography variant="caption" color="text.secondary">
            {`Completed ${formatDistanceToNow(new Date(task.completedAt), {
              addSuffix: true
            })}`}
          </Typography>
        )}
      </Box>
    </Paper>
  )
}
