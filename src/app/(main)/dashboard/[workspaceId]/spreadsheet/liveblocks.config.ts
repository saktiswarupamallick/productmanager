import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { Presence, Storage, UserMeta } from "./types";

const client = createClient({
  publicApiKey: "pk_prod_-geplluvtARn3mF1KzoK2NBfY1RF7n8ZG_PyUPgTpIqFYloFmzXdc-jgk6VWSL0d",
});


export const {
  RoomProvider,
  useRoom,
  useHistory,
  useSelf,
  useCanUndo,
  useCanRedo,
} = createRoomContext<Presence, Storage, UserMeta>(client);
