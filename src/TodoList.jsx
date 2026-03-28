import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import List from "@mui/material/List";
import Box from "@mui/material/Box";


export default function TodoList({todos=[], removeTodo, toggleTodo, addTodo}) {
  
    

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
       {/* [
          { todoId: 1, todoText: "Rain", todoCompleted: false },
          { todoId: 2, todoText: "Snow", todoCompleted: false },
          { todoId: 3, todoText: "Sun", todoCompleted: false },
          { todoId: 4, todoText: "Clouds", todoCompleted: true },
       ] */}
      <List sx={{ width: "100%", bgcolor: "background.paper", pr: 10, pl: 6 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.todoId}
            todo={todo}
            remove={removeTodo}
            toggle={() => toggleTodo(todo.todoId)}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </List>
    </Box>
  );
}
