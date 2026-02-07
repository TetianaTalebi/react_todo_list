import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

export default function TodoForm() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    return setText(e.target.value);
  }

  return (
    <ListItem disablePadding>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={text}
        onChange={handleChange}
      />
    </ListItem>
  );
}
