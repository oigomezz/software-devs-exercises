import { Button, TextField } from "@mui/material";
import { useState } from "react";

export const AddQuestion = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Add Question</h1>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{ marginTop: "16px" }}
      >
        <TextField
          id="outlined-multiline-static"
          label="Descripcion"
          multiline
          fullWidth
          rows={4}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          onClick={() => {
            alert("Add question");
          }}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          Add question
        </Button>
      </form>
    </>
  );
};
