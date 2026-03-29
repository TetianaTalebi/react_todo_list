import { useState } from "react";
import {ListItem, TextField, InputAdornment, IconButton} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

export default function TodoForm({addTodo}) {
  const [text, setText] = useState("");

  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    return setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length < 3){
      setSubmitError(true);
    } else {
      setSubmitError(false);
      addTodo(text);
      setText("");
    }
  }

  return (
    <ListItem disablePadding >
        <form onSubmit={handleSubmit} style={{width: '100%'}} >
            <TextField fullWidth
                error = {submitError}
                id={submitError ? "outlined-error-helper-text" : "outlined-textarea"}
                placeholder="Please add a new todo"
                multiline
                label = {submitError ? "Error" : "Add Todo"}
                helperText = {submitError ? 'The length of todo text can not be less than 3 characters':''}
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


