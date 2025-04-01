/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useQuestionsStore } from "../store/questions";

import { IconButton, TextField } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

export const Home = () => {
  const add = useQuestionsStore((state) => state.add);
  const setTitle = useQuestionsStore((state) => state.setTitle);
  const getLastQuestions = useQuestionsStore((state) => state.getLastQuestions);
  const fetchQuestions = useQuestionsStore((state) => state.getQuestions);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getLastQuestions(15);
    setTitle("Recientes");
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetchQuestions(search);
    setTitle(`Resultados de la busqueda: ${search}`);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      style={{ marginTop: "16px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar"
          size="small"
          value={search}
        />

        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <IconButton
          onClick={() => add()}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <AddCircleOutlineOutlinedIcon style={{ fill: "green" }} />
        </IconButton>
      </div>
    </form>
  );
};
