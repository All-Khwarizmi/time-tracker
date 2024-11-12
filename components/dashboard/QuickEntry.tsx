// components/dashboard/quick-entry.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { TimeEntry } from "@/lib/types";

export function QuickEntry() {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [energyLevel, setEnergyLevel] = useState(3);
  const [focusLevel, setFocusLevel] = useState(3);
  const [timeEntries, setTimeEntries] = useTimeEntries();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: TimeEntry = {
      id: uuidv4(),
      date: new Date().toISOString(),
      activity,
      duration: parseInt(duration),
      energyLevel,
      focusLevel,
      tags: [],
    };
    setTimeEntries([...timeEntries, newEntry]);
    setActivity("");
    setDuration("");
    setEnergyLevel(3);
    setFocusLevel(3);
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Quick Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <div>
          <label className="block text-sm font-medium mb-1">Energy Level</label>
          <input
            type="range"
            min="1"
            max="5"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Focus Level</label>
          <input
            type="range"
            min="1"
            max="5"
            value={focusLevel}
            onChange={(e) => setFocusLevel(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Add Entry
        </Button>
      </form>
    </Card>
  );
}
