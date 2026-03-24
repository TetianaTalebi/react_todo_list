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

// hardcoded myLists

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
      { todoId: 1, todoText: "carrots", completed: false },
      { todoId: 2, todoText: "tomatoes", completed: true },
      { todoId: 3, todoText: "milk", completed: false },
      { todoId: 4, todoText: "potatoes", completed: true },
      { todoId: 5, todoText: "chicken", completed: false },
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
      { todoId: 1, todoText: "Water flowers", completed: true },
      { todoId: 2, todoText: "Mow the lawn", completed: true },
      { todoId: 3, todoText: "Water trees", completed: false },
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
      { todoId: 1, todoText: "Rain", completed: false },
      { todoId: 2, todoText: "Snow", completed: false },
      { todoId: 3, todoText: "Sun", completed: false },
      { todoId: 4, todoText: "Clouds", completed: true },
    ],
  },
];

export default function PermanentDrawer() {
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
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: 1 / 4,
            minWidth: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 1 / 4,
              minWidth: 240,
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
              {myLists.map((list) => (
                <ListItem
                  key={list.id}
                  disablePadding
                  sx={{
                    backgroundColor: "lightgray",
                    boxShadow: "0px 3px 10px darkgray",
                  }}
                >
                  <ListItemButton>
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
          <TodoList />
        </Box>
      </Box>
    </>
  );
}
