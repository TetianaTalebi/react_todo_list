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
                <IconButton size="large" color="inherit">
                  <AddCircleOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>

        {/* <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div> */}

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
