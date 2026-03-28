import { useState } from "react";
import {ListItem, TextField, InputAdornment, IconButton} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

export default function TodoForm({addTodo}) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    return setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  }

  return (
    <ListItem disablePadding >
        <form onSubmit={handleSubmit} style={{width: '100%'}} >
            <TextField fullWidth
                id="outlined-basic"
                label="Add Todo"
                variant="outlined"
                value={text}
                onChange={handleChange}
                InputProps = {{endAdornment:<InputAdornment position="end">
                        <IconButton
                        aria-label="create todo"
                        edge="end"
                        type="submit"
                        >
                            <CreateIcon color="primary" />
                        </IconButton>
                    </InputAdornment>}}
            /> 
        </form>
    </ListItem>
  );
}


