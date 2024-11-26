import { ChangeEvent } from "react";
import {
  Card,
  List,
  ListItem,
  TextField,
  IconButton,
  Typography,
  Radio,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export const DynamicList = ({
  title,
  label,
  options,
  setOptions,
  isCheckList,
  correctAnswer,
  setCorrectAnswer,
}: {
  title: string;
  label: string;
  options: string[];
  setOptions: (lista: string[]) => void;
  isCheckList: boolean;
  correctAnswer?: number;
  setCorrectAnswer?: (index: number) => void;
}) => {
  const handleOption = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    event.preventDefault();
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if (isCheckList && setCorrectAnswer && correctAnswer !== undefined) {
      if (correctAnswer === index) setCorrectAnswer(-1);
      else if (correctAnswer > index) setCorrectAnswer(correctAnswer - 1);
    }
    const newOptions = [
      ...options.slice(0, index),
      ...options.slice(index + 1),
    ];
    setOptions(newOptions);
  };

  const handleCorrectAnswer = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    event.preventDefault();
    if (isCheckList && setCorrectAnswer) setCorrectAnswer(index);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "#222",
        p: 2,
        textAlign: "center",
        maxWidth: "100%",
      }}
    >
      <List sx={{ bgcolor: "#333" }} disablePadding>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ textAlign: "left", p: 1 }}>
            {title}
          </Typography>

          <IconButton
            onClick={() => addOption()}
            sx={{ p: 1, alignItems: "center", maxWidth: "100%" }}
            aria-label="search"
          >
            <AddCircleOutlineOutlinedIcon style={{ fill: "green" }} />
          </IconButton>
        </div>
        {options.map((option, index) => (
          <ListItem key={index} disablePadding divider>
            {isCheckList && (
              <Radio
                checked={index === correctAnswer}
                onChange={(e) => handleCorrectAnswer(e, index)}
                value={index}
                name="radio-buttons"
              />
            )}
            <TextField
              variant="filled"
              label={`${label} ${index + 1}`}
              fullWidth
              sx={{
                p: 1,
                textAlign: "left",
                maxWidth: "100%",
              }}
              value={option}
              onChange={(e) => {
                handleOption(e, index);
              }}
            />
            <IconButton
              onClick={() => removeOption(index)}
              sx={{ p: 1, alignItems: "center", maxWidth: "100%" }}
              aria-label="search"
            >
              <RemoveCircleOutlineIcon style={{ fill: "red" }} />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
