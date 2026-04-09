import { v4 as uuidv4 } from "uuid";

import { useState } from "react";

import TodoList from "./TodoList";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Tooltip from "@mui/material/Tooltip";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import SailingIcon from '@mui/icons-material/Sailing';

// const getInitialData = () => {
//   const data = JSON.parse(localStorage.getItem("todos"));
//   if (!data) {
//     return [];
//   }
//   return data;
// };

// hardcoded inintial todo lists in myLists object

const myLists = [
  {
    listId: 1,
    listName: "Shopping",
    listIcon: (
      <>
        <ShoppingCartIcon />
      </>
    ),
    listContent: [
      { todoId: 1, todoText: "carrots", todoCompleted: true },
      { todoId: 2, todoText: "tomatoes", todoCompleted: true },
      { todoId: 3, todoText: "milk", todoCompleted: true },
      { todoId: 4, todoText: "potatoes", todoCompleted: true },
      { todoId: 5, todoText: "chicken", todoCompleted: true },
    ],
  },
  {
    listId: 2,
    listName: "Garden",
    listIcon: (
      <>
        <LocalFloristIcon />
      </>
    ),
    listContent: [
      { todoId: 1, todoText: "Water flowers", todoCompleted: true },
      { todoId: 2, todoText: "Mow the lawn", todoCompleted: true },
      { todoId: 3, todoText: "Water trees", todoCompleted: false },
    ],
  },
  {
    listId: 3,
    listName: "Weather",
    listIcon: (
      <>
        <UmbrellaIcon />
      </>
    ),

    listContent: [
      { todoId: 1, todoText: "Rain", todoCompleted: false },
      { todoId: 2, todoText: "Snow", todoCompleted: false },
      { todoId: 3, todoText: "Sun", todoCompleted: false },
      { todoId: 4, todoText: "Clouds", todoCompleted: true },
    ],
  },
];

