import { Button, IconButton, Stack } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos, Edit } from "@mui/icons-material";

import { useQuestionsStore } from "../store/questions";
import { Question } from "../components/Question";

export const Results = () => {
  const goPrev = useQuestionsStore((state) => state.goPreviousQuestion);
  const goNext = useQuestionsStore((state) => state.goNextQuestion);
  const current = useQuestionsStore((state) => state.currentQuestion);
  const questions = useQuestionsStore((state) => state.questions);
  const reset = useQuestionsStore((state) => state.reset);
  const edit = useQuestionsStore((state) => state.edit);

  const questionInfo = questions[current];
  const handleEdit = (id: string | undefined) => edit(id);

  return (
    <div style={{ marginTop: "16px" }}>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton onClick={goPrev} disabled={current === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {current + 1} / {questions.length}
        <IconButton onClick={goNext} disabled={current >= questions.length - 1}>
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
