// lib/types.ts
// export interface TimeEntry {
//   id: string;
//   date: string;
//   activity: string;
//   duration: number;
//   energyLevel: number;
//   focusLevel: number;
//   challengeId?: string;
//   notes?: string;
//   tags: string[];
// }
// lib/types.ts

export interface TimeEntry {
  id: string;
  date: string; // Format ISO : "YYYY-MM-DD"
  activity: string;
  startTime: string; // Format ISO : "YYYY-MM-DDTHH:mm:ss.sssZ"
  endTime: string; // Format ISO : "YYYY-MM-DDTHH:mm:ss.sssZ"
  duration: number; // En minutes, calculé à partir de startTime et endTime
  energyLevel: number;
  focusLevel: number;
  challengeId?: string;
  tags: string[];
  location?: string;
  notes?: string;
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

export interface Session {
  id: string;
  activity: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  energyLevel?: number;
  focusLevel?: number;
  challengeId?: string;
  notes?: string;
  tags: string[];
}
