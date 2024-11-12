// components/dashboard/recent-entries.tsx
"use client";

import { Card } from "@/components/ui/card";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";

export function RecentEntries() {
  const [entries] = useTimeEntries();

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Entries</h2>
      <ul className="space-y-2">
        {entries
          .slice(-5)
          .reverse()
          .map((entry) => (
            <li key={entry.id} className="border-b pb-2">
              <div className="font-medium">{entry.activity}</div>
              <div className="text-sm text-gray-600">
                Duration: {entry.duration} minutes | Energy: {entry.energyLevel}{" "}
                | Focus: {entry.focusLevel}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(entry.date).toLocaleString()}
              </div>
            </li>
          ))}
      </ul>
    </Card>
  );
}
