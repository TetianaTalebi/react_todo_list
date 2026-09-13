import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db.js";

import PermanentDrawer from "./PermanentDrawer";

// Wraps PermanentDrawer to ensure it only renders after data is successfully fetched.
// This prevents runtime errors and active-list assignment issues caused by 'undefined' data on the initial render.
export default function PermanentDrawerWrapper() {
  const data = useLiveQuery(async () => {
    const todoListsInDB = await db.todoLists.toArray();
    return { todoListsInDB };
  });

  return (
    <>
      {data && (
        <PermanentDrawer
          todoListsFromIndexedDB={data?.todoListsInDB}
        />
      )}
    </>
  );
}
