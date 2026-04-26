import { useState, useEffect } from "react";
import {ListItem, TextField, InputAdornment, IconButton} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import useCursorPosition from "./hooks/useCursorPosition";

export default function TodoForm({addTodo}) {

  const [text, setText] = useState("");

  const [submitError, setSubmitError] = useState(false);

  const [myRefs, setCursor, setTextWithAlt] = useCursorPosition();

  const handleChange = (e) => {
    if(e.target.value.length < 3){
      setSubmitError(true);
    } else {
      setSubmitError(false);
    }
    return setText(e.target.value);
  }

  const handleSubmit = () => {
    if(text.trim()===""){
      setSubmitError(true);
      setText("");
    } else if (text.trim().length < 3){
      setSubmitError(true);
      setText(text.trim());
    } else {
      setSubmitError(false);
      addTodo(text.trim());
      setText("");
    }
  }

  const handleSubmitWithForm = (e) => {
    e.preventDefault();
    handleSubmit();
  }

  useEffect(setCursor, [text]);

  const handleKeyDown = (ev) => {
    if((ev.key === 'Enter')&&(ev.altKey === false)){
      ev.preventDefault();
      handleSubmit();
    }
    if((ev.key === 'Enter')&&(ev.altKey === true)){
     
      setText(prevText => {
        return setTextWithAlt(prevText);
      });
    } 
  }

  return (
    <ListItem disablePadding >
        <form onSubmit={handleSubmitWithForm} style={{width: '100%'}} >
            <TextField fullWidth
                inputRef={(el)=>{myRefs.current.textFieldDOMElement = el}}
                error = {submitError}
                id={submitError ? "outlined-error-helper-text" : "outlined-textarea"}
                placeholder="Add a new todo"
                multiline
                label = {submitError ? "Error" : "Add Todo"}
                helperText = {submitError ? 'The todo text can not be less than 3 characters long or empty string':''}
                variant="outlined"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                InputProps = {{endAdornment:<InputAdornment position="end">
                        <IconButton
                        aria-label="create todo"
                        edge="end"
                        type="submit"
                        >
                            <CreateIcon color={submitError?"error":"primary"} />
                        </IconButton>
                    </InputAdornment>}}
            /> 
        </form>
    </ListItem>
  );
}


