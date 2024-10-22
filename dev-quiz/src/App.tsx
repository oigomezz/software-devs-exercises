import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { Logo } from "./components/Logo";
import { Home } from "./components/Home";
import { useQuestionsStore } from "./store/questions";

function App() {
  const questions = useQuestionsStore((state) => state.questions);

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

        {questions.length === 0 && <Home />}
      </Container>
    </main>
  );
}

export default App;
