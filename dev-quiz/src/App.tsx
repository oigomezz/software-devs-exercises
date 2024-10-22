import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { Logo } from "./Logo";

function App() {
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Logo />
          <Typography variant="h2" component="h1">
            Devs Quiz
          </Typography>
        </Stack>
      </Container>
    </main>
  );
}

export default App;
