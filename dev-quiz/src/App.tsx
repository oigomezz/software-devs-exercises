import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { Logo } from "./components/Logo";
import { Home } from "./components/Home";
import { Results } from "./components/Results";

function App() {
  const questions = useQuestionsStore((state) => state.questions);
  const date = new Date();

  return (
    <div className="app">
      <header>
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
      </header>
      <main>
        <Container maxWidth="sm">
          {questions.length === 0 && <Home />}
          {questions.length > 0 && <Results />}
        </Container>
      </main>
      <footer>{date.getFullYear()}</footer>
    </div>
  );
}

export default App;
