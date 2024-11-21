import "./App.css";
import { useQuestionsStore } from "./store/questions";
import { Container, Stack, Typography } from "@mui/material";
import { Logo } from "./components/Logo";
import { Home } from "./pages/Home";
import { Results } from "./pages/Results";
import { Recent } from "./pages/Recent";
import { EditQuestion } from "./pages/EditQuestion";
import { AddQuestion } from "./pages/AddQuestion";

function App() {
  const date = new Date();

  const questions = useQuestionsStore((state) => state.questions);
  const id = useQuestionsStore((state) => state.idQuestion);
  const edit = useQuestionsStore((state) => state.editQuestion);

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
        <Container maxWidth="md">
          {questions.length === 0 && !edit && <Home />}
          {questions.length === 0 && !edit && <Recent />}
          {questions.length > 0 && !edit && <Results />}
          {edit && id && <EditQuestion />}
          {edit && !id && <AddQuestion />}
        </Container>
      </main>
      <footer>{date.getFullYear()}</footer>
    </div>
  );
}

export default App;
