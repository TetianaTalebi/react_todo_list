import { Dexie } from "dexie";

export const db = new Dexie("TodoListsDatabase");

// The empty space before the first comma in the table schemas means "outbound keys"
// i.e. The tables have outbound keys as their primary keys.
// Using outbound keys allows to explicitly pass the key as a separate argument when adding or updating data.

db.version(2).stores({
  todoLists: ", listName",
  todos: ", todoListId, todoCompleted",
});

db.on("populate", async (trans) => {

  const todoListsData = [
    {
      listName: "Yoga & Fitness Routine",
      listIconName: "LocalFlorist",
    },
    {
      listName: "Toronto Travel Checklist",
      listIconName: "LocationCity",
    },
    {
      listName: "Healthy Grocery Shopping",
      listIconName: "ShoppingCart",
    },
  ];

  const todoListKeysData = [1,2,3];

   const todosData = [
    {
      todoListId: 1,
      todoText: "Morning stretching session",
      todoCompleted: true,
    },
    {
      todoListId: 1,
      todoText: "Practice Sun Salutation",
      todoCompleted: true,
    },
    {
      todoListId: 1,
      todoText: "Complete 30-minute yoga flow",
      todoCompleted: false,
    },
    {
      todoListId: 1,
      todoText: "Work on breathing exercises",
      todoCompleted: false,
    },
    {
      todoListId: 1,
      todoText: "Go for a light evening walk",
      todoCompleted: true,
    },
    {
      todoListId: 1,
      todoText: "Drink enough water after workout",
      todoCompleted: false,
    },
    {
      todoListId: 2,
      todoText: "Visit the CN Tower",
      todoCompleted: false,
    },
    {
      todoListId: 2,
      todoText: "Explore Royal Ontario Museum",
      todoCompleted: true,
    },
    {
      todoListId: 2,
      todoText: "Walk around the Distillery Historic District",
      todoCompleted: true,
    },
    {
      todoListId: 2,
      todoText: "Visit Toronto Islands",
      todoCompleted: false,
    },
    {
      todoListId: 2,
      todoText: "Try local food at St. Lawrence Market",
      todoCompleted: true,
    },
    {
      todoListId: 3,
      todoText: "Buy fresh spinach",
      todoCompleted: false,
    },
    {
      todoListId: 3,
      todoText: "Get blueberries and bananas",
      todoCompleted: true,
    },
    {
      todoListId: 3,
      todoText: "Purchase salmon fillets",
      todoCompleted: true,
    },
    {
      todoListId: 3,
      todoText: "Buy almonds and mixed nuts",
      todoCompleted: false,
    },
    {
      todoListId: 3,
      todoText: "Get whole grain bread",
      todoCompleted: true,
    },
    {
      todoListId: 3,
      todoText: "Buy avocados",
      todoCompleted: true,
    },
    {
      todoListId: 3,
      todoText: "Get broccoli and carrots",
      todoCompleted: true,
    },
    {
      todoListId: 3,
      todoText: "Purchase eggs",
      todoCompleted: true,
    },
    {
      todoListId: 3,
      todoText: "Pick up oatmeal",
      todoCompleted: true,
    },
    {
      todoListId: 3,
      todoText: "Buy sweet potatoes",
      todoCompleted: false,
    },
    {
      todoListId: 3,
      todoText: "Get fresh tomatoes",
      todoCompleted: true,
    },
    {
      todoListId: 3,
      todoText: "Purchase chia seeds",
      todoCompleted: true,
    },
  ];

  const todosKeysData = [11,12,13,14,15,16,  21,22,23,24,25,  31,32,33,34,35,36,37,38,39,310,311,312];

  try {
    // Pass the data array first, and the keys array second (outbound keys)
    // Explicitly tell the db what keys we want our data to have
    await trans.table("todoLists").bulkAdd(todoListsData, todoListKeysData);
    console.log('TodoLists successfully added!');
  } catch (error) {
    console.error('Failed to add todoLists:', error);
  }

  try {
    // Pass the data array first, and the keys array second (outbound keys)
    // Explicitly tell the db what keys we want our data to have
    await trans.table("todos").bulkAdd(todosData, todosKeysData);
    console.log('Todos successfully added!');
  } catch (error) {
    console.error('Failed to add todos:', error);
  }

});

db.open().catch((err) => {
  console.error("Failed to open database:", err);
});

