import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

export default function TodoItem({ todo, remove, toggle }) {
  const [isTodoTextValid, setIsTodoTextValid] = useState(true);

  // const handleOnBlur = () => {
  //   if (todo.todoText.length < 3) {
  //     setIsTodoTextValid(false);
  //   }
  // };

  const removeTodo = () => remove(todo.todoId);
  const labelId = `checkbox-list-label-${todo.todoId}`;

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={removeTodo}>
          <DeleteIcon color="primary" />
        </IconButton>
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
        {/* <ListItemText
          id={labelId}
          primary={todo.todoText}
          className={todo.todoCompleted ? "crossed-out" : ""}
          - sx={{ overflowWrap: "break-word", wordWrap: "break-word" }}
        /> */}

        {/* <TextField
          - id="standard-textarea"
          label="Multiline Placeholder"
          - placeholder="Placeholder"
          - multiline
          - variant="standard"
        /> */}

        {/* <TextField
             - error
            - id="standard-error-helper-text"
            - label="Error"
            - defaultValue="Hello World"
            - helperText="Incorrect entry."
            - variant="standard"
          /> */}

        <TextField
          error={!isTodoTextValid}
          disabled={todo.todoCompleted ? true : false}
          label={isTodoTextValid ? "" : "Error"}
          id={
            isTodoTextValid ? "standard-textarea" : "standard-error-helper-text"
          }
          helperText={
            isTodoTextValid
              ? ""
              : "The length of todo text can not be less than 3 characters"
          }
          defaultValue={todo.todoText}
          multiline
          variant="standard"
          size="small"
          sx={{ width: "100%" }}
          className={todo.todoCompleted ? "crossed-out" : ""}
          // onBlur = {handleOnBlur}
        />
      </ListItemButton>
    </ListItem>
  );
}

// <ListItemText id={labelId}>
//   <TextField
//     onClick={e => e.stopPropagation()}
//     onChange={event => {
//       setOriginalListItems({
//         ...originalListItems,
//         [id]: event.target.value,
//       });
//     }}
//     onBlur={event => {
//       void updateItem(id, event.target.value);
//     }}
//     value={originalListItems[id] ?? ''}
//     size="small"
//     variant="standard"
//   />
// </ListItemText>
