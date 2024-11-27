import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { Logo } from "./components/Logo";
import { Home } from "./pages/Home";
import { Results } from "./pages/Results";
import { Recent } from "./pages/Recent";
import { EditQuestion } from "./pages/EditQuestion";
import { AddQuestion } from "./pages/AddQuestion";

function App() {
  const date = new Date();
  const page = useQuestionsStore((state) => state.page);

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
          {page === "home" && <Home />}
          {page === "home" && <Recent />}
          {page === "results" && <Results />}
          {page === "add" && <AddQuestion />}
          {page === "edit" && <EditQuestion />}
        </Container>
      </main>
      <footer>{date.getFullYear()}</footer>
    </div>
  );
}

export default App;
