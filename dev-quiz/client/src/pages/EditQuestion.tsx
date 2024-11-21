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
  const [code, setCode] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [question, setQuestion] = useState<Question>();

  const reset = useQuestionsStore((state) => state.reset);
  const id = useQuestionsStore((state) => state.idQuestion);
  const questions = useQuestionsStore((state) => state.questions);
  const fetchQuestion = useQuestionsStore((state) => state.fetchQuestion);

  const fetchQ = async () => {
    fetchQuestion(id);
    const question = questions[0];
    setQuestion(question);
    setDescription(question.description);
    setCode(question.code ?? "");
    setOptions(question.answers);
  };

  useEffect(() => {
    fetchQ();
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const editQuestion: Question = {
      _id: id,
      description: description,
      answers: options,
      code,
      correctAnswer: question?.correctAnswer ?? -1,
      categories: question?.categories ?? [],
    };
    alert(JSON.stringify(editQuestion));
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
        <Card
          variant="outlined"
          sx={{
            bgcolor: "#222",
            p: 2,
            textAlign: "left",
            maxWidth: "100%",
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Descripcion"
            multiline
            fullWidth
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Card>

        <Card
          variant="outlined"
          sx={{
            bgcolor: "#222",
            p: 2,
            textAlign: "left",
            maxWidth: "100%",
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Codigo"
            multiline
            fullWidth
            rows={2}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Card>

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
