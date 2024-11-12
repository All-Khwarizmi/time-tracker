// lib/types.ts
export interface TimeEntry {
  id: string;
  date: string;
  activity: string;
  duration: number;
  energyLevel: number;
  focusLevel: number;
  challengeId?: string;
  notes?: string;
  tags: string[];
}

export interface Challenge {
  id: string;
  name: string;
  startDate?: string;
  targetDays?: number;
  currentStreak: number;
  totalDays: number;
  color: string;
}
