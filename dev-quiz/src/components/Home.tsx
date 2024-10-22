import { FormControl, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MouseEvent } from "react";

export const Home = () => {
  const handleClick = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(event.target);
  };

  return (
    <FormControl>
      <div style={{ marginTop: "16px" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="search"
          inputProps={{ "aria-label": "questions" }}
        />
        <IconButton
          onClick={(e) => {
            handleClick(e);
          }}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </div>
    </FormControl>
  );
};
