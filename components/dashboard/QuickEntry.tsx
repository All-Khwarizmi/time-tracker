// components/dashboard/quick-entry.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { TimeEntry, Challenge } from "@/lib/types";
import { EnergyLevel } from "./EnergyLevel";
import { FocusLevel } from "./FocusLevel";
// import { useSessions } from "@/lib/hooks/use-sessions";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { TagInput } from "@/components/ui/tag-input";

export function QuickEntry() {
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [energyLevel, setEnergyLevel] = useState(3);
  const [focusLevel, setFocusLevel] = useState(3);
  // const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
  //   null
  // );
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null
  );
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [timeEntries, setTimeEntries] = useTimeEntries();
  // const [sessions, setSessions] = useSessions();
  const [challenges] = useLocalStorage<Challenge[]>("challenges", []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = Math.round(
      (endTime.getTime() - startTime.getTime()) / 60000
    ); // Duration in minutes

    const newEntry: TimeEntry = {
      id: uuidv4(),
      date: date?.toISOString().split("T")[0] ?? "",
      activity,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      duration,
      energyLevel,
      focusLevel,
      challengeId: selectedChallengeId || undefined,
      tags,
      location: location || undefined,
      notes: notes || undefined,
    };

    setTimeEntries([...timeEntries, newEntry]);

    // Reset form
    setActivity("");
    setDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setEnergyLevel(3);
    setFocusLevel(3);
    // setSelectedSessionId(null);
    setSelectedChallengeId(null);
    setTags([]);
    setLocation("");
    setNotes("");
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
          className="w-full"
        />

        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          className="w-full"
        />
        <div className="flex space-x-2">
          <TimePicker
            selected={startTime}
            onChange={(time: Date) => setStartTime(time)}
            className="w-1/2"
          />
          <TimePicker
            selected={endTime}
            onChange={(time: Date) => setEndTime(time)}
            className="w-1/2"
          />
        </div>
        <EnergyLevel value={energyLevel} onChange={setEnergyLevel} />
        <FocusLevel value={focusLevel} onChange={setFocusLevel} />
        <Select
          value={selectedChallengeId || ""}
          onValueChange={setSelectedChallengeId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a challenge (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="optional">No challenge</SelectItem>
            {challenges.map((challenge) => (
              <SelectItem key={challenge.id} value={challenge.id}>
                {challenge.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TagInput value={tags} onChange={setTags} placeholder="Add tags" />
        <Input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full"
        />
        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <Button type="submit" className="w-full">
          Add Entry
        </Button>
      </form>
    </Card>
  );
}
