// components/dashboard/entry-manager.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { TimeEntry } from "@/lib/types";

import { Pencil, Trash2 } from "lucide-react";
import { DurationInput } from "./DurationInput";
import { EnergyLevel } from "./EnergyLevel";
import { FocusLevel } from "./FocusLevel";

export function EntryManager() {
  const [timeEntries, setTimeEntries] = useTimeEntries();
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (entry: TimeEntry) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTimeEntries(timeEntries.filter((entry) => entry.id !== id));
  };

  const handleSave = (updatedEntry: TimeEntry) => {
    setTimeEntries(
      timeEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry,
      ),
    );
    setIsDialogOpen(false);
    setEditingEntry(null);
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Manage Entries</h2>
      <ul className="space-y-2">
        {timeEntries.map((entry) => (
          <li
            key={entry.id}
            className="flex justify-between items-center p-2 bg-secondary rounded-md"
          >
            <span>
              {entry.activity} - {entry.duration} minutes
            </span>
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(entry)}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit entry</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(entry.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete entry</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
          </DialogHeader>
          {editingEntry && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editingEntry);
              }}
              className="space-y-4"
            >
              <Input
                type="text"
                value={editingEntry.activity}
                onChange={(e) =>
                  setEditingEntry({ ...editingEntry, activity: e.target.value })
                }
                placeholder="Activity"
              />
              <DurationInput
                duration={editingEntry.duration.toString()}
                durationUnit="minutes"
                onDurationChange={(value) =>
                  setEditingEntry({
                    ...editingEntry,
                    duration: parseInt(value),
                  })
                }
                onDurationUnitChange={() => {}}
              />
              <EnergyLevel
                value={editingEntry.energyLevel}
                onChange={(value) =>
                  setEditingEntry({ ...editingEntry, energyLevel: value })
                }
              />
              <FocusLevel
                value={editingEntry.focusLevel}
                onChange={(value) =>
                  setEditingEntry({ ...editingEntry, focusLevel: value })
                }
              />
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
