"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useSessions } from "@/lib/hooks/use-sessions";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { Session } from "@/lib/types";
import { Clock } from "lucide-react";
import { RecentActivitiesOptions } from "./RecentActivitiesOptions";

const MAX_RECENT_ACTIVITIES = 5;

export function StartSession() {
  const [activity, setActivity] = useState("");
  const [sessions, setSessions] = useSessions();
  const [timeEntries] = useTimeEntries();

  const recentActivities = useMemo(() => {
    const activities = [
      ...sessions.map((session) => session.activity),
      ...timeEntries.map((entry) => entry.activity),
    ];
    return Array.from(new Set(activities)).slice(0, MAX_RECENT_ACTIVITIES);
  }, [sessions, timeEntries]);

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession: Session = {
      id: uuidv4(),
      activity,
      startTime: new Date().toISOString(),
      tags: [],
    };
    setSessions([...sessions, newSession]);
    setActivity("");
  };

  const handleActivityClick = (selectedActivity: string) => {
    setActivity(selectedActivity);
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Clock className="mr-2" />
        Start Session
      </h2>
      <form onSubmit={handleStartSession} className="space-y-4">
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
        {RecentActivitiesOptions(recentActivities, handleActivityClick)}
        <Button type="submit" className="w-full">
          Start Session
        </Button>
      </form>
      {sessions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Active Sessions</h3>
          <ul className="space-y-2">
            {sessions.map((session) => (
              <li
                key={session.id}
                className="flex justify-between items-center text-sm"
              >
                <span>{session.activity}</span>
                <span className="text-muted-foreground">
                  {new Date(session.startTime).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
