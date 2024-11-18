import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { type Question } from "../types";
import { useQuestionsStore } from "../store/questions";

export const Recent = () => {
  const fetchQuestion = useQuestionsStore((state) => state.fetchQuestion);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function fetching() {
      const result = await fetch("http://localhost:5173/data.json");
      let json = await result.json();
      json = json.slice(-5);
      setQuestions(json.reverse());
    }

    fetching();
  }, []);

  const handleClick = (question: Question) => {
    fetchQuestion(question.id);
  };

  return (
    <div style={{ marginTop: "16px" }}>
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
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Recientes
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
                <ListItemText primary={question.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};
