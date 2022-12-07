import { React, useState } from "react";

import { TextField } from "@mui/material";

const Search = ({ handleSearch }) => {
  const [debounceTimeout, setDebounceTimeout] = useState();
  const debounceSearch = (event, debounceTimeout) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      handleSearch(event);
    }, 500);
    setDebounceTimeout(timeout);
  };
  return (
    <TextField
      placeholder="Search for Name,Email,Role"
      fullWidth
      onChange={(event) => debounceSearch(event, debounceTimeout)}
      size="small"
      sx={{ margin: "5px" }}
    />
  );
};
export default Search;
