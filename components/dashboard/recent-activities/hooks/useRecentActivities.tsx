import { MAX_RECENT_ACTIVITIES } from "@/lib/constants";
import { useSessions } from "@/lib/hooks/use-sessions";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { useMemo, useState } from "react";

export default function useRecentActivities() {
  const [activity, setActivity] = useState("");
  const [sessions] = useSessions();
  const [timeEntries] = useTimeEntries();

  const recentActivities = useMemo(() => {
    const activities = [
      ...sessions.map((session) => session.activity),
      ...timeEntries.map((entry) => entry.activity),
    ];
    return Array.from(new Set(activities)).slice(0, MAX_RECENT_ACTIVITIES);
  }, [sessions, timeEntries]);
  const handleActivityClick = (selectedActivity: string) => {
    setActivity(selectedActivity);
  };

  return {
    functions: {
      handleActivityClick,
      setActivity,
    },
    data: {
      activity,
      recentActivities,
    },
  };
}
