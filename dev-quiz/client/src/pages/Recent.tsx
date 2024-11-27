import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { type Question } from "../types";
import { useQuestionsStore } from "../store/questions";

export const Recent = () => {
  const title = useQuestionsStore((state) => state.title);
  const loading = useQuestionsStore((state) => state.loading);
  const questions = useQuestionsStore((state) => state.questions);
  const fetchQuestion = useQuestionsStore((state) => state.getQuestionById);
  const goToPage = useQuestionsStore((state) => state.goToPage);

  const handleClick = (question: Question) => {
    fetchQuestion(question._id);
    goToPage("results");
  };

  return (
    <div style={{ marginTop: "16px" }}>
      {loading ? (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Loading...
        </Typography>
      ) : (
        <Card
          variant="outlined"
          sx={{
            bgcolor: "#222",
            p: 2,
            textAlign: "left",
            marginTop: 4,
            maxWidth: "100%",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", p: 1 }}>
            {title}
          </Typography>
          <List sx={{ bgcolor: "#333" }} disablePadding>
            {questions.map((question, index) => (
              <ListItem key={index} disablePadding divider>
                <ListItemButton
                  onClick={() => handleClick(question)}
                  sx={{
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemText primary={question.description} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </div>
  );
};
