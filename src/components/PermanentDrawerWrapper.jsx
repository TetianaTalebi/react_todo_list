import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db.js";

import PermanentDrawer from "./PermanentDrawer";

// PermanentDrawerWrapper wraps PermanentDrawer component to ensure it (PermanentDrawer) only renders after data is successfully fetched from the db.
// This prevents runtime errors and active-list assignment issues caused by 'undefined' data on the initial render.

export default function PermanentDrawerWrapper() {
  // Fetch todoLists data from the db
  // The todo list's primary key value allows us to track the active list and target the specific list intended for deletion
  const todoListsInDB = useLiveQuery(() => db.todoLists.toArray(), []);

 

  return (
    <>{todoListsInDB && <PermanentDrawer todoListsFromIndexedDB={todoListsInDB} />}</>
  );
}
