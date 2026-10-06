import { useState, useEffect, useLayoutEffect } from "react";

import { isTodoValidUtils } from "../utils/utils.js";

import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import CustomizedTooltip from "./CustomizedTooltip.jsx";

import useCursorPosition from "../hooks/useCursorPosition.js";

export default function TodoItem({ todo, remove, toggle, revise }) {
  // Create textLocal state to prevent text caret jumping to the end of the line during onChange event of the input
  const [textLocal, setTextLocal] = useState(todo.todoText);

  const [isTodoTextValid, setIsTodoTextValid] = useState(true);

  const [myRefs, setCursor, setTextWithAlt] = useCursorPosition();

  const handleIsTodoTextValid = (myText, myValidationLogic) => {
    if (myValidationLogic(myText)) {
      setIsTodoTextValid(true);
    } else {
      setIsTodoTextValid(false);
    }
  };

  useEffect(() => {
    setCursor();
    handleIsTodoTextValid(textLocal, isTodoValidUtils);
  }, [textLocal]);

  const handleOnChange = (e) => {
    const newTextValue = e.target.value;
    setTextLocal(newTextValue);

    revise(todo.todoId, newTextValue);
  };

  const handleOnBlur = (e) => {
    setTextLocal(e.target.value.trim());
    revise(todo.todoId, e.target.value.trim());
  };

  const removeTodo = () => remove(todo.todoId);
  const labelId = `checkbox-list-label-${todo.todoId}`;

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter" && ev.altKey === false) {
      ev.preventDefault();
      handleOnBlur(ev);
    } else if (ev.key === "Enter" && ev.altKey === true) {
      setTextLocal(setTextWithAlt(todo.todoText));
      revise(todo.todoId, setTextWithAlt(todo.todoText));
    }
  };

  return (
    <ListItem
      secondaryAction={
        <CustomizedTooltip title="Delete Todo" placement="right" arrow>
          <IconButton edge="end" aria-label="delete" onClick={removeTodo}>
            <DeleteIcon color="primary" />
          </IconButton>
        </CustomizedTooltip>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            onChange={toggle}
            disabled={!isTodoTextValid}
            edge="start"
            checked={todo.todoCompleted}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>

        <TextField
          inputRef={(el) => {
            myRefs.current.textFieldDOMElement = el;
          }}
          error={!isTodoTextValid}
          disabled={todo.todoCompleted ? true : false}
          label={isTodoTextValid ? "" : "Error"}
          id={
            isTodoTextValid ? "standard-textarea" : "standard-error-helper-text"
          }
          helperText={
            isTodoTextValid
              ? ""
              : "The todo text can not be less than 3 characters long or empty string"
          }
          value={textLocal}
          multiline
          variant="standard"
          size="small"
          fullWidth
          className={todo.todoCompleted ? "crossed-out" : ""}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onBlur={handleOnBlur}
        />
      </ListItemButton>
    </ListItem>
  );
}
