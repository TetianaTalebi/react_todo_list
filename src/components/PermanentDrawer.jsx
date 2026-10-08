import "./PermanentDrawer.css";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import CustomizedTooltip from "./CustomizedTooltip.jsx";

import NewListDialog from "./NewListDialog.jsx";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import TodoList from "./TodoList";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db.js";

import Grid from "@mui/material/Grid";

import DynamicIcon from "./DynamicIcon.jsx";
import { grey } from "@mui/material/colors";

import * as AllMuiIcons from "@mui/icons-material";

// CURRENT todoListsFromIndexedDB
// {
//     listId: 1,
//     listName: "Healthy Grocery Shopping",
//     listIconName: "ShoppingCart",
// },

export default function PermanentDrawer({ todoListsFromIndexedDB }) {
  // This state defines which list is active at present moment
  // By default the first list in todoListsFromIndexedDB array of objects is active (e.g. when the app loads the first time)

  const [activeListId, setActiveListId] = useState(
    todoListsFromIndexedDB[0].listId,
  );

  const findCurrentListDataFromIndexedDB = () => {
    const activeList = todoListsFromIndexedDB.find(
      (x) => x.listId === activeListId,
    );
    return activeList ? activeList : null;
  };

  // Fetch todos from the IndexedDB that belong to the current active List

  // [activeListId] is a dependancy array
  // Whenever any value inside this dependency array changes,
  // the useLiveQuery hook will automatically re-run table.get query with the new value.

  const currentTodosFromIndexedDB = useLiveQuery(
    () => db.todos.where({ todoListId: activeListId }).toArray(),
    [activeListId],
  );

  
  // open variable defines whether the dialog window opened or closed
  // (i.e. the dialog window for creating a new list)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListOnClick = (listId) => {
    setActiveListId(listId);
  };

 
  //  CURRENT currentTodosFromIndexedDB
  // {
  //     todoId: 11,
  //     todoListId: 1,
  //     todoText: "Buy fresh spinach",
  //     todoCompleted: false,
  // },


  // Add todo to the currently active list

  const handleAddTodoToIndexedDB = async (text) => {
    try {
      // Prepare todoData object
      const newTodoData = {
        todoListId: activeListId,
        todoText: text.trim() || "",
        todoCompleted: false,
      };

      // Use table.add from Dexie library for adding new todo

      await db.todos.add(newTodoData);
      
    } catch (e) {
      console.log("Whoops, sth went wrong with add!");
      console.error("Error", e);
    }
  };

  // Delete todo from the currently active list
  // Use collection.delete() from Dexie library

  const handleRemoveTodoFromIndexedDB = async (todoId) => {
    try {

      await db.todos.where({ todoId }).delete();

    } catch (e) {
      console.log("Whoops, sth went wrong with todo delete!");
      console.error("Error", e);
    }
  };

  const handleToggleTodoInIndexedDB = async (todoId) => {
    try {

      const myTodo = await db.todos.get(todoId);

      if (myTodo){
        await db.todos.update(todoId, {todoCompleted: !myTodo.todoCompleted});
      }

    } catch (e) {
      console.log("Whoops, sth went wrong with delete!");
      console.error("Error", e);
    }
  };

  const handleReviseTodoInIndexedDB = async (id, text) => {
    try {
      const updated = await db.todos.update(id, {todoText: text || ""}); 

      if (updated){
        console.log (`Todos with id: ${id} was updated successfully`);
      } else {
        console.log (`Nothing was updated - there was no todos with id: ${id}`);
      }

    } catch (e) {
      console.log("Whoops, revise todo failed!");
      console.error("Error", e);
    }
  };

  

  const handleDeleteListFromIndexedDB = async (listKey) => {
    try {

      const deletedTodos = await db.todos.where({todoListId: listKey}).delete();
      const deletedList = await db.todoLists.where({listId: listKey}).delete();

      console.log(deletedTodos, "todos were deleted successfully!");

      console.log(deletedList, "list was deleted successfully!");

    } catch(e) {
      console.log("Whoops, sth went wrong with todo list delete!");
      console.error("Error", e);
    }
  };


  const handleCreateNewListInIndexedDB = async (listName, listIconName) => {

    try {
      
      // Prepare newList object
      const newList = {
        listName,
        listIconName,
      };

      // Use table.add from Dexie library for a new list adding

      await db.todoLists.add(newList);


    } catch (e) {
      console.log("Whoops, sth went wrong with a new list adding!");
      console.error("Error", e);
    }
  };


  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          sx={{
            minHeight: "100vh",
            width: "100%",
            alignContent: "space-between",
          }}
        >
          <AppBar
            elevation={8}
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography
                sx={{ flexGrow: 1, fontWeight: 500, textAlign: "start" }}
                variant="h4"
                noWrap
                component="div"
              >
                React Todos
              </Typography>
              <div>
                <CustomizedTooltip title="Create new list" arrow>
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleClickOpen}
                  >
                    <AllMuiIcons.AddCircleOutlined fontSize="large" />
                  </IconButton>
                </CustomizedTooltip>

                <NewListDialog
                  AllMuiIcons={AllMuiIcons}
                  open={open}
                  onClose={handleClose}
                  addNewList={handleCreateNewListInIndexedDB}
                />
              </div>
            </Toolbar>
          </AppBar>

          <Grid size={{ xs: 1, sm: 2, md: 3 }}>
            <Toolbar />
            <Box>
              <List>
                {todoListsFromIndexedDB.map((list) => (
                  <ListItem
                    key={list.listId}
                    disablePadding
                    sx={{
                      ...(list.listId === activeListId && {
                        backgroundColor: "lightgray",
                        boxShadow: "0px 3px 10px darkgray",
                      }),
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleListOnClick(list.listId)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ListItemIcon>
                        <DynamicIcon
                          value={list.listIconName}
                          AllMuiIcons={AllMuiIcons}
                          iconFontSize={24}
                          iconColor={grey[700]}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={list.listName}
                        sx={{ display: { xs: "none", md: "inline" } }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* 
          
  CURRENT todoListsFromIndexedDB
 
  {
      listId: 1,
      listName: "Healthy Grocery Shopping",
      listIconName: "ShoppingCart",
  },


   CURRENT currentTodosFromIndexedDB

  {
      todoId: 11,
      todoListId: 1,
      todoText: "Buy fresh spinach",
      todoCompleted: false,
  },

    */}

          <Grid size={{ xs: 11, sm: 10, md: 9 }}>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                pl: 2,
                pr: 2,

                // pl: { xs: 0, sm: 1, md: 6 },
                //   // lg: 6, xl: 6
                //   pr: { xs: 0.8, sm: 1, md: 10, lg: 40, xl: 60 },
              }}
            >
              <Toolbar />

              <TodoList
                listId={findCurrentListDataFromIndexedDB()?.listId}
                listName={findCurrentListDataFromIndexedDB()?.listName}
                listIconName={findCurrentListDataFromIndexedDB()?.listIconName}
                todos={currentTodosFromIndexedDB ?? []}
                removeTodo={handleRemoveTodoFromIndexedDB}
                addTodo={handleAddTodoToIndexedDB}
                toggleTodo={handleToggleTodoInIndexedDB}
                reviseTodo={handleReviseTodoInIndexedDB}
                deleteList={handleDeleteListFromIndexedDB}
                AllMuiIcons={AllMuiIcons}
              />
            </Box>
          </Grid>

          {/* Page footer: */}
          <Grid size={12} sx={{ height: 200, pt: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "primary.main",
                color: "white",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 400,
                  textAlign: "center",
                  whiteSpace: "pre-line",
                  pt: 2,
                }}
                component="div"
                variant="body1"
              >
                {`\u00A9 2026 Tetiana Talebi\nFull-Stack Web Developer\n`}

                <CustomizedTooltip
                  title="https://github.com/TetianaTalebi"
                  placement="top"
                  arrow
                >
                  <IconButton
                    size="small"
                    component="a"
                    href="https://github.com/TetianaTalebi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon sx={{ color: "common.white" }} />
                  </IconButton>
                </CustomizedTooltip>

                <CustomizedTooltip
                  title="https://linkedin.com/in/tetianatalebi"
                  placement="top"
                  arrow
                >
                  <IconButton
                    size="small"
                    component="a"
                    href="https://linkedin.com/in/tetianatalebi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon sx={{ color: "common.white" }} />
                  </IconButton>
                </CustomizedTooltip>
              </Typography>
            </Box>
          </Grid>

          {/* Closing tag of the Grid container: */}
        </Grid>
      </Box>
    </>
  );
}
