// import { v4 as uuidv4 } from "uuid";
import * as AllMuiIcons from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState, useRef } from "react";
import { db } from "../services/db.js";
import AppFooter from "./AppFooter.jsx";
import AppNavbar from "./AppNavbar.jsx";
import AppSideBar from "./AppSideBar.jsx";
import "./PermanentDrawer.css";
import TodoList from "./TodoList";

const appFooterHeight = "150px";

// CURRENT fetchedTodoListsFromIndexedDB
// {
//     listId: 1,
//     listName: "Healthy Grocery Shopping",
//     listIconName: "ShoppingCart",
// },

export default function PermanentDrawer() {
  let listDeleted = useRef(false);

  // Fetch todoLists data from the db
  // Dexie's useLiveQuery hook automatically updates
  // whenever a committed write transaction (such as add, put, delete, or clear)
  // modifies data in the IndexedDB tables that the query depends on

  // This useLiveQuery has [] as a 2nd argument,
  // so this useLiveQuery runs when the component mounts and each time when todoLists table is updated

  const fetchedTodoListsFromIndexedDB = useLiveQuery(
    () => db.todoLists.toArray(),
    [],
  );

  // todoListsAndActive.activeListId defines which list is active at present moment
  // By default when the app loads the first time, the first list is active
  // The todo list's primary key value allows us to track the active list (todoListsAndActive.activeListId)
  // and target the specific list intended for deletion
  // todoListsAndActive.activeListId === undefined on the first load
  const [todoListsAndActive, setTodoListsAndActive] = useState({
    todoLists: [],
    activeListId: undefined,
  });

  useEffect(() => {
    if (fetchedTodoListsFromIndexedDB) {
      // After todolist deletion, select the first todolist as active (if available)
      if (listDeleted.current === true) {
        listDeleted.current = false;
        console.log("listDeleted.current in useEffect is ", listDeleted.current );
        setTodoListsAndActive((x) => {
          return {
            ...x,
            todoLists: fetchedTodoListsFromIndexedDB,
            activeListId: fetchedTodoListsFromIndexedDB?.[0]?.listId || null,
          };
        });
      } else if (
        // todoListsAndActive.activeListId is undefined on the first render
        // Select the 1st list as active on the first render (if available)
        todoListsAndActive.activeListId === undefined
      ) {
        setTodoListsAndActive({
          todoLists: fetchedTodoListsFromIndexedDB,
          activeListId: fetchedTodoListsFromIndexedDB?.[0]?.listId || null,
        });
      } else if (fetchedTodoListsFromIndexedDB.length === 0) {
        setTodoListsAndActive({
          todoLists: [],
          activeListId: null,
        });
      } else {
        // All other situations keep activeListId without changes (update only todoLists)
        setTodoListsAndActive((x) => {
          return {
            ...x,
            todoLists: fetchedTodoListsFromIndexedDB,
          };
        });
      }
    }
  }, [fetchedTodoListsFromIndexedDB]);

  // Fetch todos from the IndexedDB that belong to the current active List
  // [todoListsAndActive.activeListId] is a dependancy array

  const currentTodosFromIndexedDB = useLiveQuery(() => {
    if (!todoListsAndActive.activeListId) {
      return null;
    }
    return db.todos
      .where({ todoListId: todoListsAndActive.activeListId })
      .toArray();
  }, [todoListsAndActive.activeListId]);

  const [currentTodos, setCurrentTodos] = useState(null);

  useEffect(() => {
    if (currentTodosFromIndexedDB) {
      setCurrentTodos(currentTodosFromIndexedDB);
    } else {
      setCurrentTodos(null);
    }
  }, [currentTodosFromIndexedDB]);

  const findCurrentListData = () => {
    if (
      todoListsAndActive.activeListId !== null &&
      todoListsAndActive.activeListId !== undefined
    ) {
      const activeList = todoListsAndActive.todoLists.find(
        (x) => x.listId === todoListsAndActive.activeListId,
      );
      return activeList ? activeList : {};
    }
  };

  const currentList = findCurrentListData();

  const handleListOnClick = (listId) => {
    setTodoListsAndActive({ ...todoListsAndActive, activeListId: listId });
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
        todoListId: todoListsAndActive.activeListId,
        todoText: text.trim() || "",
        todoCompleted: false,
      };

      // Use table.add from Dexie library for adding new todo

      await db.todos.add(newTodoData);
    } catch (e) {
      console.error("Whoops, sth went wrong with add!");
      console.error("Error", e);
    }
  };

  // Delete todo from the currently active list
  // Use collection.delete() from Dexie library

  const handleRemoveTodoFromIndexedDB = async (todoId) => {
    try {
      await db.todos.where({ todoId }).delete();
    } catch (e) {
      console.error("Whoops, sth went wrong with todo delete!");
      console.error("Error", e);
    }
  };

  const handleToggleTodoInIndexedDB = async (todoId) => {
    try {
      const myTodo = await db.todos.get(todoId);

      if (myTodo) {
        await db.todos.update(todoId, { todoCompleted: !myTodo.todoCompleted });
      }
    } catch (e) {
      console.error("Whoops, sth went wrong with delete!");
      console.error("Error", e);
    }
  };

  const handleReviseTodoInIndexedDB = async (id, text) => {
    try {
      const updated = await db.todos.update(id, { todoText: text || "" });

      if (updated) {
        console.log(`Todos with id: ${id} was updated successfully`);
      } else {
        console.log(`Nothing was updated - there was no todos with id: ${id}`);
      }
    } catch (e) {
      console.error("Whoops, revise todo failed!");
      console.error("Error", e);
    }
  };

  const handleDeleteListFromIndexedDB = async (listKey) => {
    try {
      listDeleted.current = true;
      console.log("listDeleted.current in handleDeleteListFromIndexedDB is ", listDeleted.current );

      const deletedTodos = await db.todos
        .where({ todoListId: listKey })
        .delete();
      const deletedList = await db.todoLists
        .where({ listId: listKey })
        .delete();

      console.log(deletedTodos, "todos were deleted successfully!");

      console.log(deletedList, "list was deleted successfully!");
    } catch (e) {
      console.error("Whoops, sth went wrong with todo list delete!");
      console.error("Error", e);
    }
  };

  
  // const [todoListsAndActive, setTodoListsAndActive] = useState({
  //   todoLists: [],
  //   activeListId: undefined,
  // });

  const handleCreateNewListInIndexedDB = async (listName, listIconName) => {
    try {
      // Prepare newList object
      const newList = {
        listName,
        listIconName,
      };

      // Use table.add from Dexie library for a new list adding

      const newListId = await db.todoLists.add(newList);
      // console.log(`A new list with id = ${newListId} was successfully created!`);

      // setTodoListsAndActive({ ...todoListsAndActive, activeListId: newListId });
      setTodoListsAndActive((x) => {
        return { ...x, activeListId: newListId };
      });

      // console.log("A new list id type is ", typeof(newListId));
    } catch (e) {
      console.error("Whoops, sth went wrong with a new list adding!");
      console.error("Error", e);
    }
  };

  // const [todoListsAndActive, setTodoListsAndActive] = useState({
  //   todoLists: [],
  //   activeListId: undefined,
  // });

  //  const [currentTodos, setCurrentTodos] = useState(null);

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
          <AppNavbar
            AllMuiIcons={AllMuiIcons}
            addNewList={handleCreateNewListInIndexedDB}
          />

          {todoListsAndActive.activeListId !== null &&
          todoListsAndActive.activeListId !== undefined &&
          todoListsAndActive.todoLists.length > 0 ? (
            <>
              <Grid size={{ xs: 1, sm: 2, md: 3 }}>
                <Toolbar />

                {todoListsAndActive.todoLists.length > 0 && (
                  <AppSideBar
                    todoLists={todoListsAndActive.todoLists}
                    activeListId={todoListsAndActive.activeListId}
                    handleListOnClick={handleListOnClick}
                    AllMuiIcons={AllMuiIcons}
                  />
                )}
              </Grid>

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
                    listId={currentList.listId}
                    listName={currentList.listName}
                    listIconName={currentList.listIconName}
                    todos={currentTodos ?? []}
                    removeTodo={handleRemoveTodoFromIndexedDB}
                    addTodo={handleAddTodoToIndexedDB}
                    toggleTodo={handleToggleTodoInIndexedDB}
                    reviseTodo={handleReviseTodoInIndexedDB}
                    deleteList={handleDeleteListFromIndexedDB}
                    AllMuiIcons={AllMuiIcons}
                  />
                </Box>
              </Grid>
            </>
          ) : (
            <Grid
              size={12}
              sx={{
                background: `linear-gradient(${grey[50]}, ${grey[300]})`,
                height: `calc(100% - ${appFooterHeight})`,
              }}
            >
              <Toolbar />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: {
                    // 56px is the height of <Toolbar/> component on screens < 600px
                    xs: "calc(100% - 56px)",
                    // 64px is the height of <Toolbar/> component on screens > 600px
                    sm: "calc(100% - 64px)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="primary"
                  align="center"
                  sx={{ p: 2 }}
                >
                  {todoListsAndActive.activeListId === null &&
                    "Click the plus '+' button to create your first to-do list."}
                  {todoListsAndActive.activeListId === undefined &&
                    "Loading..."}
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid size={12} sx={{ height: appFooterHeight }}>
            {/* Application footer: */}
            <AppFooter />
          </Grid>

          {/* Closing tag of the Grid container: */}
        </Grid>
      </Box>
    </>
  );
}

/* 
          
  CURRENT fetchedTodoListsFromIndexedDB
 
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

    */
