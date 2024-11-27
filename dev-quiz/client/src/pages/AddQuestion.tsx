import { useQuestionsStore } from "../store/questions";
import { QuestionForm } from "../components/QuestionForm";

export const AddQuestion = () => {
  const initialState = {
    description: "",
    code: "",
    answers: [],
    correctAnswer: -1,
    categories: [],
  };

  const addQuestion = useQuestionsStore((state) => state.addQuestion);

  return (
    <>
      <h1>Agregar Pregunta</h1>
      <QuestionForm
        submit={addQuestion}
        initialState={initialState}
        label={"Agregar"}
      />
    </>
  );
};
