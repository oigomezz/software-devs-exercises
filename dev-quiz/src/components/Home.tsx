import { useState } from "react";
import { useQuestionsStore } from "../store/questions";

import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Home = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);
  const [search, setSearch] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetchQuestions(search, 5);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      style={{ marginTop: "16px" }}
    >
      <InputBase
        onChange={(e) => setSearch(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="search"
        inputProps={{ "aria-label": "questions" }}
        value={search}
      />

      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </form>
  );
};
