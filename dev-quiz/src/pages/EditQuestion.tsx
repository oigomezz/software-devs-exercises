import {
  Button,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuestionsStore } from "../store/questions";

export const EditQuestion = () => {
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const reset = useQuestionsStore((state) => state.reset);
  const current = useQuestionsStore((state) => state.currentQuestion);
  const fetchQuestion = useQuestionsStore((state) => state.fetchQuestion);
  const questions = useQuestionsStore((state) => state.questions);

  useEffect(() => {
    fetchQuestion(current);
    const question = questions[0];
    setDescription(question.question);
    setOptions(question.answers);
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Editar Pregunta</h1>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{ marginTop: "16px" }}
      >
        <TextField
          id="outlined-multiline-static"
          label="Descripcion"
          multiline
          fullWidth
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Card
          variant="outlined"
          sx={{
            bgcolor: "#222",
            p: 2,
            textAlign: "left",
            maxWidth: "100%",
          }}
        >
          <List sx={{ bgcolor: "#333" }} disablePadding>
            {options.map((option, index) => (
              <ListItem key={index} disablePadding divider>
                <ListItemButton
                  sx={{
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemText primary={option} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Card>

        <Button
          onClick={() => {
            alert("Add question");
          }}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          Editar pregunta
        </Button>

        <Button onClick={() => reset()}>Volver al inicio</Button>
      </form>
    </>
  );
};
