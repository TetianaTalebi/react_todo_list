import {Dexie} from "dexie";

const db = new Dexie("TodoListsDatabase");

db.version(1).stores({
    todoLists: "listId, listName",
    todos: "todoId, todoListId, todoCompleted",
});