export default function PermanentDrawer() {
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  // This state manages all todo lists and their contents

  const [todoLists, setTodoLists] = useState(myLists);

  // This state defines which list is active at present moment
  // By default the first list in myLists object is active (e.g. when the app loads the first time)

  const [activeListId, setActiveListId] = useState(myLists[0].listId);

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

  // Remove todo for the currently active list

  const handleRemoveTodo = (id) => {
    setTodoLists((prevTodoLists) => {
      return prevTodoLists.map((list) => {
        if (list.listId === activeListId) {
          const newListContent = list.listContent.filter(
            (todo) => todo.todoId !== id,
          );
          return { ...list, listContent: newListContent };
        }
        return list;
      });
    });
  };

  const handleToggleTodo = (id) => {
    setTodoLists((prevTodoLists) => {
      return prevTodoLists.map((list) => {
        if (list.listId === activeListId) {
          const newListContent = list.listContent.map((todo) => {
            if (todo.todoId === id) {
              return { ...todo, todoCompleted: !todo.todoCompleted };
            } else {
              return todo;
            }
          });
          return { ...list, listContent: newListContent };
        }
        return list;
      });
    });
  };

  const handleAddTodo = (text) => {
    setTodoLists((prevTodoLists) => {
      return prevTodoLists.map((list) => {
        if (list.listId === activeListId) {
          const newListContent = [
            ...list.listContent,
            {
              todoId: uuidv4(),
              todoText: text.trim() || "",
              todoCompleted: false,
            },
          ];
          return { ...list, listContent: newListContent };
        }
        return list;
      });
    });
  };

  const handleReviseTodo = (id, text) => {
    setTodoLists((prevTodoLists) => {
      return prevTodoLists.map((list) => {
        if (list.listId === activeListId) {
          const newListContent = list.listContent.map((todo) => {
            if (todo.todoId === id) {
              return { ...todo, todoText: text || "" };
            } else {
              return todo;
            }
          });
          return { ...list, listContent: newListContent };
        }
        return list;
      });
    });
  };

   // {
  //   listId: 1,
  //   listName: "Shopping",
  //   listIcon: (
  //     <>
  //       <ShoppingCartIcon />
  //     </>
  //   ),
  //   listContent: [
  //     { todoId: 1, todoText: "carrots", todoCompleted: true },
  //     { todoId: 2, todoText: "tomatoes", todoCompleted: true },
  //     { todoId: 3, todoText: "milk", todoCompleted: true },
  //     { todoId: 4, todoText: "potatoes", todoCompleted: true },
  //     { todoId: 5, todoText: "chicken", todoCompleted: true },
  //   ],
  // }

  // const [todoLists, setTodoLists] = useState(myLists);

  // const [activeListId, setActiveListId] = useState(myLists[0].listId);


  const handleCreateNewList = (listName, ListIcon) => {
    setTodoLists((prevTodoLists)  => {
      const newTodoList = {
        listId: uuidv4(),
        listName: listName,
        listIcon: (
          <>
            <ListIcon />
          </>
        ),
        listContent: [],
      };
      return [...prevTodoLists, newTodoList];
    });
    setOpen(false);
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
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
              <Tooltip title="Create new list" arrow>
                <IconButton size="large" color="inherit" onClick={handleClickOpen}>
                  <AddCircleOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>


              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new list</DialogTitle>
                {/* <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                  </DialogContentText>
                  <form onSubmit={handleSubmit} id="subscription-form">
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                    />
                  </form>
                </DialogContent> */}
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={() => handleCreateNewList('newList', SailingIcon)}>Create</Button>
                  {/* <Button type="submit" form="subscription-form">
                    Subscribe
                  </Button> */}
                </DialogActions>
              </Dialog>


            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: 1 / 4,
            minWidth: {
              sm: 190,
              md: 240,
            },
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 1 / 4,
              minWidth: {
                sm: 190,
                md: 240,
              },
              boxSizing: "border-box",
            },
          }}
          slotProps={{
            paper: {
              sx: {
                boxShadow: 4,
              },
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {todoLists.map((list) => (
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
                  >
                    <ListItemIcon>{list.listIcon}</ListItemIcon>
                    <ListItemText primary={list.listName} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Toolbar />

          {todoLists.map(
            (list) =>
              list.listId === activeListId && (
                <TodoList
                  todos={list.listContent}
                  removeTodo={handleRemoveTodo}
                  toggleTodo={handleToggleTodo}
                  reviseTodo={handleReviseTodo}
                  addTodo={handleAddTodo}
                />
              ),
          )}
        </Box>
      </Box>
    </>
  );
}

// *********************************************************************************************

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function FormDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const formJson = Object.fromEntries((formData as any).entries());
  //   const email = formJson.email;
  //   console.log(email);
  //   handleClose();
  // };

  // return (
  //   <React.Fragment>
  //     <Button variant="outlined" onClick={handleClickOpen}>
  //       Open form dialog
  //     </Button>
      // <Dialog open={open} onClose={handleClose}>
      //   <DialogTitle>Subscribe</DialogTitle>
      //   <DialogContent>
      //     <DialogContentText>
      //       To subscribe to this website, please enter your email address here. We
      //       will send updates occasionally.
      //     </DialogContentText>
      //     <form onSubmit={handleSubmit} id="subscription-form">
      //       <TextField
      //         autoFocus
      //         required
      //         margin="dense"
      //         id="name"
      //         name="email"
      //         label="Email Address"
      //         type="email"
      //         fullWidth
      //         variant="standard"
      //       />
      //     </form>
      //   </DialogContent>
      //   <DialogActions>
      //     <Button onClick={handleClose}>Cancel</Button>
      //     <Button type="submit" form="subscription-form">
      //       Subscribe
      //     </Button>
      //   </DialogActions>
      // </Dialog>
//     </React.Fragment>
//   );
// }

