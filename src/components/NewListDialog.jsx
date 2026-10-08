import { v4 as uuidv4 } from "uuid";

import { useState } from "react";

import useDataValidation from "../hooks/useDataValidation.js";
import { isNewListNameValidUtils } from "../utils/utils.js";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import GridItem from "./GridItem.jsx";
import TextField from "@mui/material/TextField";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { MUI_ICONS_KEY_WORDS } from "../constants/constants.js";

export default function NewListDialog({ AllMuiIcons, open, onClose, addNewList }) {
  // keyWords is a string
  const [keyWords, setKeyWords] = useState("");

  // "Checklist" is a default icon for a new todo list if no icons are selected
  const [newListIcon, setNewListIcon] = useState("Checklist");

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
    let keyWordsStringCleaned = keyWordsString
      .replace(/[^a-zA-Z\s]/g, "")
      .trim();

    // Search for matched icons only if the cleaned keywords string is longer or equal 3 characters
    if (keyWordsStringCleaned.length >= 3) {
      // Replace one or multiple spaces with a pipe "|"
      let keyWordsStringRevised = keyWordsStringCleaned.replace(/\s+/g, "|");

      // Turn myString into a regular expression that is used for finding matching icons
      let myRegexString = "\\b(" + keyWordsStringRevised + ")(e?s)?\\b";
      const keyWordsRegex = new RegExp(myRegexString, "i");
      // console.log(keyWordsRegex);

      // Loop over keyword arrays for each iconName
      // and find the iconNames whose keywords match a user's keywords
      for (let icon of MUI_ICONS_KEY_WORDS) {
        for (let iconKeyWord of icon.keyWords) {
          if (keyWordsRegex.test(iconKeyWord)) {
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
    } else {
      return [];
    }
  };

  const handleKeyWordsOnChange = (e) => {
    setKeyWords(e.target.value);
  };

  // arrayOfIcons36 contains the last 36 icon names from the total matched result
  // const arrayOfIcons36 = findIconsByKeyWords(keyWords).slice(-36);
  // console.log(arrayOfIcons36);

  const arrayOfIcons36 = findIconsByKeyWords(keyWords);
  // console.log(arrayOfIcons36);


  // Without event parameter in handleNewListIcon function, 
  // ToggleButtonGroup cannot grab the selected value
  const handleNewListIcon = (event, newListIconName) => {
    setNewListIcon(newListIconName);
  }

  const resetKeyWordsFormText = () => {
    setKeyWords("");
  };

  const resetNewListIcon = () => {
    setNewListIcon("Checklist");
  }

  const handleSubmitNewListForm = (e) => {
    e.preventDefault();
    // addNewList(newListName, AllMuiIcons[newListIcon]);

    addNewList(newListName, newListIcon);

    console.log("newListIcon is ", newListIcon);

    // console.log("AllMuiIcons[newListIcon] is ", AllMuiIcons[newListIcon]);
    

    onClose();
    resetNewListFormText();
    resetKeyWordsFormText();
    resetNewListIcon();
  };

  const handleDialogClose = () => {
    onClose();
    resetNewListFormText();
    resetKeyWordsFormText();
    resetNewListFormValid();
  };

  return (
    <>
      <Dialog open={open} onClose={handleDialogClose} disableAutoFocus>
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
            <Box sx={{ flexGrow: 1, marginY: 2 }}>
              <ToggleButtonGroup
                color="secondary"
                value={newListIcon}
                exclusive
                onChange={handleNewListIcon}
                aria-label="new list icon"
                sx={{ width: "100%" }}
              >
                <Grid container spacing={1} sx={{ width: "100%", margin: 0 }}>
                  {arrayOfIcons36.map((iconNameItem) => (

                    <GridItem key={uuidv4()} size={{md:2}} value={iconNameItem} AllMuiIcons={AllMuiIcons}/>

                  ))}
                </Grid>
              </ToggleButtonGroup>

            </Box>
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

