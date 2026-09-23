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
    listName: "Healthy Grocery Shopping",
    listIcon: <AllMuiIcons.ShoppingCart />,
    listContent: [
      // { todoId: 11, todoText: "Buy fresh spinach", todoCompleted: false },
      // {
      //   todoId: 12,
      //   todoText: "Get blueberries and bananas",
      //   todoCompleted: true,
      // },
      // { todoId: 13, todoText: "Purchase salmon fillets", todoCompleted: true },
      {
        todoId: 14,
        todoText: "Buy almonds and mixed nuts",
        todoCompleted: false,
      },
      { todoId: 15, todoText: "Pick up Greek yogurt", todoCompleted: false },
      { todoId: 16, todoText: "Get whole grain bread", todoCompleted: true },
      { todoId: 17, todoText: "Buy avocados", todoCompleted: true },
      { todoId: 18, todoText: "Get broccoli and carrots", todoCompleted: true },
    ],
  },
  {
    listId: 2,
    listName: "Yoga & Fitness Routine",
    listIcon: <AllMuiIcons.LocalFlorist />,
    listContent: [
      {
        todoId: 21,
        todoText: "Morning stretching session",
        todoCompleted: true,
      },
      { todoId: 22, todoText: "Practice Sun Salutation", todoCompleted: true },
      {
        todoId: 23,
        todoText: "Complete 30-minute yoga flow",
        todoCompleted: false,
      },
      {
        todoId: 24,
        todoText: "Work on breathing exercises",
        todoCompleted: false,
      },
      {
        todoId: 25,
        todoText: "Go for a light evening walk",
        todoCompleted: true,
      },
      {
        todoId: 26,
        todoText: "Drink enough water after workout",
        todoCompleted: false,
      },
    ],
  },
  {
    listId: 3,
    listName: "Toronto Travel Checklist",
    listIcon: <AllMuiIcons.LocationCity />,
    listContent: [
      { todoId: 31, todoText: "Visit the CN Tower", todoCompleted: false },
      {
        todoId: 32,
        todoText: "Explore Royal Ontario Museum",
        todoCompleted: true,
      },
      {
        todoId: 33,
        todoText: "Walk around the Distillery Historic District",
        todoCompleted: true,
      },
      { todoId: 34, todoText: "Visit Toronto Islands", todoCompleted: false },
      {
        todoId: 35,
        todoText: "Try local food at St. Lawrence Market",
        todoCompleted: true,
      },
    ],
  },
];

export default function PermanentDrawer({ todoListsFromIndexedDB }) {
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  // This state manages all todo lists and their contents

  const [todoLists, setTodoLists] = useState(myLists);

  // This state defines which list is active at present moment
  // By default the first list in myLists object is active (e.g. when the app loads the first time)

  const [activeListId, setActiveListId] = useState(
    todoListsFromIndexedDB[0].listId,
  );

  // Fetch a list data from the IndexedDB that belongs to the currently active list

  const currentListFromIndexedDB = useLiveQuery(
    () => db.todoLists.get(activeListId),
    [activeListId],
  );

  console.log("currentListFromIndexedDB today is", currentListFromIndexedDB);

  // Fetch todos from the IndexedDB that belong to the current active List

  // [activeListId] is a dependancy array
  // Whenever any value inside this dependency array changes, 
  // the useLiveQuery hook will automatically re-run table.get query with the new value.

  const currentTodosFromIndexedDB = useLiveQuery(
    () => db.todos.where({ todoListId: activeListId }).toArray(),
    [activeListId],
  );

  // const dataWithKeys = useLiveQuery(async () => {
  //   // Get all keys and all objects simultaneously
  //   const keys = await db.friends.toCollection().keys();
  //   const values = await db.friends.toArray();

  //   // Combine them into a key-value structure
  //   return keys.map((key, index) => ({
  //     key,
  //     value: values[index]
  //   }));
  // }, []);

  // if (!dataWithKeys) return <div>Loading...</div>;





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


//   async function addProduct() {
//   try {
//     // 3. Prepare your data object
//     // Notice this object does NOT contain an 'id' or primary key property.
//     const productData = {
//       name: 'Wireless Mouse',
//       price: 29.99
//     };

//     // 4. Use table.add(item, key)
//     // The second argument ('prod-1024') is the outbound primary key.
//     const assignedKey = await db.products.add(productData, 'prod-1024');
    
//     console.log(`Successfully added! Stored under key: ${assignedKey}`);
    
//     // 5. Retrieve the object
//     const fetchedProduct = await db.products.get('prod-1024');
//     console.log('Fetched object:', fetchedProduct); 
//     // Output: { name: 'Wireless Mouse', price: 29.99 } 
//     // Note: The key is NOT injected into the object automatically.

//   } catch (error) {
//     console.error('Error adding product:', error);
//   }
// }

// addProduct();









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

  const handleDeleteList = (listKey) => {
    setTodoLists((prevTodoLists) => {
      return prevTodoLists.filter((list) => list.listId !== listKey);
    });
  };

  const handleCreateNewList = (listName, ListIcon) => {
    const newListId = uuidv4();
    setTodoLists((prevTodoLists) => {
      const newTodoList = {
        listId: newListId,
        listName: listName,
        listIcon: <ListIcon />,
        listContent: [],
      };
      return [...prevTodoLists, newTodoList];
    });
    setActiveListId(newListId);
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
                  addNewList={handleCreateNewList}
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
                          value={list.listData.listIconName}
                          AllMuiIcons={AllMuiIcons}
                          iconFontSize={24}
                          iconColor={grey[700]}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={list.listData.listName}
                        sx={{ display: { xs: "none", md: "inline" } }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* 
          
  // CURRENT todoListsFromIndexedDB
  // {
  //     listId: 1, ---- replaced with outbound keys in IndexedDB,
  //     listData: {
  //                  listName: "Healthy Grocery Shopping",
  //                  listIconName: "ShoppingCart",
  //                },
  //   },


  // OLD todoListsFromIndexedDB
  // {
  //     listId: 1, ---- replaced with outbound keys in IndexedDB
  //     listName: "Healthy Grocery Shopping",
  //     listIconName: "ShoppingCart",
  //   },

  // OLD todosFromIndexedDB
  // {
    //   todoId: 11, ---- replaced with outbound keys in IndexedDB
    //   todoListId: 1,
    //   todoText: "Buy fresh spinach",
    //   todoCompleted: false,
    // },
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
                listId={activeListId}
                listName={currentListFromIndexedDB?.listName}
                listIconName={currentListFromIndexedDB?.listIconName}
                deleteList={handleDeleteList}
                todos={currentTodosFromIndexedDB ?? []}
                removeTodo={handleRemoveTodo}
                toggleTodo={handleToggleTodo}
                reviseTodo={handleReviseTodo}
                addTodo={handleAddTodo}
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

{
  /* {todoLists.map(
                (list) =>
                  list.listId === activeListId && (
                    <TodoList
                      listId={list.listId}
                      listName={list.listName}
                      ListIconElement={list.listIcon}
                      deleteList={handleDeleteList}
                      todos={list.listContent}
                      removeTodo={handleRemoveTodo}
                      toggleTodo={handleToggleTodo}
                      reviseTodo={handleReviseTodo}
                      addTodo={handleAddTodo}
                      AllMuiIcons={AllMuiIcons}
                    />
                  ),
              )}  */
}
