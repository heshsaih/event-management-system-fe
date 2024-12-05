import { SessionBlock } from "../data/useCreateEventStore";
import { Colors } from "./styling";

export const DEFAULT_SESSION_BLOCK: SessionBlock = {
  name: "Domyślny blok",
  color: Colors.RED 
};

export const ADD_BLOCK_MESSAGE = "Taki blok nie istnieje, kliknij aby go dodać";