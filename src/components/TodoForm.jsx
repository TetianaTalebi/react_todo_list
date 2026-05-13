import { useState, useEffect } from "react";

import { ListItem, TextField, InputAdornment, IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

import useDataValidation from "../hooks/useDataValidation.js";
import useCursorPosition from "../hooks/useCursorPosition.js";

import { isTodoValidUtils } from "../utils/utils.js";

export default function TodoForm({ addTodo }) {
  
  const {
    text,
    isValid: isTodoFormValid,
    handleOnChange: handleFormOnChange,
    resetInitialText: resetForm,
  } = useDataValidation();

  const [myRefs, setCursor, setTextWithAlt] = useCursorPosition();

  useEffect(setCursor, [text]);

  const handleSubmitWithForm = (e) => {
    e.preventDefault();
    if (isTodoFormValid) {
      addTodo(text);
      resetForm();
    }
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter" && ev.altKey === false) {
      ev.preventDefault();
      if (isTodoFormValid && text !== "") {
          addTodo(text);
          resetForm();
      }
    }
    if (ev.key === "Enter" && ev.altKey === true) {
      resetForm((prevText) => {return setTextWithAlt(prevText)});
    }
  };

  return (
    <ListItem disablePadding>
      <form onSubmit={handleSubmitWithForm} style={{ width: "100%" }}>
        <TextField
          fullWidth
          inputRef={(el) => {
            myRefs.current.textFieldDOMElement = el;
          }}
          error={!isTodoFormValid}
          id={
            isTodoFormValid ? "outlined-textarea" : "outlined-error-helper-text"
          }
          placeholder="Add a new todo"
          multiline
          label={isTodoFormValid ? "Add Todo" : "Error"}
          helperText={
            isTodoFormValid
              ? ""
              : "The todo text can not be less than 3 characters long or empty string"
          }
          variant="outlined"
          value={text}
          onChange={(e) => handleFormOnChange(e, isTodoValidUtils)}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="create todo"
                  edge="end"
                  type="submit"
                  disabled={!isTodoFormValid || text === ""}
                >
                  <CreateIcon color={isTodoFormValid ? "primary" : "error"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </ListItem>
  );
}
