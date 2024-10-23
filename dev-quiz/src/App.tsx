import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { Logo } from "./components/Logo";
import { Home } from "./components/Home";
import { Results } from "./components/Results";

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
        {questions.length > 0 && <Results />}
      </Container>
    </main>
  );
}

export default App;
