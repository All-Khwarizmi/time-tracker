import { useLocalStorage } from "@uidotdev/usehooks";
import { Session } from "../types";

export function useSessions() {
  return useLocalStorage<Session[]>("sessions", []);
}
