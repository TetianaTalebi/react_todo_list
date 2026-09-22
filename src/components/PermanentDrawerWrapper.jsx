import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../services/db.js";

import PermanentDrawer from "./PermanentDrawer";

// PermanentDrawerWrapper wraps PermanentDrawer component to ensure it (PermanentDrawer) only renders after data is successfully fetched from the db.
// This prevents runtime errors and active-list assignment issues caused by 'undefined' data on the initial render.

export default function PermanentDrawerWrapper() {

  const data = useLiveQuery(async () => {

    // Fetch todoLists outbound primary keys from the db
    const todoListsOutboundPrimaryKeys = await db.todoLists.toCollection().primaryKeys();

    // Fetch todoLists data (without primary keys) from the db
    const todoListsInDB = await db.todoLists.toArray();


    // Build array of objects that includes both outbound primary keys and data for todoLists
    const todoListsWithOutboundPrimaryKeys = todoListsOutboundPrimaryKeys.map((todoListKey, index)=>{
      return {
        listId: todoListKey,
        listData: todoListsInDB[index],
      }
    })

    // Each object in the array of objects (todoListsWithOutboundPrimaryKeys) has the following format:
    // {
    //     listId: 1, ---- the outbound key from the IndexedDB,
    //     listData: {
    //                  listName: "Healthy Grocery Shopping",
    //                  listIconName: "ShoppingCart",
    //                },
    //   },

    return {todoListsWithOutboundPrimaryKeys };
  });

  return (
    <>
      {data && (
        <PermanentDrawer
          todoListsFromIndexedDB={data?.todoListsWithOutboundPrimaryKeys}
        />
      )}
    </>
  );
}


