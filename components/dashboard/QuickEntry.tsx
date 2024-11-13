// components/dashboard/quick-entry.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { TimeEntry, Challenge } from "@/lib/types";
import { EnergyLevel } from "./EnergyLevel";
import { FocusLevel } from "./FocusLevel";
import { useLocalStorage } from "@uidotdev/usehooks";
import { DatePicker } from "@/components/ui/date-picker";
import { TagInput } from "@/components/ui/tag-input";
import { ActivityInput } from "./ActivityInput";
import { TimeInputTabs } from "./TimeInputTabs";
import { ChallengeSelect } from "./ChallengeSelect";
import { LocationInput } from "./LocationInput";
import { NotesInput } from "./NotesInput";
import { RecentActivitiesOptions } from "./recent-activities/RecentActivitiesOptions";
import useRecentActivities from "./recent-activities/hooks/useRecentActivities";
import { ActiveSessionSelect } from "./ActiveSessionSelect";
import { useSessions } from "@/lib/hooks/use-sessions";

export function QuickEntry() {
  const {
    data: { activity, recentActivities },
    functions: { handleActivityClick, setActivity },
  } = useRecentActivities();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState<"minutes" | "hours">(
    "minutes"
  );
  const [energyLevel, setEnergyLevel] = useState(3);
  const [focusLevel, setFocusLevel] = useState(3);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null
  );
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );
  const [sessions, setSessions] = useSessions();
  const [timeEntries, setTimeEntries] = useTimeEntries();
  const [challenges] = useLocalStorage<Challenge[]>("challenges", []);
  const [timeInputMethod] = useState<"precise" | "duration">("precise");

  useEffect(() => {
    if (selectedSessionId) {
      const session = sessions.find((s) => s.id === selectedSessionId);
      if (session) {
        setActivity(session.activity);
        setStartTime(new Date(session.startTime));
        setTags(session.tags);
      }
    }
  }, [selectedSessionId, sessions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newEntry: TimeEntry;

    if (selectedSessionId) {
      const session = sessions.find((s) => s.id === selectedSessionId);
      if (session) {
        const durationInMinutes = Math.round(
          (endTime.getTime() - new Date(session.startTime).getTime()) / 60000
        );
        newEntry = {
          id: uuidv4(),
          date: date?.toISOString().split("T")[0] ?? "",
          activity: session.activity,
          startTime: session.startTime,
          endTime: endTime.toISOString(),
          duration: durationInMinutes,
          energyLevel,
          focusLevel,
          challengeId: selectedChallengeId || undefined,
          tags: session.tags,
          location: location || undefined,
          notes: notes || undefined,
        };
        setSessions(sessions.filter((s) => s.id !== selectedSessionId));
      } else {
        return; // Should not happen, but just in case
      }
    } else if (timeInputMethod === "precise") {
      const calculatedDuration = Math.round(
        (endTime.getTime() - startTime.getTime()) / 60000
      );
      newEntry = {
        id: uuidv4(),
        date: date?.toISOString().split("T")[0] ?? "",
        activity,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: calculatedDuration,
        energyLevel,
        focusLevel,
        challengeId: selectedChallengeId || undefined,
        tags,
        location: location || undefined,
        notes: notes || undefined,
      };
    } else {
      const durationInMinutes =
        durationUnit === "hours"
          ? parseFloat(duration) * 60
          : parseInt(duration);
      const calculatedEndTime = new Date(
        startTime.getTime() + durationInMinutes * 60000
      );
      newEntry = {
        id: uuidv4(),
        date: date?.toISOString().split("T")[0] ?? "",
        activity,
        startTime: startTime.toISOString(),
        endTime: calculatedEndTime.toISOString(),
        duration: durationInMinutes,
        energyLevel,
        focusLevel,
        challengeId: selectedChallengeId || undefined,
        tags,
        location: location || undefined,
        notes: notes || undefined,
      };
    }

    setTimeEntries([...timeEntries, newEntry]);

    // Reset form
    setActivity("");
    setDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setDuration("");
    setEnergyLevel(3);
    setFocusLevel(3);
    setSelectedChallengeId(null);
    setSelectedSessionId(null);
    setTags([]);
    setLocation("");
    setNotes("");
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Quick Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ActivityInput value={activity} onChange={setActivity} />
        <RecentActivitiesOptions
          recentActivities={recentActivities}
          handleActivityClick={handleActivityClick}
        />
        <ActiveSessionSelect
          sessions={sessions}
          selectedSessionId={selectedSessionId}
          onSessionSelect={setSelectedSessionId}
        />

        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          className="w-full"
        />
        <TimeInputTabs
          startTime={startTime}
          endTime={endTime}
          duration={duration}
          durationUnit={durationUnit}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          onDurationChange={setDuration}
          onDurationUnitChange={setDurationUnit}
        />
        <EnergyLevel value={energyLevel} onChange={setEnergyLevel} />
        <FocusLevel value={focusLevel} onChange={setFocusLevel} />
        <ChallengeSelect
          challenges={challenges}
          selectedChallengeId={selectedChallengeId}
          onChallengeSelect={setSelectedChallengeId}
        />
        <TagInput value={tags} onChange={setTags} placeholder="Add tags" />
        <LocationInput value={location} onChange={setLocation} />
        <NotesInput value={notes} onChange={setNotes} />
        <Button type="submit" className="w-full">
          Add Entry
        </Button>
      </form>
    </Card>
  );
}
