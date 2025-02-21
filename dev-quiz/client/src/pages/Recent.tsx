import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuestionsStore } from "../store/questions";

export const Recent = () => {
  const title = useQuestionsStore((state) => state.title);
  const loading = useQuestionsStore((state) => state.loading);
  const questions = useQuestionsStore((state) => state.questions);
  const goToPage = useQuestionsStore((state) => state.goToPage);
  const setCurrent = useQuestionsStore((state) => state.setCurrentQuestion);

  const handleClick = (index: number) => {
    setCurrent(index);
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
                  onClick={() => handleClick(index)}
                  sx={{
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon> {index + 1} </ListItemIcon>
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
