"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useSessions } from "@/lib/hooks/use-sessions";
import { Session } from "@/lib/types";
import { Clock } from "lucide-react";
import { RecentActivitiesOptions } from "./recent-activities/RecentActivitiesOptions";
import useRecentActivities from "./recent-activities/hooks/useRecentActivities";

export function StartSession() {
  const [sessions, setSessions] = useSessions();
  const {
    data: { activity, recentActivities },
    functions: { handleActivityClick, setActivity },
  } = useRecentActivities();

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
        <RecentActivitiesOptions
          recentActivities={recentActivities}
          handleActivityClick={handleActivityClick}
        />
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
