import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { useQuestionsStore } from "../store/questions";
import { DynamicList } from "../components/DynamicList";

export const AddQuestion = () => {
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [categories, setCategories] = useState<string[]>([]);

  const reset = useQuestionsStore((state) => state.reset);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const addQuestion = {
      description: description,
      answers: options,
      code,
      correctAnswer,
      categories,
    };
    alert(JSON.stringify(addQuestion));
  };

  return (
    <>
      <h1>Agregar Pregunta</h1>
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
            label="Codigo"
            multiline
            fullWidth
            rows={2}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Card>

        <DynamicList
          title={"Opciones"}
          label={"Opcion"}
          options={options}
          setOptions={setOptions}
          isCheckList={true}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
        />

        <DynamicList
          title={"Categorias"}
          label={"Categoria"}
          options={categories}
          setOptions={setCategories}
          isCheckList={false}
        />

        <Button
          onClick={(e) => handleSubmit(e)}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          Agregar pregunta
        </Button>

        <Button onClick={() => reset()}>Volver al inicio</Button>
      </form>
    </>
  );
};
