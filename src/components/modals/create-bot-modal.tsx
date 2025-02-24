import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"

const botSchema = z.object({
  name: z.string().min(3, "Bot name must be at least 3 characters long")
})

type BotFormValues = z.infer<typeof botSchema>

interface CreateBotModalProps {
  open: boolean
  onClose: () => void
  onCreate: (botName: string) => void
}

export const CreateBotModal = ({
  open,
  onClose,
  onCreate
}: CreateBotModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<BotFormValues>({
    resolver: zodResolver(botSchema)
  })

  const onSubmit = (data: BotFormValues) => {
    onCreate(data.name)
    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        data-testid="test-createBotModal"
        sx={{
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{position: "absolute", top: 8, right: 8}}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2}>
          Create a Bot
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)()
          }}
        >
          <TextField
            label="Bot Name"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{mb: 2}}
          />

          <Button
            data-testid="test-createBotModalButton"
            type="submit"
            variant="contained"
            fullWidth
          >
            Create Bot
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
