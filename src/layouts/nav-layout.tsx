import Navigation from "@/components/navigation/navigation"
import { Container } from "@mui/material"

export const NavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        placeItems: "center",
        width: "100%",
        minHeight: "100%",
        height: "100%",
        mb: [5, 10]
      }}
    >
      <Navigation>{children}</Navigation>
    </Container>
  )
}
