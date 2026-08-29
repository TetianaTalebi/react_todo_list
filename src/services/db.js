import { Dexie } from "dexie";

const db = new Dexie("TodoListsDatabase");

db.version(1).stores({
  todoLists: "listId, listName",
  todos: "todoId, todoListId, todoCompleted",
});

db.on("populate", async (trans) => {
  await trans.table("todoLists").bulkAdd([
    {
      listId: 1,
      listName: "Healthy Grocery Shopping",
      listIconName: "ShoppingCart",
    },
    {
      listId: 2,
      listName: "Yoga & Fitness Routine",
      listIconName: "LocalFlorist",
    },
    {
      listId: 3,
      listName: "Toronto Travel Checklist",
      listIconName: "LocationCity",
    },
  ]);

  await trans.table("todos").bulkAdd([
    {
      todoId: 11,
      todoListId: 1,
      todoText: "Buy fresh spinach",
      todoCompleted: false,
    },
    {
      todoId: 12,
      todoListId: 1,
      todoText: "Get blueberries and bananas",
      todoCompleted: true,
    },
    {
      todoId: 13,
      todoListId: 1,
      todoText: "Purchase salmon fillets",
      todoCompleted: true,
    },
    {
      todoId: 14,
      todoListId: 1,
      todoText: "Buy almonds and mixed nuts",
      todoCompleted: false,
    },
    {
      todoId: 15,
      todoListId: 1,
      todoText: "Pick up Greek yogurt",
      todoCompleted: false,
    },
    {
      todoId: 16,
      todoListId: 1,
      todoText: "Get whole grain bread",
      todoCompleted: true,
    },
    {
      todoId: 17,
      todoListId: 1,
      todoText: "Buy avocados",
      todoCompleted: true,
    },
    {
      todoId: 18,
      todoListId: 1,
      todoText: "Get broccoli and carrots",
      todoCompleted: true,
    },
    {
      todoId: 21,
      todoListId: 2,
      todoText: "Morning stretching session",
      todoCompleted: true,
    },
    {
      todoId: 22,
      todoListId: 2,
      todoText: "Practice Sun Salutation",
      todoCompleted: true,
    },
    {
      todoId: 23,
      todoListId: 2,
      todoText: "Complete 30-minute yoga flow",
      todoCompleted: false,
    },
    {
      todoId: 24,
      todoListId: 2,
      todoText: "Work on breathing exercises",
      todoCompleted: false,
    },
    {
      todoId: 25,
      todoListId: 2,
      todoText: "Go for a light evening walk",
      todoCompleted: true,
    },
    {
      todoId: 26,
      todoListId: 2,
      todoText: "Drink enough water after workout",
      todoCompleted: false,
    },
    {
      todoId: 31,
      todoListId: 3,
      todoText: "Visit the CN Tower",
      todoCompleted: false,
    },
    {
      todoId: 32,
      todoListId: 3,
      todoText: "Explore Royal Ontario Museum",
      todoCompleted: true,
    },
    {
      todoId: 33,
      todoListId: 3,
      todoText: "Walk around the Distillery Historic District",
      todoCompleted: true,
    },
    {
      todoId: 34,
      todoListId: 3,
      todoText: "Visit Toronto Islands",
      todoCompleted: false,
    },
    {
      todoId: 35,
      todoListId: 3,
      todoText: "Try local food at St. Lawrence Market",
      todoCompleted: true,
    },
  ]);
});

db.open().catch((err) => {
  console.error("Failed to open database:", err);
});

export default db;
