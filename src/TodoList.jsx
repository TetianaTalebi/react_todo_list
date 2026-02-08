import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import List from "@mui/material/List";

// Hard-code 'initialTodos' variable to start with
const initialTodos = [
  { id: 1, text: "Walk the dog", completed: true },
  { id: 2, text: "Feed the cat", completed: true },
  { id: 3, text: "Do grocery shopping", completed: true },
  { id: 4, text: "Read the book", completed: true },
  { id: 5, text: "Go to the gym", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    });
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
            if (todo.id===id){
                return {...todo, completed: !todo.completed}
            } else {
                return todo;
            }
        })
    })
  }

  const addTodo = (text) => {
    setTodos((prevTodos) => {
        return [...prevTodos, {id: 8, text: text, completed: false}];
    });
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          remove={removeTodo}
          toggle = {()=>toggleTodo(todo.id)}
        />
      ))}
      <TodoForm addTodo={addTodo} />
    </List>
  );
}

