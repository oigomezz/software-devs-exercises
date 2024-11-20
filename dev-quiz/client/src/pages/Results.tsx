import { Button, IconButton, Stack } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, Edit } from "@mui/icons-material";

import { useQuestionsStore } from "../store/questions";
import { Question } from "../components/Question";

export const Results = () => {
  const edit = useQuestionsStore((state) => state.edit);
  const reset = useQuestionsStore((state) => state.reset);
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNext = useQuestionsStore((state) => state.goNextQuestion);
  const goPrev = useQuestionsStore((state) => state.goPreviousQuestion);

  const questionInfo = questions[currentQuestion];

  const handleEdit = (id: number) => {
    edit(id);
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton onClick={goPrev} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNext}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />

      <div style={{ marginTop: "16px" }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Button onClick={() => reset()}>Volver al inicio</Button>
          <IconButton onClick={() => handleEdit(questionInfo._id)}>
            <Edit />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};
