// components/dashboard/time-insights.tsx
"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTimeEntries } from "@/lib/hooks/use-time-entries";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Challenge } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function TimeInsights() {
  const [timeEntries] = useTimeEntries();
  const [challenges] = useLocalStorage<Challenge[]>("challenges", []);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedChallenge, setSelectedChallenge] = useState("all");

  const filteredEntries = useMemo(() => {
    const now = new Date();
    const periodStart = new Date(
      now.getTime() - getPeriodDuration(selectedPeriod)
    );
    return timeEntries.filter(
      (entry) =>
        new Date(entry.date) >= periodStart &&
        (selectedChallenge === "all" || entry.challengeId === selectedChallenge)
    );
  }, [timeEntries, selectedPeriod, selectedChallenge]);

  const totalTime = useMemo(
    () => filteredEntries.reduce((sum, entry) => sum + entry.duration, 0),
    [filteredEntries]
  );

  const timeByActivity = useMemo(() => {
    const timeMap = filteredEntries.reduce(
      (acc, entry) => {
        acc[entry.activity] = (acc[entry.activity] || 0) + entry.duration;
        return acc;
      },
      {} as Record<string, number>
    );
    return Object.entries(timeMap).map(([activity, duration]) => ({
      activity,
      duration,
    }));
  }, [filteredEntries]);

  const challengeProgress = useMemo(
    () =>
      challenges.map((challenge) => {
        const challengeEntries = filteredEntries.filter(
          (entry) => entry.challengeId === challenge.id
        );
        const totalDuration = challengeEntries.reduce(
          (sum, entry) => sum + entry.duration,
          0
        );
        return {
          ...challenge,
          progress: Math.min(
            100,
            (totalDuration / (challenge?.targetDays || 0) * 60) * 100
          ),
        };
      }),
    [challenges, filteredEntries]
  );

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Time Insights</h2>
      <div className="flex space-x-4 mb-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger>
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedChallenge} onValueChange={setSelectedChallenge}>
          <SelectTrigger>
            <SelectValue placeholder="Select challenge" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Challenges</SelectItem>
            {challenges.map((challenge) => (
              <SelectItem key={challenge.id} value={challenge.id}>
                {challenge.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-2">Total Time</h3>
          <p className="text-2xl font-bold">{formatDuration(totalTime)}</p>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">Time by Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeByActivity}>
              <XAxis dataKey="activity" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="duration" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">Challenge Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={challengeProgress}
                dataKey="progress"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {challengeProgress.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">Recent Activities</h3>
          <ul className="space-y-2">
            {filteredEntries.slice(0, 5).map((entry) => (
              <li key={entry.id} className="text-sm">
                {entry.activity} - {formatDuration(entry.duration)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

function getPeriodDuration(period: string): number {
  switch (period) {
    case "day":
      return 24 * 60 * 60 * 1000;
    case "week":
      return 7 * 24 * 60 * 60 * 1000;
    case "month":
      return 30 * 24 * 60 * 60 * 1000;
    default:
      return 7 * 24 * 60 * 60 * 1000;
  }
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
