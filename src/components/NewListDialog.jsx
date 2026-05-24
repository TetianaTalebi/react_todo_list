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

import { muiIconsKeyWords0_800 } from "../constants/constants.js";

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

   const findIconsByKeyWords = (keyWordsString) => {
    const matchedIconsArray = [];

    // Clean keywords string
    let keyWordsStringCleaned = keyWordsString.replace(/[^a-zA-Z\s]/g, "").trim();

    // Search for matched icons only if the cleaned keywords string is longer or equal 3 characters
    if(keyWordsStringCleaned.length>=3){

        // Replace one or multiple spaces with a pipe "|"
        let keyWordsStringRevised = keyWordsStringCleaned.replace(/\s+/g, "|");

        // Turn myString into a regular expression that is used for finding matching icons
        let myRegexString = "\\b(" + keyWordsStringRevised + ")\\b";
        const keyWordsRegex = new RegExp(myRegexString, "i");
        // console.log(keyWordsRegex);

        // Loop over keyword arrays for each iconName
        // and find the iconNames whose keywords match a user's keywords
        for (let icon of muiIconsKeyWords0_800){
          for(let iconKeyWord of icon.keyWords){
            if(keyWordsRegex.test(iconKeyWord)){
              // Push each matched iconName into matchedIconsArray
              matchedIconsArray.push(icon.iconName);
            }
          }
        }
        // console.log(matchedIconsArray);

        // Remove dublicates form matchedIconsArray
        const matchedIconsArrayFinalResult = [...new Set(matchedIconsArray)];
        // console.log(matchedIconsArrayFinalResult);
        return matchedIconsArrayFinalResult;
        } 
        else 
        { return []}
  }

  const handleKeyWordsOnChange = (e) => {
    setKeyWords(e.target.value);
  }

  const arrayOfIcons30 = findIconsByKeyWords(keyWords).slice(0,30);
  console.log(arrayOfIcons30);

  const resetKeyWordsFormText = () => {
    setKeyWords("");
  }

  const handleSubmitNewListForm = (e) => {
    e.preventDefault();
    findIconsByKeyWords(keyWords);
    addNewList(newListName, SailingIcon);
    onClose();
    resetNewListFormText();
    resetKeyWordsFormText();
  };

  const handleDialogClose = () => {
    onClose();
    resetNewListFormText();
    resetKeyWordsFormText();
    resetNewListFormValid();
  };

  
 

  
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
