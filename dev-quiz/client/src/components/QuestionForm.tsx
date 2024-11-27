import { useState } from "react";
import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/questions";
import { Question } from "../types";

import { DynamicList } from "./DynamicList";
import { TextArea } from "./TextArea";

export const QuestionForm = ({
  label,
  initialState,
  submit,
}: {
  label: string;
  initialState: {
    description: string;
    answers: string[];
    code: string;
    correctAnswer: number;
    categories: string[];
  };
  submit: (question: Question) => Promise<void>;
}) => {
  const [description, setDescription] = useState(initialState.description);
  const [code, setCode] = useState(initialState.code);
  const [options, setOptions] = useState<string[]>(initialState.answers);
  const [correctAnswer, setCorrectAnswer] = useState(
    initialState.correctAnswer
  );
  const [categories, setCategories] = useState<string[]>(
    initialState.categories
  );

  const reset = useQuestionsStore((state) => state.reset);
  const goToPage = useQuestionsStore((state) => state.goToPage);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newQuestion = {
      description,
      answers: options,
      code,
      correctAnswer,
      categories,
    };
    submit(newQuestion);
    alert("Operacion exitosa!!!");
    goToPage("home");
  };

  return (
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
        {`${label} pregunta`}
      </Button>

      <Button onClick={() => reset()}>Volver al inicio</Button>
    </form>
  );
};
