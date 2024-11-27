import { Button } from "@mui/material";
import { useState } from "react";
import { useQuestionsStore } from "../store/questions";
import { DynamicList } from "../components/DynamicList";
import { TextArea } from "../components/TextArea";

export const AddQuestion = () => {
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [categories, setCategories] = useState<string[]>([]);

  const reset = useQuestionsStore((state) => state.reset);
  const addQuestion = useQuestionsStore((state) => state.addQuestion);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newQuestion = {
      description,
      answers: options,
      code,
      correctAnswer,
      categories,
    };
    addQuestion(newQuestion);
  };

  return (
    <>
      <h1>Agregar Pregunta</h1>
      <form autoComplete="off" style={{ marginTop: "16px" }}>
        <TextArea
          label={"Descripcion"}
          value={description}
          onChange={setDescription}
        />

        <TextArea label={"Codigo"} value={code} onChange={setCode} />

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
