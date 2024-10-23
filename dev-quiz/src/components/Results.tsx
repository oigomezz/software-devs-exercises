import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/questions";

export const Results = () => {
  const reset = useQuestionsStore((state) => state.reset);
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <div style={{ marginTop: "16px" }}>
      <h1>Resultados</h1>
      <ul>
        {questions?.map((item) => {
          return (
            <li key={item.id}>
              <p>{item.question}</p>
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: "16px" }}>
        <Button onClick={() => reset()}>¡Volver al inicio!</Button>
      </div>
    </div>
  );
};
