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
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const fetchQuestion = useQuestionsStore((state) => state.fetchQuestion);

  const API_URL = "http://localhost:3005";

  const fetchRecords = async () => {
    setLoading(true);
    const url = `${API_URL}/quiz/getLastQuestions/${5}`;
    const response = await fetch(url);
    if (response.ok) {
      const res = await response.json();
      setQuestions(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleClick = (question: Question) => {
    fetchQuestion(question._id);
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
            Agregadas Recentecientemente
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
