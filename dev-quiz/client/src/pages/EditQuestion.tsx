/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  List,
  ListItem,
  InputBase,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuestionsStore } from "../store/questions";
import { Question } from "../types";

export const EditQuestion = () => {
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [question, setQuestion] = useState<Question>();

  const reset = useQuestionsStore((state) => state.reset);
  const current = useQuestionsStore((state) => state.currentQuestion);
  const fetchQuestion = useQuestionsStore((state) => state.fetchQuestion);
  const questions = useQuestionsStore((state) => state.questions);

  useEffect(() => {
    fetchQuestion(current);
    const question = questions[0];
    setDescription(question.question);
    setOptions(question.answers);
    setQuestion(question);
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const editQuestion: Question = {
      id: question?.id,
      question: description,
      answers: options,
      code: question?.code,
      correctAnswer: question?.correctAnswer,
      isCorrectUserAnswer: question?.isCorrectUserAnswer,
    };
    alert({ editQuestion });
  };

  const handleInput = (text: string, index: number) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  return (
    <>
      <h1>Editar Pregunta</h1>
      <form autoComplete="off" style={{ marginTop: "16px" }}>
        <TextField
          id="outlined-multiline-static"
          label="Descripcion"
          multiline
          fullWidth
          rows={3}
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
                <InputBase
                  fullWidth
                  sx={{
                    p: 1,
                    textAlign: "left",
                    maxWidth: "100%",
                  }}
                  value={option}
                  onChange={(e) => {
                    handleInput(e.target.value, index);
                  }}
                ></InputBase>
              </ListItem>
            ))}
          </List>
        </Card>

        <Button
          onClick={(e) => handleSubmit(e)}
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
