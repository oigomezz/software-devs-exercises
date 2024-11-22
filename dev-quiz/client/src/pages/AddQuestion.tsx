import {
  Button,
  Card,
  List,
  ListItem,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useQuestionsStore } from "../store/questions";

export const AddQuestion = () => {
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [categories, setCategories] = useState<string[]>([]);

  const reset = useQuestionsStore((state) => state.reset);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const addQuestion = {
      description: description,
      answers: options,
      code,
      correctAnswer,
      categories,
    };
    alert(JSON.stringify(addQuestion));
  };

  const handleOption = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    event.preventDefault();
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleCategory = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    event.preventDefault();
    const newCategories = [...categories];
    newCategories[index] = event.target.value;
    setCategories(newCategories);
  };

  const addOption = () => {
    setCorrectAnswer(options.length);
    const newOptions = [...options, ""];
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = [
      ...options.slice(0, index),
      ...options.slice(index + 1),
    ];
    setOptions(newOptions);
  };

  const addCategory = () => {
    const newCategories = [...categories, ""];
    setCategories(newCategories);
  };

  const removeCategory = (index: number) => {
    const newCategories = [
      ...categories.slice(0, index),
      ...categories.slice(index + 1),
    ];
    setCategories(newCategories);
  };

  return (
    <>
      <h1>Agregar Pregunta</h1>
      <form autoComplete="off" style={{ marginTop: "16px" }}>
        <Card
          variant="outlined"
          sx={{
            bgcolor: "#222",
            p: 2,
            textAlign: "left",
            maxWidth: "100%",
          }}
        >
          <TextField
            label="Descripcion"
            multiline
            fullWidth
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Card>

        <Card
          variant="outlined"
          sx={{
            bgcolor: "#222",
            p: 2,
            textAlign: "left",
            maxWidth: "100%",
          }}
        >
          <TextField
            label="Codigo"
            multiline
            fullWidth
            rows={2}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Card>

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
                Opciones
              </Typography>

              <IconButton
                onClick={() => addOption()}
                sx={{ p: 1, alignItems: "center", maxWidth: "100%" }}
                aria-label="search"
              >
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </div>
            {options.map((option, index) => (
              <ListItem key={index} disablePadding divider>
                <TextField
                  variant="filled"
                  label={`Opcion ${index + 1}`}
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
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Card>

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
                Categorias
              </Typography>

              <IconButton
                onClick={() => addCategory()}
                sx={{ p: 1, alignItems: "center", maxWidth: "100%" }}
                aria-label="search"
              >
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </div>
            {categories.map((category, index) => (
              <ListItem key={index} disablePadding divider>
                <TextField
                  variant="filled"
                  label={`Categoria ${index + 1}`}
                  fullWidth
                  sx={{
                    p: 1,
                    textAlign: "left",
                    maxWidth: "100%",
                  }}
                  value={category}
                  onChange={(e) => {
                    handleCategory(e, index);
                  }}
                />
                <IconButton
                  onClick={() => removeCategory(index)}
                  sx={{ p: 1, alignItems: "center", maxWidth: "100%" }}
                  aria-label="search"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Card>

        <Button
          onClick={(e) => handleSubmit(e)}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          Agregar pregunta
        </Button>

        <Button onClick={() => reset()}>Volver al inicio</Button>
      </form>
    </>
  );
};
