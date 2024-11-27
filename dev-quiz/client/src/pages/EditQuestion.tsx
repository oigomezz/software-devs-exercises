import { useQuestionsStore } from "../store/questions";
import { QuestionForm } from "../components/QuestionForm";
import { Question } from "../types";

export const EditQuestion = () => {
  const id = useQuestionsStore((state) => state.idQuestion);
  const questions = useQuestionsStore((state) => state.questions);
  const updateQuestion = useQuestionsStore((state) => state.updateQuestion);

  const question = questions[0];
  const initialState: {
    description: string;
    answers: string[];
    code: string;
    correctAnswer: number;
    categories: string[];
  } = {
    description: question.description,
    answers: question.answers,
    code: question.code ?? "",
    correctAnswer: question.correctAnswer ?? -1,
    categories: question.categories,
  };

  const editQuestion = async (question: Question) => {
    updateQuestion(id, question);
  };

  return (
    <>
      <h1>Editar Pregunta</h1>
      <QuestionForm submit={editQuestion} initialState={initialState} label={"Editar"} />
    </>
  );
};
