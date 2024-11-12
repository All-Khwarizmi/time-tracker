import { useLocalStorage } from "@uidotdev/usehooks";
import { TimeEntry } from "../types";

export function useTimeEntries() {
  return useLocalStorage<TimeEntry[]>("timeEntries", []);
}
