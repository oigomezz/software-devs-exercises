import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { type Question as QuestionType } from "../types";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { correctAnswer } = info;
  if (index !== correctAnswer) return "red";
  if (index === correctAnswer) return "green";
  return "transparent";
};
export const Question = ({ info }: { info: QuestionType }) => {
  return (
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
      <Typography variant="h5">{info.question}</Typography>

      {info.code && (
        <SyntaxHighlighter language="javascript" style={gradientDark}>
          {info.code}
        </SyntaxHighlighter>
      )}

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              sx={{
                backgroundColor: getBackgroundColor(info, index),
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
