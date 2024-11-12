"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { useSessions } from "@/lib/hooks/use-sessions";
import { useLocalStorage } from "@uidotdev/usehooks";
import { TimeEntry, Challenge } from "@/lib/types";
import { DurationInput } from "./DurationInput";
import { EnergyLevel } from "./EnergyLevel";
import { FocusLevel } from "./FocusLevel";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const MAX_RECENT_ACTIVITIES = 5;

export function QuickEntry() {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState<"minutes" | "hours">(
    "minutes"
  );
  const [energyLevel, setEnergyLevel] = useState(3);
  const [focusLevel, setFocusLevel] = useState(3);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null
  );
  const [timeEntries, setTimeEntries] = useTimeEntries();
  const [sessions, setSessions] = useSessions();
  const [challenges] = useLocalStorage<Challenge[]>("challenges", []);

  const recentActivities = useMemo(() => {
    const activities = timeEntries.map((entry) => entry.activity);
    return Array.from(new Set(activities)).slice(0, MAX_RECENT_ACTIVITIES);
  }, [timeEntries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const durationInMinutes =
      durationUnit === "hours" ? parseFloat(duration) * 60 : parseInt(duration);

    if (selectedSessionId) {
      const session = sessions.find((s) => s.id === selectedSessionId);
      if (session) {
        const newEntry: TimeEntry = {
          id: uuidv4(),
          date: session.startTime,
          activity: session.activity,
          duration: durationInMinutes,
          energyLevel,
          focusLevel,
          challengeId: selectedChallengeId || undefined,
          tags: session.tags,
        };
        setTimeEntries([...timeEntries, newEntry]);
        setSessions(sessions.filter((s) => s.id !== selectedSessionId));
      }
    } else {
      const newEntry: TimeEntry = {
        id: uuidv4(),
        date: new Date().toISOString(),
        activity,
        duration: durationInMinutes,
        energyLevel,
        focusLevel,
        challengeId: selectedChallengeId || undefined,
        tags: [],
      };
      setTimeEntries([...timeEntries, newEntry]);
    }

    setActivity("");
    setDuration("");
    setEnergyLevel(3);
    setFocusLevel(3);
    setSelectedSessionId(null);
    setSelectedChallengeId(null);
  };

  const handleActivityClick = (selectedActivity: string) => {
    setActivity(selectedActivity);
  };

  const handleSessionSelect = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setActivity(session.activity);
      setSelectedSessionId(sessionId);
    }
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
        {sessions.length > 0 && (
          <Select onValueChange={handleSessionSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Complete a session" />
            </SelectTrigger>
            <SelectContent>
              {sessions.map((session) => (
                <SelectItem key={session.id} value={session.id}>
                  {session.activity} (Started:{" "}
                  {new Date(session.startTime).toLocaleString()})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <DurationInput
          duration={duration}
          durationUnit={durationUnit}
          onDurationChange={setDuration}
          onDurationUnitChange={setDurationUnit}
        />
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
        <Button type="submit" className="w-full">
          {selectedSessionId ? "Complete Session" : "Add Entry"}
        </Button>
      </form>
    </Card>
  );
}
