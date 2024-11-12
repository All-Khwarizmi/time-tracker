"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { TimeEntry } from "@/lib/types";
import { DurationInput } from "./DurationInput";
import { EnergyLevel } from "./EnergyLevel";
import { FocusLevel } from "./FocusLevel";

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
        <DurationInput
          duration={duration}
          durationUnit={durationUnit}
          onDurationChange={setDuration}
          onDurationUnitChange={setDurationUnit}
        />
        <EnergyLevel value={energyLevel} onChange={setEnergyLevel} />
        <FocusLevel value={focusLevel} onChange={setFocusLevel} />
        <Button type="submit" className="w-full">
          Add Entry
        </Button>
      </form>
    </Card>
  );
}
