// components/dashboard/quick-entry.tsx
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { TimeEntry } from "@/lib/types";

const DURATION_PRESETS = [
  { label: "15m", value: 15 },
  { label: "30m", value: 30 },
  { label: "1h", value: 60 },
  { label: "2h", value: 120 },
];

const MAX_RECENT_ACTIVITIES = 5;

export function QuickEntry() {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState<"minutes" | "hours">(
    "minutes"
  );
  const [energyLevel, setEnergyLevel] = useState(3);
  const [focusLevel, setFocusLevel] = useState(3);
  const [timeEntries, setTimeEntries] = useTimeEntries();

  const recentActivities = useMemo(() => {
    const activities = timeEntries.map((entry) => entry.activity);
    return Array.from(new Set(activities)).slice(0, MAX_RECENT_ACTIVITIES);
  }, [timeEntries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const durationInMinutes =
      durationUnit === "hours" ? parseFloat(duration) * 60 : parseInt(duration);
    const newEntry: TimeEntry = {
      id: uuidv4(),
      date: new Date().toISOString(),
      activity,
      duration: durationInMinutes,
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

  const handleDurationPresetClick = (value: number) => {
    setDuration(value.toString());
    setDurationUnit("minutes");
  };

  const handleActivityClick = (selectedActivity: string) => {
    setActivity(selectedActivity);
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Quick Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {recentActivities.map((recentActivity) => (
            <Button
              key={recentActivity}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleActivityClick(recentActivity)}
            >
              {recentActivity}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="flex-grow"
          />
          <Select
            value={durationUnit}
            onValueChange={(value: "minutes" | "hours") =>
              setDurationUnit(value)
            }
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minutes">Minutes</SelectItem>
              <SelectItem value="hours">Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-2">
          {DURATION_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDurationPresetClick(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
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
