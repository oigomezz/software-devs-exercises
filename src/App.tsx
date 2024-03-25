import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { JavaScriptLogo } from "./JavaScriptLogo";
import { Start } from "./page/Start";
import { Game } from "./page/Game";

import { useQuestionsStore } from "./store/questions";
import { useQuestionsData } from "./hooks/useQuestionsData";

function App() {
  const questions = useQuestionsStore((state) => state.questions);
  const { unanswered } = useQuestionsData();
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && unanswered > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;
