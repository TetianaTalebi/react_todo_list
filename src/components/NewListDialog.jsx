import { useState } from "react";

import useDataValidation from "../hooks/useDataValidation.js";
import { isNewListNameValidUtils } from "../utils/utils.js";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SailingIcon from "@mui/icons-material/Sailing";
import TextField from "@mui/material/TextField";
import { lightBlue } from "@mui/material/colors";

export default function NewListDialog({ open, onClose, addNewList }) {

  // keyWords is a string
  const [keyWords, setKeyWords] = useState("");

  const {
    text: newListName,
    isValid: isNewListNameValid,
    handleOnChange: handleNewListNameOnChange,
    resetInitialText: resetNewListFormText,
    resetIsValid: resetNewListFormValid,
  } = useDataValidation();

  const handleSubmitNewListForm = (e) => {
    e.preventDefault();
    addNewList(newListName, SailingIcon);
    onClose();
    resetNewListFormText();
  };

  const handleDialogClose = () => {
    onClose();
    resetNewListFormText();
    resetNewListFormValid();
  };

  const handleKeyWordsOnChange = (e) => {
    setKeyWords(e.target.value);
    console.log(keyWords);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        disableAutoFocus
      >
        <DialogTitle>Create a new list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new list by entering a list name and selecting an icon with
            keywords.
          </DialogContentText>
          <form onSubmit={handleSubmitNewListForm} id="new-list-form">
            <TextField
              margin="dense"
              fullWidth
              error={!isNewListNameValid}
              id="newListNameInput"
              helperText={
                isNewListNameValid
                  ? " "
                  : "The list name must contain between 3 and 30 characters and cannot be an empty string."
              }
              variant="outlined"
              label={isNewListNameValid ? "List Name" : "Error"}
              type="text"
              placeholder="New list name"
              value={newListName}
              onChange={(e) =>
                handleNewListNameOnChange(e, isNewListNameValidUtils)
              }
            />
            <TextField
              margin="dense"
              fullWidth
              id="iconByKeyWordsInput"
              variant="outlined"
              label="Search icons"
              type="text"
              placeholder="Enter keywords to search for icons for a new list"
              value={keyWords}
              onChange={handleKeyWordsOnChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            type="submit"
            form="new-list-form"
            color={isNewListNameValid ? "primary" : "error"}
            disabled={!isNewListNameValid || newListName === ""}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
