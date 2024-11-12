// components/dashboard/start-session.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useSessions } from "@/lib/hooks/use-sessions";
import { Session } from "@/lib/types";

export function StartSession() {
  const [activity, setActivity] = useState("");
  const [sessions, setSessions] = useSessions();

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
      <h2 className="text-lg font-semibold mb-4">Start Session</h2>
      <form onSubmit={handleStartSession} className="space-y-4">
        <Input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
          className="w-full"
        />
        <Button type="submit" className="w-full">
          Start Session
        </Button>
      </form>
    </Card>
  );
}
